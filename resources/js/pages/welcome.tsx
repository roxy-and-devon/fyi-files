import { Head } from '@inertiajs/react';
import { Calendar, Edit, Plus, Upload } from 'lucide-react';
import { useState } from 'react';

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
                    <div className="rounded-lg border border-gray-200 bg-white shadow-lg">
                        <div className="relative border-b border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl font-bold text-gray-800">FYI Files: Know My Student</h1>
                                <div className="flex gap-2">
                                    <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm leading-4 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none">
                                        <Edit className="mr-1 h-4 w-4" />
                                        Edit
                                    </button>
                                    <button className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm leading-4 font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none">
                                        Add Child
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 p-6">
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                                {/* Left Column - Photo and Basic Info */}
                                <div className="space-y-4">
                                    <div className="flex flex-col items-center">
                                        <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-gray-200 bg-gray-100">
                                            <span className="text-4xl text-gray-400">👤</span>
                                        </div>
                                        <button className="mt-2 inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm leading-4 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none">
                                            <Upload className="mr-1 h-4 w-4" />
                                            Upload Photo
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <label htmlFor="gradeLevel" className="mb-1 block text-sm font-medium text-gray-700">
                                                Grade Level
                                            </label>
                                            <input
                                                id="gradeLevel"
                                                type="text"
                                                value={gradeLevel}
                                                onChange={(e) => setGradeLevel(e.target.value)}
                                                placeholder="e.g., 3rd Grade"
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="homeroomTeacher" className="mb-1 block text-sm font-medium text-gray-700">
                                                Homeroom Teacher
                                            </label>
                                            <input
                                                id="homeroomTeacher"
                                                type="text"
                                                value={homeroomTeacher}
                                                onChange={(e) => setHomeroomTeacher(e.target.value)}
                                                placeholder="Teacher's name"
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">Documentation</label>
                                            <div className="space-y-2">
                                                <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm leading-4 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none">
                                                    <Upload className="mr-1 h-4 w-4" />
                                                    Upload
                                                </button>
                                                <div className="space-y-1 text-sm text-gray-600">
                                                    <div>504 25-26</div>
                                                    <div>504 24-25</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Columns - Main Form */}
                                <div className="space-y-6 lg:col-span-2">
                                    <div>
                                        <label htmlFor="studentName" className="mb-1 block text-sm font-medium text-gray-700">
                                            Child's Full Name
                                        </label>
                                        <input
                                            id="studentName"
                                            type="text"
                                            value={studentName}
                                            onChange={(e) => setStudentName(e.target.value)}
                                            placeholder="Enter student's full name"
                                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-3">
                                        <div className="sm:col-span-2">
                                            <label htmlFor="dateOfBirth" className="mb-1 block text-sm font-medium text-gray-700">
                                                Date of Birth
                                            </label>
                                            <div className="relative">
                                                <input
                                                    id="dateOfBirth"
                                                    type="date"
                                                    value={dateOfBirth}
                                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
                                                />
                                                <Calendar className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">Age</label>
                                            <input
                                                value={calculateAge(dateOfBirth)}
                                                readOnly
                                                className="mt-1 block w-full rounded-md border border-gray-300 bg-blue-50 px-3 py-2 text-center font-semibold shadow-sm focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Conditions Section */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-lg font-semibold text-gray-800">Medical Conditions</label>
                                            <button
                                                onClick={() => setShowAddCondition(true)}
                                                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm leading-4 font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                                            >
                                                <Plus className="mr-1 h-4 w-4" />
                                                Add
                                            </button>
                                        </div>

                                        {/* Add New Condition Form */}
                                        {showAddCondition && (
                                            <div className="space-y-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
                                                <div>
                                                    <label htmlFor="conditionName" className="mb-1 block text-sm font-medium text-gray-700">
                                                        Condition Name
                                                    </label>
                                                    <input
                                                        id="conditionName"
                                                        type="text"
                                                        value={newCondition.name}
                                                        onChange={(e) => setNewCondition({ ...newCondition, name: e.target.value })}
                                                        placeholder="e.g., Type 1 Diabetes"
                                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="conditionDescription" className="mb-1 block text-sm font-medium text-gray-700">
                                                        Description
                                                    </label>
                                                    <textarea
                                                        id="conditionDescription"
                                                        value={newCondition.description}
                                                        onChange={(e) => setNewCondition({ ...newCondition, description: e.target.value })}
                                                        placeholder="Describe the condition, symptoms, triggers, or important notes..."
                                                        rows={3}
                                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
                                                    />
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={addCondition}
                                                        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm leading-4 font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                                                    >
                                                        Add Condition
                                                    </button>
                                                    <button
                                                        onClick={() => setShowAddCondition(false)}
                                                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm leading-4 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Existing Conditions */}
                                        {conditions.map((condition, index) => (
                                            <div key={index} className="rounded-lg border border-gray-200 p-4">
                                                <div className="mb-2 flex items-start justify-between">
                                                    <h3 className="text-lg font-semibold text-gray-800">{condition.name}</h3>
                                                    <button
                                                        onClick={() => removeCondition(index)}
                                                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm leading-4 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                                <p className="text-gray-600">{condition.description}</p>
                                            </div>
                                        ))}

                                        {conditions.length === 0 && !showAddCondition && (
                                            <div className="py-8 text-center text-gray-500">
                                                <p>No medical conditions added yet.</p>
                                                <p className="text-sm">Click "Add" to add a condition.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Save Button */}
                            <div className="flex justify-center border-t border-gray-200 pt-6">
                                <button className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none">
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
