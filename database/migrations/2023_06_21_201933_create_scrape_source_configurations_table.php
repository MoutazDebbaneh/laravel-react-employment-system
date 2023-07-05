<?php

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
        Schema::create('scrape_source_configurations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('scrape_source_id');
            $table->foreign('scrape_source_id')->references('id')->on('scrape_sources');
            $table->string('jobs_list_url');
            $table->string('pagination_variable');
            $table->string('jobs_link_selector');
            $table->string('title_selector');
            $table->string('company_selector')->nullable();
            $table->string('location_selector')->nullable();
            $table->string('description_selector')->nullable();
            $table->string('requirements_selector')->nullable();
            $table->string('benefits_selector')->nullable();
            $table->string('experience_selector')->nullable();
            $table->string('min_salary_selector')->nullable();
            $table->string('max_salary_selector')->nullable();
            $table->string('min_age_selector')->nullable();
            $table->string('max_age_selector')->nullable();
            $table->string('gender_selector')->nullable();
            $table->string('display_image_selector')->nullable();
            $table->string('post_date_selector')->nullable();
            $table->string('expiration_date_selector')->nullable();
            $table->string('type_selector')->nullable();
            $table->string('category_selector')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scrape_source_configurations');
    }
};
