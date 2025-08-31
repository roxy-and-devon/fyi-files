<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Disable mass assignment protection in all environments
        Model::unguard();

        // Development settings for better coding experience
        if ($this->app->environment('local')) {
            // Enable query logging for debugging
            DB::enableQueryLog();

            // Prevent lazy loading to catch N+1 queries
            Model::preventLazyLoading();
            Model::preventAccessingMissingAttributes();
            Model::preventSilentlyDiscardingAttributes();

            // Enable model events for all models
            Model::shouldBeStrict();
        }

        Vite::prefetch(concurrency: 5);
    }
}
