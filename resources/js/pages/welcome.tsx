import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Upload, Plus, Edit } from 'lucide-react';

interface Condition {
  name: string;
  description: string;
}

export default function Welcome() {
  const [studentName, setStudentName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [homeroomTeacher, setHomeroomTeacher] = useState('');
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [newCondition, setNewCondition] = useState({ name: '', description: '' });
  const [showAddCondition, setShowAddCondition] = useState(false);

  const calculateAge = (dob: string) => {
    if (!dob) return '';
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age.toString();
  };

  const addCondition = () => {
    if (newCondition.name.trim()) {
      setConditions([...conditions, newCondition]);
      setNewCondition({ name: '', description: '' });
      setShowAddCondition(false);
    }
  };

  const removeCondition = (index: number) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  return (
    <>
      <Head title="FYI Files" />
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="mx-auto max-w-4xl">
          <Card className="shadow-lg">
            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <CardTitle className="text-3xl font-bold text-gray-100">
                  FYI Files
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="default" size="sm">
                    Add Child
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column - Photo and Basic Info */}
                <div className="space-y-4">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-32 w-32 border-4 border-gray-200">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-2xl bg-gray-100">
                        👤
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Upload className="h-4 w-4 mr-1" />
                      Upload Photo
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="gradeLevel">Grade Level</Label>
                      <Input
                        id="gradeLevel"
                        value={gradeLevel}
                        onChange={(e) => setGradeLevel(e.target.value)}
                        placeholder="e.g., 3rd Grade"
                      />
                    </div>

                    <div>
                      <Label htmlFor="homeroomTeacher">Homeroom Teacher</Label>
                      <Input
                        id="homeroomTeacher"
                        value={homeroomTeacher}
                        onChange={(e) => setHomeroomTeacher(e.target.value)}
                        placeholder="Teacher's name"
                      />
                    </div>

                    <div>
                      <Label>Documentation</Label>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Upload className="h-4 w-4 mr-1" />
                          Upload
                        </Button>
                        <div className="text-sm text-gray-400 space-y-1">
                          <div>504 25-26</div>
                          <div>504 24-25</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Columns - Main Form */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <Label htmlFor="studentName">Child's Full Name</Label>
                    <Input
                      id="studentName"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Enter student's full name"
                      className="text-lg w-106"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end w-100">
                    <div className="sm:col-span-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <div className="relative">
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={dateOfBirth}
                          onChange={(e) => setDateOfBirth(e.target.value)}
                          className="w-42"
                        />
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <Label>Age</Label>
                      <Input
                        value={calculateAge(dateOfBirth)}
                        readOnly
                        className="bg-blue-50 text-center font-semibold w-15"
                      />
                    </div>
                  </div>

                  {/* Conditions Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-lg font-semibold">Medical Conditions</Label>
                      <Button
                        onClick={() => setShowAddCondition(true)}
                        size="sm"
                        variant="default"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>

                    {/* Add New Condition Form */}
                    {showAddCondition && (
                      <Card className="border-blue-200 bg-blue-50">
                        <CardContent className="pt-4 space-y-3">
                          <div>
                            <Label htmlFor="conditionName">Condition Name</Label>
                            <Input
                              id="conditionName"
                              value={newCondition.name}
                              onChange={(e) => setNewCondition({ ...newCondition, name: e.target.value })}
                              placeholder="e.g., Type 1 Diabetes"
                            />
                          </div>
                          <div>
                            <Label htmlFor="conditionDescription">Description</Label>
                            <Textarea
                              id="conditionDescription"
                              value={newCondition.description}
                              onChange={(e) => setNewCondition({ ...newCondition, description: e.target.value })}
                              placeholder="Describe the condition, symptoms, triggers, or important notes..."
                              rows={3}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={addCondition} size="sm">
                              Add Condition
                            </Button>
                            <Button
                              onClick={() => setShowAddCondition(false)}
                              variant="outline"
                              size="sm"
                            >
                              Cancel
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Existing Conditions */}
                    {conditions.map((condition, index) => (
                      <Card key={index} className="border-gray-200">
                        <CardContent className="pt-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-lg">{condition.name}</h3>
                            <Button
                              onClick={() => removeCondition(index)}
                              variant="outline"
                              size="sm"
                            >
                              Remove
                            </Button>
                          </div>
                          <p className="text-gray-600">{condition.description}</p>
                        </CardContent>
                      </Card>
                    ))}

                    {conditions.length === 0 && !showAddCondition && (
                      <div className="text-center py-8 text-gray-500">
                        <p>No medical conditions added yet.</p>
                        <p className="text-sm">Click "Add" to add a condition.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-center pt-6 border-t">
                <Button size="lg" className="px-8">
                  Save Student Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}