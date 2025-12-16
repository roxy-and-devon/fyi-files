import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { edit, index, show as showPerson } from '@/actions/App/Http/Controllers/PersonController';
import { edit as editInfo, show as showInfo } from '@/actions/App/Http/Controllers/PersonInformationController';
import { index as accessIndex } from '@/actions/App/Http/Controllers/PersonAccessController';
import { index as auditIndex } from '@/actions/App/Http/Controllers/PersonAuditController';
import { store as storeNote, destroy as destroyNote } from '@/actions/App/Http/Controllers/PersonNoteController';
import { store as storeEmergencyContact, update as updateEmergencyContact, destroy as destroyEmergencyContact } from '@/actions/App/Http/Controllers/EmergencyContactController';
import { Form, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2, Users, FileText, Activity } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface User {
    id: number;
    name: string;
    email: string;
    pivot?: {
        role: 'guardian' | 'school_staff';
    };
}

interface EmergencyContact {
    id: number;
    name: string;
    phone: string;
    email: string | null;
    relationship: string | null;
    priority: number;
}

interface PersonNote {
    id: number;
    content: string;
    user_id: number;
    created_at: string;
    author: {
        id: number;
        name: string;
    };
}

interface PersonInformation {
    id: number;
    medical_conditions: string | null;
    allergies: string | null;
    medications: string | null;
    dietary_restrictions: string | null;
    special_accommodations: string | null;
}

interface Person {
    id: number;
    name: string;
    date_of_birth: string;
    user_id: number;
    primary_guardian?: User;
    users?: User[];
    information?: PersonInformation;
    emergency_contacts?: EmergencyContact[];
    notes?: PersonNote[];
}

interface PeopleShowProps {
    person: Person;
    canUpdate: boolean;
    canManageAccess: boolean;
    canViewAudit: boolean;
}

export default function PeopleShow({ person, canUpdate, canManageAccess, canViewAudit }: PeopleShowProps) {
    const [activeTab, setActiveTab] = useState('overview');

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'People',
            href: index().url,
        },
        {
            title: person.name,
            href: showPerson(person.id).url,
        },
    ];

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString();
    };

    const getRoleBadge = (role: string) => {
        return role === 'guardian' ? (
            <Badge variant="default">Guardian</Badge>
        ) : (
            <Badge variant="secondary">School Staff</Badge>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={person.name} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">{person.name}</h1>
                        <p className="text-muted-foreground">Date of Birth: {formatDate(person.date_of_birth)}</p>
                    </div>
                    {canUpdate && (
                        <Link href={edit(person.id).url}>
                            <Button variant="outline">
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                        </Link>
                    )}
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="medical">Medical Information</TabsTrigger>
                        <TabsTrigger value="notes">Notes</TabsTrigger>
                        {canManageAccess && <TabsTrigger value="access">Access</TabsTrigger>}
                        {canViewAudit && <TabsTrigger value="audit">Audit Logs</TabsTrigger>}
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Emergency Contacts</CardTitle>
                                <CardDescription>
                                    Emergency contact information for {person.name}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {canUpdate && (
                                    <Form
                                        {...storeEmergencyContact.form(person.id)}
                                        className="space-y-4 mb-6"
                                    >
                                        {({ processing, errors }) => (
                                            <>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="name">Name</Label>
                                                    <input
                                                        id="name"
                                                        name="name"
                                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                                        required
                                                    />
                                                    <InputError message={errors.name} />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="phone">Phone</Label>
                                                    <input
                                                        id="phone"
                                                        name="phone"
                                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                                        required
                                                    />
                                                    <InputError message={errors.phone} />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="email">Email (Optional)</Label>
                                                    <input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                                    />
                                                    <InputError message={errors.email} />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="relationship">Relationship (Optional)</Label>
                                                    <input
                                                        id="relationship"
                                                        name="relationship"
                                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                                    />
                                                    <InputError message={errors.relationship} />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="priority">Priority</Label>
                                                    <input
                                                        id="priority"
                                                        name="priority"
                                                        type="number"
                                                        min="1"
                                                        max="5"
                                                        value="1"
                                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                                        required
                                                    />
                                                    <InputError message={errors.priority} />
                                                </div>
                                                <Button type="submit" disabled={processing} size="sm">
                                                    {processing ? 'Adding...' : 'Add Emergency Contact'}
                                                </Button>
                                            </>
                                        )}
                                    </Form>
                                )}

                                {person.emergency_contacts && person.emergency_contacts.length > 0 ? (
                                    <div className="space-y-4">
                                        {person.emergency_contacts.map((contact) => (
                                            <div key={contact.id} className="flex items-center justify-between border-b pb-4">
                                                <div>
                                                    <div className="font-medium">{contact.name}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {contact.phone}
                                                        {contact.email && ` • ${contact.email}`}
                                                        {contact.relationship && ` • ${contact.relationship}`}
                                                    </div>
                                                </div>
                                                {canUpdate && (
                                                    <Form {...destroyEmergencyContact.form(contact.id)} className="inline">
                                                        {({ processing }) => (
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                type="submit"
                                                                disabled={processing}
                                                                onClick={(e) => {
                                                                    if (!confirm('Are you sure you want to delete this emergency contact?')) {
                                                                        e.preventDefault();
                                                                    }
                                                                }}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        )}
                                                    </Form>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    !canUpdate && <p className="text-muted-foreground">No emergency contacts added yet.</p>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="medical" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Medical Information</CardTitle>
                                <CardDescription>
                                    Medical conditions, allergies, medications, and accommodations
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {person.information ? (
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-medium mb-2">Medical Conditions</h3>
                                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                                {person.information.medical_conditions || 'None specified'}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium mb-2">Allergies</h3>
                                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                                {person.information.allergies || 'None specified'}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium mb-2">Medications</h3>
                                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                                {person.information.medications || 'None specified'}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium mb-2">Dietary Restrictions</h3>
                                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                                {person.information.dietary_restrictions || 'None specified'}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium mb-2">Special Accommodations</h3>
                                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                                {person.information.special_accommodations || 'None specified'}
                                            </p>
                                        </div>
                                        {canUpdate && (
                                            <Link href={editInfo(person.id).url}>
                                                <Button variant="outline">
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit Medical Information
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                ) : (
                                    <div>
                                        <p className="text-muted-foreground mb-4">No medical information recorded yet.</p>
                                        {canUpdate && (
                                            <Link href={editInfo(person.id).url}>
                                                <Button variant="outline">
                                                    <Plus className="mr-2 h-4 w-4" />
                                                    Add Medical Information
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="notes" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Notes</CardTitle>
                                <CardDescription>
                                    Notes about {person.name}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {canUpdate && (
                                    <Form
                                        {...storeNote.form(person.id)}
                                        className="space-y-4 mb-6"
                                    >
                                        {({ processing, errors, reset }) => (
                                            <>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="content">New Note</Label>
                                                    <textarea
                                                        id="content"
                                                        name="content"
                                                        rows={4}
                                                        className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                                        required
                                                    />
                                                    <InputError message={errors.content} />
                                                </div>
                                                <Button type="submit" disabled={processing} size="sm">
                                                    {processing ? 'Adding...' : 'Add Note'}
                                                </Button>
                                            </>
                                        )}
                                    </Form>
                                )}

                                {person.notes && person.notes.length > 0 ? (
                                    <div className="space-y-4">
                                        {person.notes.map((note) => (
                                            <div key={note.id} className="border-b pb-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="text-sm text-muted-foreground">
                                                        {note.author.name} • {formatDate(note.created_at)}
                                                    </div>
                                                    {canUpdate && (
                                                        <Form {...destroyNote.form(note.id)} className="inline">
                                                            {({ processing }) => (
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    type="submit"
                                                                    disabled={processing}
                                                                    onClick={(e) => {
                                                                        if (!confirm('Are you sure you want to delete this note?')) {
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            )}
                                                        </Form>
                                                    )}
                                                </div>
                                                <p className="whitespace-pre-wrap">{note.content}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground">No notes yet.</p>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {canManageAccess && (
                        <TabsContent value="access" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Access Management</CardTitle>
                                    <CardDescription>
                                        Manage who has access to {person.name}'s information
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Link href={accessIndex(person.id).url}>
                                        <Button variant="outline">
                                            <Users className="mr-2 h-4 w-4" />
                                            Manage Access
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    )}

                    {canViewAudit && (
                        <TabsContent value="audit" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Audit Logs</CardTitle>
                                    <CardDescription>
                                        View access logs for {person.name}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Link href={auditIndex(person.id).url}>
                                        <Button variant="outline">
                                            <Activity className="mr-2 h-4 w-4" />
                                            View Audit Logs
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    )}
                </Tabs>
            </div>
        </AppLayout>
    );
}
