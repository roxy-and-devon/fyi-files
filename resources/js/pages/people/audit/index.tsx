import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { show as showPerson } from '@/actions/App/Http/Controllers/PersonController';
import { index as auditIndex } from '@/actions/App/Http/Controllers/PersonAuditController';
import { Activity } from 'lucide-react';

interface PersonViewLog {
    id: number;
    section: string;
    viewed_at: string;
    ip_address: string | null;
    user_agent: string | null;
    user: {
        id: number;
        name: string;
        email: string;
    };
}

interface Person {
    id: number;
    name: string;
}

interface PeopleAuditIndexProps {
    person: Person;
    logs: {
        data: PersonViewLog[];
        links: any;
        meta: any;
    };
}

const breadcrumbs = (person: Person): BreadcrumbItem[] => [
    {
        title: person.name,
        href: showPerson(person.id).url,
    },
    {
        title: 'Audit Logs',
        href: '#',
    },
];

export default function PeopleAuditIndex({ person, logs }: PeopleAuditIndexProps) {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleString();
    };

    const formatSection = (section: string) => {
        return section.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs(person)}>
            <Head title={`Audit Logs - ${person.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <h1 className="text-2xl font-bold">Audit Logs</h1>
                    <p className="text-muted-foreground">View access logs for {person.name}</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>View History</CardTitle>
                        <CardDescription>
                            Records of when school staff accessed {person.name}'s information
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {logs.data && logs.data.length > 0 ? (
                            <div className="space-y-4">
                                {logs.data.map((log) => (
                                    <div key={log.id} className="border-b pb-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <div>
                                                <div className="font-medium">{log.user.name}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {formatDate(log.viewed_at)}
                                                </div>
                                            </div>
                                            <div className="text-sm font-medium">
                                                {formatSection(log.section)}
                                            </div>
                                        </div>
                                        {log.ip_address && (
                                            <div className="text-xs text-muted-foreground">
                                                IP: {log.ip_address}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">No audit logs available yet.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
