import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
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
      <Head title="FYI Files: Know My Student" />
      <div className="min-h-screen bg-white p-4 text-black dark:bg-white dark:text-black">
        <div className="mx-auto max-w-4xl">
          <div className="bg-white shadow-lg rounded-lg border border-gray-200">
            <div className="relative p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">
                  FYI Files: Know My Student
                </h1>
                <div className="flex gap-2">
                  <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                  <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Add Child
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Photo and Basic Info */}
                <div className="space-y-4">
                  <div className="flex flex-col items-center">
                    <div className="h-32 w-32 rounded-full border-4 border-gray-200 bg-gray-100 flex items-center justify-center">
                      <span className="text-4xl text-gray-400">👤</span>
                    </div>
                    <button className="mt-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <Upload className="h-4 w-4 mr-1" />
                      Upload Photo
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label htmlFor="gradeLevel" className="block text-sm font-medium text-gray-700 mb-1">Grade Level</label>
                      <input
                        id="gradeLevel"
                        type="text"
                        value={gradeLevel}
                        onChange={(e) => setGradeLevel(e.target.value)}
                        placeholder="e.g., 3rd Grade"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="homeroomTeacher" className="block text-sm font-medium text-gray-700 mb-1">Homeroom Teacher</label>
                      <input
                        id="homeroomTeacher"
                        type="text"
                        value={homeroomTeacher}
                        onChange={(e) => setHomeroomTeacher(e.target.value)}
                        placeholder="Teacher's name"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Documentation</label>
                      <div className="space-y-2">
                        <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          <Upload className="h-4 w-4 mr-1" />
                          Upload
                        </button>
                        <div className="text-sm text-gray-600 space-y-1">
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
                    <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-1">Child's Full Name</label>
                    <input
                      id="studentName"
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Enter student's full name"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                    <div className="sm:col-span-2">
                      <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                      <div className="relative">
                        <input
                          id="dateOfBirth"
                          type="date"
                          value={dateOfBirth}
                          onChange={(e) => setDateOfBirth(e.target.value)}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                      <input
                        value={calculateAge(dateOfBirth)}
                        readOnly
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-blue-50 text-center font-semibold focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Conditions Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-lg font-semibold text-gray-800">Medical Conditions</label>
                      <button
                        onClick={() => setShowAddCondition(true)}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </button>
                    </div>

                    {/* Add New Condition Form */}
                    {showAddCondition && (
                      <div className="border border-blue-200 bg-blue-50 rounded-lg p-4 space-y-3">
                        <div>
                          <label htmlFor="conditionName" className="block text-sm font-medium text-gray-700 mb-1">Condition Name</label>
                          <input
                            id="conditionName"
                            type="text"
                            value={newCondition.name}
                            onChange={(e) => setNewCondition({ ...newCondition, name: e.target.value })}
                            placeholder="e.g., Type 1 Diabetes"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="conditionDescription" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <textarea
                            id="conditionDescription"
                            value={newCondition.description}
                            onChange={(e) => setNewCondition({ ...newCondition, description: e.target.value })}
                            placeholder="Describe the condition, symptoms, triggers, or important notes..."
                            rows={3}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={addCondition}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Add Condition
                          </button>
                          <button
                            onClick={() => setShowAddCondition(false)}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Existing Conditions */}
                    {conditions.map((condition, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg text-gray-800">{condition.name}</h3>
                          <button
                            onClick={() => removeCondition(index)}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="text-gray-600">{condition.description}</p>
                      </div>
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
              <div className="flex justify-center pt-6 border-t border-gray-200">
                <button className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Save Student Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}