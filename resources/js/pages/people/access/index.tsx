import { Form, Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { show as showPerson } from '@/actions/App/Http/Controllers/PersonController';
import { create as createAccess, destroy as destroyAccess, index as accessIndex } from '@/actions/App/Http/Controllers/PersonAccessController';
import { Users, Plus, Trash2 } from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
    pivot: {
        role: 'guardian' | 'school_staff';
    };
}

interface Person {
    id: number;
    name: string;
    primary_guardian?: {
        id: number;
        name: string;
        email: string;
    };
    users?: User[];
}

interface PeopleAccessIndexProps {
    person: Person;
}

const breadcrumbs = (person: Person): BreadcrumbItem[] => [
    {
        title: person.name,
        href: showPerson(person.id).url,
    },
    {
        title: 'Access Management',
        href: '#',
    },
];

export default function PeopleAccessIndex({ person }: PeopleAccessIndexProps) {
    const handleRevoke = (userId: number) => {
        if (confirm('Are you sure you want to revoke access for this user?')) {
            router.delete(destroyAccess(person.id, userId).url);
        }
    };

    const getRoleBadge = (role: string) => {
        return role === 'guardian' ? (
            <Badge variant="default">Guardian</Badge>
        ) : (
            <Badge variant="secondary">School Staff</Badge>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs(person)}>
            <Head title={`Access Management - ${person.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Access Management</h1>
                        <p className="text-muted-foreground">Manage who has access to {person.name}'s information</p>
                    </div>
                    <Link href={createAccess(person.id).url}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Invite User
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Primary Guardian</CardTitle>
                        <CardDescription>
                            The primary guardian who created this person record
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {person.primary_guardian ? (
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium">{person.primary_guardian.name}</div>
                                    <div className="text-sm text-muted-foreground">{person.primary_guardian.email}</div>
                                </div>
                                <Badge variant="default">Primary Guardian</Badge>
                            </div>
                        ) : (
                            <p className="text-muted-foreground">No primary guardian set.</p>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Users with Access</CardTitle>
                        <CardDescription>
                            Users who have been granted access to {person.name}'s information
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {person.users && person.users.length > 0 ? (
                            <div className="space-y-4">
                                {person.users.map((user) => (
                                    <div key={user.id} className="flex items-center justify-between border-b pb-4">
                                        <div className="flex items-center gap-4">
                                            <div>
                                                <div className="font-medium">{user.name}</div>
                                                <div className="text-sm text-muted-foreground">{user.email}</div>
                                            </div>
                                            {getRoleBadge(user.pivot.role)}
                                        </div>
                                        {user.id !== person.primary_guardian?.id && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleRevoke(user.id)}
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Revoke Access
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">No additional users have access yet.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
