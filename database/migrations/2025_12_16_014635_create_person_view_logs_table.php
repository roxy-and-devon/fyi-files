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
        Schema::create('person_view_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Person::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();
            $table->string('section');
            $table->timestamp('viewed_at');
            $table->string('ip_address')->nullable();
            $table->text('user_agent')->nullable();

            $table->index(['person_id', 'viewed_at']);
            $table->index(['user_id', 'viewed_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('person_view_logs');
    }
};
