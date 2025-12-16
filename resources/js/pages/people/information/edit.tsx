import { Form, Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import { update } from '@/actions/App/Http/Controllers/PersonInformationController';
import { show as showPerson } from '@/actions/App/Http/Controllers/PersonController';
import { type BreadcrumbItem } from '@/types';

interface Person {
    id: number;
    name: string;
}

interface PersonInformation {
    id?: number;
    medical_conditions?: string | null;
    allergies?: string | null;
    medications?: string | null;
    dietary_restrictions?: string | null;
    special_accommodations?: string | null;
}

interface PersonInformationEditProps {
    person: Person;
    information?: PersonInformation;
}

const breadcrumbs = (person: Person): BreadcrumbItem[] => [
    {
        title: person.name,
        href: showPerson(person.id).url,
    },
    {
        title: 'Edit Medical Information',
        href: '#',
    },
];

export default function PersonInformationEdit({ person, information }: PersonInformationEditProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs(person)}>
            <Head title={`Edit Medical Information - ${person.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Medical Information</CardTitle>
                        <CardDescription>
                            Update medical information for {person.name}
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
                                        <Label htmlFor="medical_conditions">Medical Conditions</Label>
                                        <textarea
                                            id="medical_conditions"
                                            name="medical_conditions"
                                            rows={4}
                                            className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                            defaultValue={information?.medical_conditions || ''}
                                        />
                                        <InputError message={errors.medical_conditions} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="allergies">Allergies</Label>
                                        <textarea
                                            id="allergies"
                                            name="allergies"
                                            rows={4}
                                            className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                            defaultValue={information?.allergies || ''}
                                        />
                                        <InputError message={errors.allergies} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="medications">Medications</Label>
                                        <textarea
                                            id="medications"
                                            name="medications"
                                            rows={4}
                                            className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                            defaultValue={information?.medications || ''}
                                        />
                                        <InputError message={errors.medications} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="dietary_restrictions">Dietary Restrictions</Label>
                                        <textarea
                                            id="dietary_restrictions"
                                            name="dietary_restrictions"
                                            rows={4}
                                            className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                            defaultValue={information?.dietary_restrictions || ''}
                                        />
                                        <InputError message={errors.dietary_restrictions} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="special_accommodations">Special Accommodations</Label>
                                        <textarea
                                            id="special_accommodations"
                                            name="special_accommodations"
                                            rows={4}
                                            className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                            defaultValue={information?.special_accommodations || ''}
                                        />
                                        <InputError message={errors.special_accommodations} />
                                    </div>

                                    <div className="flex gap-2">
                                        <Button type="submit" disabled={processing}>
                                            {processing ? 'Updating...' : 'Update Medical Information'}
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
