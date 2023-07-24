<?php

use App\Enums\EducationDegree;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();
            $table->string('profile_picture')->default('default_user.png');
            $table->longText('bio')->nullable();
            $table->string('website')->nullable();
            $table->boolean('gender')->nullable();
            $table->string('country')->nullable();
            $table->string('city')->nullable();
            $table->string('address')->nullable();
            $table->string('cv_file')->nullable();
            $table->string('current_position')->nullable();
            $table->enum('education_level', [
                EducationDegree::Highschool->value,
                EducationDegree::Bachelor->value,
                EducationDegree::Master->value,
                EducationDegree::PhD->value,
            ])->nullable();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_profiles');
    }
};
