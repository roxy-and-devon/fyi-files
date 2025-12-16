<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;
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
        $isProduction = $this->app->environment(['production', 'prod']);

        DB::prohibitDestructiveCommands($isProduction);

        Vite::usePrefetchStrategy('aggressive');

        Model::unguard();

        Model::shouldBeStrict(! $isProduction);
        Model::preventLazyLoading(! $isProduction);
        Model::preventAccessingMissingAttributes(! $isProduction);
        Model::preventSilentlyDiscardingAttributes(! $isProduction);
        Model::preventAccessingMissingAttributes(! $isProduction);

        Model::automaticallyEagerLoadRelationships($isProduction);

        URL::forceScheme('https');

    }
}
