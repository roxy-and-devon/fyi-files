import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { create, show } from '@/actions/App/Http/Controllers/PersonController';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

import { index as peopleIndex } from '@/actions/App/Http/Controllers/PersonController';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'People',
        href: peopleIndex().url,
    },
];

interface Person {
    id: number;
    name: string;
    date_of_birth: string;
    user_id: number;
}

interface PeopleIndexProps {
    people: Person[];
}

export default function PeopleIndex({ people }: PeopleIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="People" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">People</h1>
                    <Link href={create().url}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Person
                        </Button>
                    </Link>
                </div>

                {people.length === 0 ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>No people yet</CardTitle>
                            <CardDescription>
                                Get started by adding your first person.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href={create().url}>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Your First Person
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {people.map((person) => (
                            <Card key={person.id}>
                                <CardHeader>
                                    <CardTitle>{person.name}</CardTitle>
                                    <CardDescription>
                                        Date of Birth: {new Date(person.date_of_birth).toLocaleDateString()}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Link href={show(person.id).url}>
                                        <Button variant="outline" className="w-full">
                                            View Details
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
