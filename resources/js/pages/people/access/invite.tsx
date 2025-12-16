import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { show as showPerson } from '@/actions/App/Http/Controllers/PersonController';
import { index as accessIndex, store as storeAccess } from '@/actions/App/Http/Controllers/PersonAccessController';

interface Person {
    id: number;
    name: string;
}

interface PeopleAccessInviteProps {
    person: Person;
}

const breadcrumbs = (person: Person): BreadcrumbItem[] => [
    {
        title: person.name,
        href: showPerson(person.id).url,
    },
    {
        title: 'Invite User',
        href: '#',
    },
];

export default function PeopleAccessInvite({ person }: PeopleAccessInviteProps) {
    const form = useForm({
        email: '',
        name: '',
        role: 'guardian' as 'guardian' | 'school_staff',
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs(person)}>
            <Head title={`Invite User - ${person.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Invite User</CardTitle>
                        <CardDescription>
                            Grant access to {person.name}'s information
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                form.post(storeAccess(person.id).url, {
                                    preserveScroll: true,
                                });
                            }}
                            className="space-y-4"
                        >
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={form.data.email}
                                            onChange={(e) => form.setData('email', e.target.value)}
                                            required
                                            placeholder="Enter email address"
                                        />
                                        <InputError message={form.errors.email} />
                                        <p className="text-sm text-muted-foreground">
                                            If the email belongs to an existing user, they will be granted access immediately. Otherwise, they will receive an invitation email.
                                        </p>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={form.data.name}
                                            onChange={(e) => form.setData('name', e.target.value)}
                                            required
                                            placeholder="Enter name"
                                        />
                                        <InputError message={form.errors.name} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="role">Role</Label>
                                        <Select
                                            value={form.data.role}
                                            onValueChange={(value) => form.setData('role', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="guardian">Guardian</SelectItem>
                                                <SelectItem value="school_staff">School Staff</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <input type="hidden" name="role" value={form.data.role} />
                                        <InputError message={form.errors.role} />
                                    </div>

                                    <div className="flex gap-2">
                                        <Button type="submit" disabled={form.processing}>
                                            {form.processing ? 'Sending Invitation...' : 'Send Invitation'}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => window.history.back()}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
