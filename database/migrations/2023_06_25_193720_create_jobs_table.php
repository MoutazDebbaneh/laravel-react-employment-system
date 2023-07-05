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
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('location')->nullable();
            $table->longText('description')->nullable();
            $table->longText('requirements')->nullable();
            $table->longText('benefits')->nullable();
            $table->tinyInteger('experience')->unsigned()->nullable();
            $table->Integer('min_salary')->unsigned()->nullable();
            $table->Integer('max_salary')->unsigned()->nullable();
            $table->tinyInteger('min_age')->unsigned()->nullable();
            $table->tinyInteger('max_age')->unsigned()->nullable();
            $table->boolean('gender')->nullable();
            $table->string('display_image')->nullable();
            $table->date('post_date')->nullable();
            $table->date('expiration_date')->nullable();
            $table->tinyInteger('source_type')->unsigned()->nullable();
            $table->string('source_url')->nullable();
            $table->unsignedBigInteger('company_id')->nullable();
            $table->foreign('company_id')->references('id')->on('companies');
            $table->unsignedBigInteger('category_id')->nullable();
            $table->foreign('category_id')->references('id')->on('job_categories');
            $table->unsignedBigInteger('scrape_source_id')->nullable();
            $table->foreign('scrape_source_id')->references('id')->on('scrape_sources');
            $table->unsignedBigInteger('api_source_id')->nullable();
            $table->foreign('api_source_id')->references('id')->on('api_sources');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};
