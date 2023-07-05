<?php

namespace Database\Seeders;

use App\Models\JobCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JobCategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $job_categories = [
            [
                'name_en' => 'Accounting / Finance',
                'name_ar' => 'المحاسبة والمالية'
            ],
            [
                'name_en' => 'Development',
                'name_ar' => 'البرمجيات'
            ],
            [
                'name_en' => 'Human Resource',
                'name_ar' => 'الموارد البشرية'
            ],
            [
                'name_en' => 'Project Management',
                'name_ar' => 'إدارة المشاريع'
            ],
            [
                'name_en' => 'Customer Service',
                'name_ar' => 'خدمة الزبائن'
            ],
            [
                'name_en' => 'Health and Care',
                'name_ar' => 'الصحة والعناية'
            ],
            [
                'name_en' => 'Automotive Jobs',
                'name_ar' => 'أعمال الأتمتة'
            ],
            [
                'name_en' => 'Design and Creativity',
                'name_ar' => 'التصميم والإبداع'
            ],
            [
                'name_en' => 'Engineering and Architecture',
                'name_ar' => 'الهندسة والعمارة'
            ],
            [
                'name_en' => 'IT and Networking',
                'name_ar' => 'نكنولوجيا المعلومات والشبكات'
            ],
            [
                'name_en' => 'Legal Work',
                'name_ar' => 'المجال القانوني'
            ],
            [
                'name_en' => 'Sales and Marketing',
                'name_ar' => 'التسويق والمبيعات'
            ],
            [
                'name_en' => 'Translation',
                'name_ar' => 'الترجمة'
            ],
            [
                'name_en' => 'Medical',
                'name_ar' => 'المجال الطبي'
            ],
            [
                'name_en' => 'Media',
                'name_ar' => 'الإعلام'
            ],
            [
                'name_en' => 'Arts and Crafts',
                'name_ar' => 'الفنون والحرف اليدوية'
            ],
            [
                'name_en' => 'Education and Training',
                'name_ar' => 'التعليم والتدريب'
            ],
            [
                'name_en' => 'Hospitality and Tourism',
                'name_ar' => 'الضيافة والسياحة'
            ],
            [
                'name_en' => 'Banking / Insurance',
                'name_ar' => 'التأمين والمصارف'
            ],
            [
                'name_en' => 'Data entry / Archiving',
                'name_ar' => 'إدخال البيانات والأرشفة'
            ],
            [
                'name_en' => 'Consulting',
                'name_ar' => 'الاستشارات'
            ],
            [
                'name_en' => 'House Keeping / Office boys',
                'name_ar' => 'التدبير المنزلي وعمال البوفيه'
            ],
            [
                'name_en' => 'Marketing / PR / Advertising',
                'name_ar' => 'تسويق / علاقات عامة / إعلان'
            ],
            [
                'name_en' => 'Quality',
                'name_ar' => 'الجودة'
            ],
            [
                'name_en' => 'Humanitarian',
                'name_ar' => 'الأعمال الإنسانية'
            ],
            [
                'name_en' => 'Supply chain / Warehouse / Procurement',
                'name_ar' => 'سلسلة التوريد / المستودعات / المشتريات'
            ],
            [
                'name_en' => 'Adminstration',
                'name_ar' => 'الإدارة'
            ],
            [
                'name_en' => 'Security',
                'name_ar' => 'أعمال الأمن'
            ],
            [
                'name_en' => 'Maintenance Work',
                'name_ar' => 'أعمال الصيانة'
            ],
            [
                'name_en' => 'Production Work',
                'name_ar' => 'أعمال الإنتاج'
            ],
            [
                'name_en' => 'Other',
                'name_ar' => 'أخرى'
            ],
        ];



        foreach ($job_categories as $job_category) {
            JobCategory::firstOrCreate($job_category);
        }
    }
}
