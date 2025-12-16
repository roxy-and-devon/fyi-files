import { Form, Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import { update } from '@/actions/App/Http/Controllers/PersonController';
import { show, index } from '@/actions/App/Http/Controllers/PersonController';
import { type BreadcrumbItem } from '@/types';

interface Person {
    id: number;
    name: string;
    date_of_birth: string;
}

interface PeopleEditProps {
    person: Person;
}

const breadcrumbs = (person: Person): BreadcrumbItem[] => [
    {
        title: 'People',
        href: index().url,
    },
    {
        title: person.name,
        href: show(person.id).url,
    },
    {
        title: 'Edit',
        href: '#',
    },
];

export default function PeopleEdit({ person }: PeopleEditProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs(person)}>
            <Head title={`Edit ${person.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Person</CardTitle>
                        <CardDescription>
                            Update person information.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form
                            {...update.form(person.id)}
                            className="space-y-4"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            defaultValue={person.name}
                                            required
                                            autoFocus
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="date_of_birth">Date of Birth</Label>
                                        <Input
                                            id="date_of_birth"
                                            name="date_of_birth"
                                            type="date"
                                            defaultValue={person.date_of_birth.split('T')[0]}
                                            required
                                            max={new Date().toISOString().split('T')[0]}
                                        />
                                        <InputError message={errors.date_of_birth} />
                                    </div>

                                    <div className="flex gap-2">
                                        <Button type="submit" disabled={processing}>
                                            {processing ? 'Updating...' : 'Update Person'}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => window.history.back()}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
