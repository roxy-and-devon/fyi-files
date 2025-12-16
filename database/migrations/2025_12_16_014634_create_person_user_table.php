<?php

use App\Models\Person;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('person_user', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Person::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(User::class)->nullable()->constrained()->nullOnDelete();
            $table->enum('role', ['guardian', 'school_staff']);
            $table->foreignIdFor(User::class, 'invited_by')->nullable()->constrained()->nullOnDelete();
            $table->string('invitation_token', 64)->nullable()->unique();
            $table->timestamp('invited_at')->nullable();
            $table->timestamp('accepted_at')->nullable();
            $table->timestamp('last_reminder_sent_at')->nullable();
            $table->timestamps();

            $table->unique(['person_id', 'user_id', 'role']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('person_user');
    }
};
