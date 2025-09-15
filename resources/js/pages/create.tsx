import { Head } from '@inertiajs/react';
import {useForm } from '@inertiajs/react';
import { error } from 'console';
import { Calendar, Edit, Plus, Upload } from 'lucide-react';
import { useState } from 'react';
import { router } from '@inertiajs/react';

interface Condition {
    name: string;
    description: string;
}

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        studentName: '',
        dateOfBirth: '',
        gradeLevel: '',
        homeroomTeacher: '',
        conditions: [] as Condition[],
    });

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
            const updateConditions = [...data.conditions, newCondition];
            setData('conditions', updateConditions);
            setNewCondition({ name: '', description: '' });
            setShowAddCondition(false);
        }
    };

    const removeCondition = (index: number) => {
        const updatedConditions = data.conditions.filter((_, i) => i !== index);
        setData('conditions', updatedConditions);
    
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/students', data, {
            onSuccess: () => {
            alert('Student profile created successfully!');
            reset();
        },
        onError: (errors) => {
            console.log('Form errors:', errors);
            alert('Please check the form for errors.');
        }
        });
    };

    const handleAddChild = () => {
        router.post('students', data, {
            onSuccess: () => {
                alert:('Student profile created successfully!');
                reset();
                setShowAddCondition(false);
            },
            onError: (errors) => {
                console.log('Form errors:', errors);
                alert('Please check the form for errors before adding another child.');
            }
        });
    };

    const handleCancel = () => {
        if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
            reset();

            window.history.back();
        }
    };

    const handleEdit = () => {
        alert('Edit functionality - this could toggle edit more or redirect');
    };

    return (
        <>
            <Head title="Create Student Profile - FYI Files" />
            <div className="min-h-screen bg-white p-4 text-black dark:bg-gray-400 dark:text-black">
                <form onSubmit={handleSubmit}>
                <div className="mx-auto max-w-4xl">
                    <div className="rounded-lg border border-gray-500 bg-gray-200 shadow-lg">
                        <div className="relative border-b border-gray-500 p-6">
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl font-bold text-gray-800">FYI Files</h1>
                                <div className="flex gap-2">
                                    <button 
                                    type="button"
                                    onClick={handleEdit}
                                    className="inline-flex items-center rounded-md border border-gray-500 bg-white px-3 py-2 text-sm leading-4 font-medium text-gray-700 shadow-sm hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none">
                                        <Edit className="mr-1 h-4 w-4" />
                                        Edit
                                    </button>
                                    <button 
                                    type="button"
                                    onClick={handleCancel}
                                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm leading-4 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none">
                                        Cancel
                                    </button>
                                    
                                    {/* Need to enable add child button... */}
                                    <button 
                                    type="button"
                                    onClick={handleAddChild}
                                    disabled={processing}
                                    className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-3 py-2 text-sm leading-4 font-medium text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none">
                                        {processing ? 'Saving...' : 'Add Child'}
                                    </button>

                                </div>
                            </div>
                        </div>

                        <div className="m-10 space-y-6 p-6">
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                                {/* Left Column - Photo and Basic Info */}
                                <div className="w-50 space-y-4">
                                    <div className="flex flex-col items-center">
                                        <div className="flex h-40 w-40 items-center justify-center rounded-full border-4 border-gray-300 bg-gray-100">
                                            <span className="text-4xl text-gray-400">👤</span>
                                        </div>
                                        <button 
                                        type="button"
                                        className="mt-6 inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm leading-4 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none">
                                            <Upload className="mr-1 h-4 w-4" />
                                            Upload Photo
                                        </button>
                                    </div>

                                    <div className="w-50 space-y-3">
                                        <div>
                                            <label htmlFor="gradeLevel" className="mb-1 block text-sm font-medium text-gray-700">
                                                Grade Level
                                            </label>
                                            <input
                                                id="gradeLevel"
                                                type="text"
                                                value={data.gradeLevel}
                                                onChange={(e) => setData('gradeLevel', e.target.value)}
                                                placeholder="e.g., 3rd Grade"
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:ring-gray-500 focus:outline-none"
                                            />
                                            {errors.gradeLevel && (
                                                <p className="mt-1 text-sm text-red-600">{errors.gradeLevel}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="homeroomTeacher" className="mb-1 block text-sm font-medium text-gray-700">
                                                Homeroom Teacher
                                            </label>
                                            <input
                                                id="homeroomTeacher"
                                                type="text"
                                                value={data.homeroomTeacher}
                                                onChange={(e) => setData('homeroomTeacher', e.target.value)}
                                                placeholder="Teacher's name"
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:ring-gray-500 focus:outline-none"
                                            />
                                            {errors.homeroomTeacher && (
                                                <p className="mt-1 text-sm text-red-600">{errors.homeroomTeacher}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">Documentation</label>
                                            <div className="space-y-2">
                                                <button 
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm leading-4 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none">
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
                                <div className="w-100 space-y-6 lg:col-span-2">
                                    <div>
                                        <label htmlFor="studentName" className="mb-1 block text-sm font-medium text-gray-700">
                                            Child's Full Name
                                        </label>
                                        <input
                                            id="studentName"
                                            type="text"
                                            value={data.studentName}
                                            onChange={(e) => setData('studentName', e.target.value)}
                                            placeholder="Enter student's full name"
                                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-lg shadow-sm focus:border-gray-500 focus:ring-gray-500 focus:outline-none"
                                        />
                                        {errors.studentName && (
                                            <p className="mt-1 text-sm text-red-600">{errors.studentName}</p>
                                        )}
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
                                                    value={data.dateOfBirth}
                                                    onChange={(e) => setData('dateOfBirth', e.target.value)}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:ring-gray-500 focus:outline-none"
                                                />
                                                <Calendar className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                            </div>
                                            {errors.dateOfBirth && (
                                                <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">Age</label>
                                            <input
                                                value={calculateAge(data.dateOfBirth)}
                                                readOnly
                                                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-center font-semibold shadow-sm focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Conditions Section */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-lg font-semibold text-gray-800">Medical Conditions</label>
                                            <button
                                            type="button"
                                                onClick={() => setShowAddCondition(true)}
                                                className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-3 py-2 text-sm leading-4 font-medium text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
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
                                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:ring-gray-500 focus:outline-none"
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
                                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:ring-gray-500 focus:outline-none"
                                                    />
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                    type="button"
                                                        onClick={addCondition}
                                                        className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-3 py-2 text-sm leading-4 font-medium text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                                                    >
                                                        Add Condition
                                                    </button>
                                                    <button
                                                    type="button"
                                                        onClick={() => setShowAddCondition(false)}
                                                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm leading-4 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Existing Conditions */}
                                        {data.conditions.map((condition, index) => (
                                            <div key={index} className="rounded-lg border border-gray-200 p-4">
                                                <div className="mb-2 flex items-start justify-between">
                                                    <h3 className="text-lg font-semibold text-gray-800">{condition.name}</h3>
                                                    <button
                                                    type="button"
                                                        onClick={() => removeCondition(index)}
                                                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm leading-4 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                                <p className="text-gray-600">{condition.description}</p>
                                            </div>
                                        ))}

                                        {data.conditions.length === 0 && !showAddCondition && (
                                            <div className="py-8 text-left text-gray-500">
                                                <p>No medical conditions added yet.</p>
                                                <p className="text-sm">Click "Add" to add a condition.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Save Button */}
                            <div className="flex justify-center border-t border-gray-200 pt-6">
                                <button 
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-8 py-3 text-base font-medium text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none">
                                    {processing ? 'Saving...' : 'Save Student Profile'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                </form>
            </div>

        </>
    );
}
