<?php

namespace Database\Seeders;

use App\Enums\APIMethod;
use App\Enums\APIPassType;
use App\Models\apiSource;
use App\Models\apiSourceConfiguration;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class apiSourceConfigurationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $source = apiSource::where('name', 'Forsa.sy')->first();

        $config = new apiSourceConfiguration([
            'jobs_list_endpoint' => 'https://forsa.sy/API/api/Forsa/Filter',
            'jobs_list_method' => APIMethod::POST->value,
            'pagination_pass_type' => APIPassType::Form->value,
            'pagination_variable' => 'Page',
            'search_variable' => 'text',
            'jobs_array_path' => 'foras',
            'job_id_path' => 'ForsaId',
            'jobs_link_endpoint' => 'https://forsa.sy/API/api/Forsa/Details',
            'jobs_link_method' => APIMethod::GET->value,
            'job_id_pass_type' => APIPassType::Query->value,
            'title_path' => 'Title',
            'company_path' => 'CompanyName',
            'location_path' => 'Address',
            'description_path' => 'JobDescription',
            'requirements_path' => 'JobRequirement',
            'benefits_path' => '',
            'experience_path' => 'YearsOfExperience',
            'min_salary_path' => 'SalaryFrom',
            'max_salary_path' => 'SalaryTo',
            'min_age_path' => 'MinAge',
            'max_age_path' => 'MaxAge',
            'gender_path' => 'Gender',
            'display_image_path' => 'CompanyImage',
            'post_date_path' => 'Since',
            'expiration_date_path' => '',
            'type_path' => 'JobTypes',
            'category_path' => 'JobRoles',
            'gender_map' => json_encode([
                "55" => "No Preference",
                "56" => "Male",
                "57" => "Female"
            ]),
            'type_map' => json_encode([
                "58" => "Full time",
                "59" => "Contract",
                "60" => "Part time",
                "61" => "Freelance / Project",
                "62" => "Internship",
                "63" => "Volunteering",
                "377" => "Work from home"
            ]),
            'category_map' => json_encode([
                "89782850-c080-4a58-a8da-05c7aa2d137e" => "Administration / Operations / Management",
                "1aba9b0e-949a-448e-ac45-0cb3329582e5" => "Data Entry / Archiving",
                "3265559d-4c02-4001-a8a1-ab15670fea6e" => "Strategy / Consulting",
                "10affbfd-8347-4459-bb21-016d8d5ac885" => "Research and Development / Statistics / Analyst",
                "04fc023a-729b-4f38-b1d8-f8aeb60a1a14" => "IT / Software Development",
                "f9da8717-2e51-42ee-936e-91a176eedcc5" => "Banking / Insurance",
                "57ff4d01-df04-4630-94cb-7ab1da1bbb25" => "House Keeping / Office boys / Porters",
                "cb8d915c-3d36-4e70-b26c-b18a23f86b64" => "Translation / Writing / Editorial",
                "4a733ecd-61e1-4386-ba82-d090d7a5baa8" => "Marketing / PR / Advertising",
                "a73c0e70-81f7-41ff-8e9c-389e6166b6a6" => "Graphic Design / Animation / Art",
                "998509bc-e46e-42c1-9135-1d80e03b16f5" => "Education / Teaching / Training",
                "57dc1403-881e-4fc6-a17d-4daa7916c1c2" => "Social Media / Journalism / Publishing",
                "6ac59922-83c6-4b75-9435-0377234d260d" => "Quality",
                "a3d70fe6-7b41-40f4-ab3f-7166984f7f51" => "Safety / Guard Services",
                "ea2a93e2-249f-4449-9873-4f1f60c890cc" => "Customer Service / Support",
                "3024f40a-96b5-400e-aa41-1b333d79a4ab" => "Manufacturing / Production",
                "2748d96c-21f0-441d-b3fc-e0ece0f0a101" => "Sport /Nutrition / Physiotherapy",
                "cc265d77-0523-4680-ad4c-ae74d66d87fe" => "Farming and Agriculture",
                "0a3d434d-f551-4750-a8dd-ea99d9c1c85f" => "Drivers / Delivery",
                "a7ec5cd4-7aa4-4256-889e-d0d02bb7d0c4" => "Secretarial / Receptionist",
                "25dcf130-9298-4ff7-924c-74ac74091c0e" => "Tourism / Travel / Hotels",
                "7351c8ae-8e20-4d76-9ce3-31a4092de286" => "Pharmaceutical",
                "177b0b6d-b426-476a-be55-3fae169d1beb" => "Medical / Healthcare / Nursing",
                "c45ce660-b506-4e62-8daf-65784711f7da" => "Dentists / Prosthodontics",
                "9e463a65-26ad-4a5d-8124-001e6f483c2b" => "Technician / Workers",
                "4fa59a33-d464-4b26-808b-4be8fdfc79c7" => "Legal / Contracts",
                "7c3fd77f-2d21-4c8c-8639-10b57be6f80b" => "Chemistry / Laboratories",
                "b99e1a62-12c1-4b9f-a18d-be617242320e" => "Logistics / Warehouse / Supply Chain",
                "ec47f111-c197-429e-8c8f-50ec2416ab37" => "Sales / Retail / Distribution",
                "6506ffcf-76d6-4327-ab06-f3c52ed76edf" => "Accounting / Finance",
                "5c27b49c-4264-4ac2-8176-7fb8e6472968" => "Project / Program Management",
                "541bbe83-d0c9-49f8-8839-e4906a610559" => "Purchasing / Procurement",
                "242ce27e-3bbc-4e83-95c2-aa7df1c87108" => "Restaurant / Catering / Cuisine",
                "3e958d9c-6eae-4dc3-8c4e-5b86f71439fa" => "Human Resources",
                "0d9b40be-80c1-4ddc-ad9d-5927ade924ae" => "Fashion and Beauty",
                "da3a776a-23e6-437a-b14b-ba0e0c585612" => "Film and Photography / Sound / Music",
                "cce0d2fd-070a-45e9-8f8b-509d3b877ef8" => "Engineering - Construction / Civil / Architecture",
                "04fc023a-729b-4f38-b1d8-f8aeb60a1a32" => "Interior design / Decoration",
                "d25e9484-07d6-4a61-842a-8c58746fa0c7" => "Engineering - Other",
                "10cc04f5-adb1-488b-848c-3524d564733e" => "Engineering - Telecom / Technology",
                "290d8bd8-d271-4696-9741-b0a79bc758ce" => "Engineering - Mechanical / Electrical / Medical",
                "0bf1b965-e9af-4ba3-8675-cb31a8092227" => "Engineering - Oil & Gas / Energy",
                "d180dd5c-35d7-471d-a55f-b5828aa1bccb" => "C-Level Executive / GM / Director",
                "de9a721c-cbeb-414f-a807-4574efb6fa6c" => "Other",
                "de9a721c-cbeb-414f-a807-4574efb6fa6d" => "Psychological support / Community services"
            ])
        ]);

        if (!$source->apiSourceConfiguration()->exists()) {
            $source->apiSourceConfiguration()->save($config);
        }
    }
}
