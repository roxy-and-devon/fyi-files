import { Form, Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { accept } from '@/routes/invitations';
import { User } from 'lucide-react';

interface Person {
    id: number;
    name: string;
    date_of_birth: string;
    primary_guardian?: {
        name: string;
    };
}

interface InvitationShowProps {
    token: string;
    person: Person;
}

interface InvitationShowProps {
    token: string;
    person: Person;
    invitationEmail?: string;
}

export default function InvitationShow({ token, person, invitationEmail }: InvitationShowProps) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>You've Been Invited</CardTitle>
                    <CardDescription>
                        {person.primary_guardian?.name || 'A guardian'} has invited you to manage information for{' '}
                        <strong>{person.name}</strong>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="text-sm text-muted-foreground">
                            <p>Date of Birth: {new Date(person.date_of_birth).toLocaleDateString()}</p>
                            {invitationEmail && (
                                <p className="mt-2 font-medium">Invitation sent to: {invitationEmail}</p>
                            )}
                        </div>

                        <Form
                            {...accept.form(token)}
                            className="space-y-4"
                        >
                            {({ processing }) => (
                                <>
                                    <Button type="submit" disabled={processing} className="w-full">
                                        <User className="mr-2 h-4 w-4" />
                                        {processing ? 'Accepting...' : 'Accept Invitation'}
                                    </Button>
                                </>
                            )}
                        </Form>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
