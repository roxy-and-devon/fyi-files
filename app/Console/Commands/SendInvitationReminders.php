<?php

namespace App\Console\Commands;

use App\Models\Person;
use App\Models\User;
use App\Notifications\PersonInvitationExpired;
use App\Notifications\PersonInvitationReminder;
use Illuminate\Console\Command;
use Illuminate\Notifications\AnonymousNotifiable;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class SendInvitationReminders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'invitations:send-reminders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send reminders for pending invitations and expire old ones';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $pendingInvitations = DB::table('person_user')
            ->whereNull('user_id')
            ->whereNull('accepted_at')
            ->whereNotNull('invitation_token')
            ->get();

        $now = now();

        foreach ($pendingInvitations as $invitation) {
            $invitedAt = Carbon::parse($invitation->invited_at);
            $daysSinceInvited = $invitedAt->diffInDays($now);

            if ($daysSinceInvited >= 30) {
                // Expire invitation
                $person = Person::find($invitation->person_id);
                $invitedBy = User::find($invitation->invited_by);

                if ($person && $invitedBy) {
                    $email = $invitation->email ?? '';

                    // Get invitee name from email
                    $inviteeName = $email ? explode('@', $email)[0] : 'User';

                    $invitedBy->notify(new PersonInvitationExpired($person, $invitedBy, $inviteeName));

                    DB::table('person_user')->where('id', $invitation->id)->delete();
                }

                continue;
            }

            // Check if we should send a reminder (every 5 days)
            $lastReminderSentAt = $invitation->last_reminder_sent_at
                ? Carbon::parse($invitation->last_reminder_sent_at)
                : $invitedAt;

            $daysSinceLastReminder = $lastReminderSentAt->diffInDays($now);

            if ($daysSinceLastReminder >= 5) {
                $person = Person::find($invitation->person_id);
                $invitedBy = User::find($invitation->invited_by);
                $email = $invitation->email ?? null;

                if ($person && $invitedBy && $invitation->invitation_token && $email) {
                    // Get invitee name from email or invitation data
                    $inviteeName = explode('@', $email)[0];

                    (new AnonymousNotifiable)->route('mail', $email)
                        ->notify(new PersonInvitationReminder($person, $invitedBy, $invitation->invitation_token, $inviteeName, $daysSinceInvited));

                    DB::table('person_user')
                        ->where('id', $invitation->id)
                        ->update(['last_reminder_sent_at' => now()]);
                }
            }
        }

        return Command::SUCCESS;
    }
}
