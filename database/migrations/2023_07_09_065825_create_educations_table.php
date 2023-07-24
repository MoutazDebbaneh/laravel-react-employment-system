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
        Schema::create('educations', function (Blueprint $table) {
            $table->id();
            $table->string('from');
            $table->string('to');
            $table->string('institute');
            $table->enum('degree', [
                EducationDegree::Highschool->value,
                EducationDegree::Bachelor->value,
                EducationDegree::Master->value,
                EducationDegree::PhD->value
            ]);
            $table->string('field');
            $table->unsignedBigInteger('user_profile_id');
            $table->foreign('user_profile_id')->references('id')->on('user_profiles');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('educations');
    }
};
