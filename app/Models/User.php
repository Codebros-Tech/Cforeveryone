<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use HasProfilePhoto;
    use Notifiable;
    use TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'profile',
        'email',
        'password',
        'last_login_time',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'profile_photo_url',
    ];

    // Working with user roles

    public function roles(): BelongsToMany {
        return $this->belongsToMany(Role::class);
    }

    // Working with the codes section
    public function codes(): HasMany {
        return $this->hasMany(Code::class);
    }

    // things relating to comments
    // morphMany means one user has many comments and other model could also be having this many comments.
    public function commentsToMe() : MorphMany {
        return $this->morphMany(Comment::class, 'commentable');
    }

    public function comments(): HasMany {
        return $this->hasMany(Comment::class);
    }

    public function codeViews(): HasMany {
        return $this->hasMany(CodeView::class);
    }

    public function getPoints() : string {
        return $this->points;
    }

    /**
     * Looks for the code this user posted which had the highest number of views
     * @return void
     */
    public function getCodeHighestViews(): void
    {
        $user = Auth::user();
        // still working on
    }

    /**return all of the things that have been liked by this user.
     * @return void
     */
    public function getAllLikes() {
        return Like::all()->where('user_id', $this->id);
    }

    public function getNotifications(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->notifications()->get();
    }
}
