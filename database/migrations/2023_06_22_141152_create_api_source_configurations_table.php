<?php

use App\Enums\APIMethod;
use App\Enums\APIPassType;
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
        Schema::create('api_source_configurations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('api_source_id');
            $table->foreign('api_source_id')->references('id')->on('api_sources');

            $table->string('jobs_list_endpoint');
            $table->enum('jobs_list_method', [
                APIMethod::GET->value,
                APIMethod::POST->value,
            ]);
            $table->enum('pagination_pass_type', [
                APIPassType::Path->value,
                APIPassType::Query->value,
                APIPassType::Form->value
            ]);
            $table->string('pagination_variable');
            $table->string('search_variable');
            $table->string('jobs_array_path');
            $table->string('job_id_path');

            $table->string('jobs_link_endpoint');
            $table->enum(
                'jobs_link_method',
                [
                    APIMethod::GET->value,
                    APIMethod::POST->value,
                ]
            );
            $table->enum(
                'job_id_pass_type',
                [
                    APIPassType::Path->value,
                    APIPassType::Query->value,
                    APIPassType::Form->value
                ]
            );

            $table->string('title_path');
            $table->string('company_path')->nullable();
            $table->string('location_path')->nullable();
            $table->string('description_path')->nullable();
            $table->string('requirements_path')->nullable();
            $table->string('benefits_path')->nullable();
            $table->string('experience_path')->nullable();
            $table->string('min_salary_path')->nullable();
            $table->string('max_salary_path')->nullable();
            $table->string('min_age_path')->nullable();
            $table->string('max_age_path')->nullable();
            $table->string('gender_path')->nullable();
            $table->string('display_image_path')->nullable();
            $table->string('post_date_path')->nullable();
            $table->string('expiration_date_path')->nullable();
            $table->string('type_path')->nullable();
            $table->string('category_path')->nullable();
            $table->json('gender_map')->nullable();
            $table->json('type_map')->nullable();
            $table->json('category_map')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('api_source_configurations');
    }
};
