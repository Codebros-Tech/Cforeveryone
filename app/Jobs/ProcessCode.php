<?php

namespace App\Jobs;

use App\Mail\WelcomeMessage;
use App\Models\Code;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeEncrypted;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

// adding ShouldBeUnique make this job be unique, so this will not be dispatch if another one is already running.
// adding ShouldBeEncrypted will ensure that the job is encrypted before being pushed to the job table.
class ProcessCode implements ShouldQueue, ShouldBeUnique, ShouldBeEncrypted
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */

    public Code $code;

    // If this job is still in processing after this time, it will be release and another job taken over.
    public $uniqueFor = 3600;

    public function __construct(Code $code)
    {
        $this->code = $code;
    }

    public function uniqueId(): string
    {
        return $this->code->id;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // notify the other users that i have posted via email.
        // get the corresponding user info
//        $user = $this->code->user();
//        Mail::to($user->email)->send(new WelcomeMessage($code));
    }
}
