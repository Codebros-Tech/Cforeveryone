<?php

namespace App\Providers;

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\ServiceProvider;

class BroadcastServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // this is going to add our broadcast routes to the web routes.
        Broadcast::routes();

        require base_path('routes/channels.php');
    }
}
