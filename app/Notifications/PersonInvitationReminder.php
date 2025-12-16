<?php

namespace App\Notifications;

use App\Models\Person;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PersonInvitationReminder extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        public Person $person,
        public User $invitedBy,
        public string $token,
        public string $inviteeName,
        public int $daysSinceInvited
    ) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $daysRemaining = 30 - $this->daysSinceInvited;

        return (new MailMessage)
            ->greeting("Hello {$this->inviteeName}!")
            ->line("This is a reminder that you have a pending invitation from {$this->invitedBy->name} to manage information for {$this->person->name}.")
            ->line("You have {$daysRemaining} days remaining to accept this invitation.")
            ->action('Accept Invitation', route('invitations.show', $this->token))
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
