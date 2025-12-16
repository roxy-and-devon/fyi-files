<?php

namespace App\Http\Middleware;

use App\Models\Person;
use App\Models\PersonViewLog;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TrackPersonViews
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ?string $section = null): Response
    {
        $response = $next($request);

        if ($request->route('person') instanceof Person) {
            $person = $request->route('person');
            $user = $request->user();

            if ($user && $person->schoolStaff()->where('users.id', $user->id)->whereNotNull('person_user.user_id')->exists()) {
                PersonViewLog::create([
                    'person_id' => $person->id,
                    'user_id' => $user->id,
                    'section' => $section ?? 'general',
                    'viewed_at' => now(),
                    'ip_address' => $request->ip(),
                    'user_agent' => $request->userAgent(),
                ]);
            }
        }

        return $response;
    }
}
