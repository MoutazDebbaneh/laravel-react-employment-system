<?php

namespace App\Http\Controllers;

// require __DIR__ . '/../../../vendor/autoload.php';

use App\Http\Requests\AboutUpdateRequest;
use App\Http\Requests\PersonalInformationUpdateRequest;
use App\Models\Language;
use App\Models\Skill;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;


class UserProfileController extends Controller
{
    public function updatePersonalInformation(PersonalInformationUpdateRequest $request): RedirectResponse
    {
        $data = $request->validated();

        // Handle Profile Picture
        if (empty($data['profile_picture'])) {
            unset($data['profile_picture']);
        } else {
            $file = $request->file('profile_picture');
            $savedFile = $file->store('public/images');
            $data['profile_picture'] = basename($savedFile);
        }

        // Handle CV
        if (empty($data['cv_file'])) {
            unset($data['cv_file']);
        } else {
            $file = $request->file('cv_file');
            $savedFile = $file->store('public/cv_files');
            $data['cv_file'] = basename($savedFile);
        }

        $user_profile = $request->user()->userProfile;
        $user_profile->fill($data);

        // Synchronize Languages
        $langs = Language::whereIn('id', $data['languages'] ?? [])->get();
        $user_profile->languages()->sync($langs);

        $user_profile->save();

        if (!empty($data['cv_file'])) {
            $user_profile->parseCV();
        }

        // Synchronize Skills

        $existing_skills = $user_profile->skills->all();
        $recieved_skills = $data['skills'] ?? [];

        $existing_skills_names = array_map(
            fn ($s) => $s->name,
            $existing_skills
        );

        foreach ($existing_skills_names as $index => $skill) {
            if (!in_array($skill, $recieved_skills)) {
                $existing_skills[$index]->delete();
            }
        }

        $existing_skills_names = array_map(
            fn ($s) => $s->name,
            $existing_skills
        );

        foreach ($recieved_skills as $index => $skill) {
            if (!in_array($skill, $existing_skills_names)) {
                $user_profile->skills()->create(['name' => $skill]);
            }
        }

        info('Personal Information updated');
        return Redirect::route('user.profile');
    }

    public function updateAbout(AboutUpdateRequest $request): RedirectResponse
    {
        $data = $request->validated();
        // dd($data);
        $user_profile = $request->user()->userProfile;
        if (empty($user_profile->socialLink)) {
            $user_profile->socialLink()->create($data);
        }
        $user_profile->socialLink->fill($data);
        $user_profile->socialLink->save();

        if (!empty($request->bio)) {
            $user_profile->fill($data);
        }

        $user_profile->save();

        info('User About updated');
        return Redirect::route('user.profile');
    }

    public function updateExperiences(Request $request): RedirectResponse
    {
        $user_profile = $request->user()->userProfile;
        $existing_experiences = $user_profile->experiences()
            ->select('company', 'position', 'description', 'from', 'to')
            ->get()->toArray();
        $recieved_experiences = $request->input('experiences');
        $same = (count($existing_experiences) == count($recieved_experiences));
        if ($same) {
            for ($i = 0; $i < count($existing_experiences); $i++) {
                $exp1 = $existing_experiences[$i];
                $exp2 = $recieved_experiences[$i];
                if (
                    $exp1['company'] != $exp2['company']
                    || $exp1['position'] != $exp2['position']
                    || $exp1['description'] != $exp2['description']
                    || $exp1['from'] != $exp2['from']
                    || $exp1['to'] != $exp2['to']
                ) {
                    $same = false;
                    break;
                }
            }
            if ($same) return Redirect::route('user.profile');
        }
        $user_profile->experiences()->delete();
        $user_profile->experiences()->createMany($recieved_experiences);

        return Redirect::route('user.profile');
    }
    public function updateEducations(Request $request): RedirectResponse
    {
        $user_profile = $request->user()->userProfile;
        $existing_educations = $user_profile->educations()
            ->select('institute', 'degree', 'field', 'from', 'to')
            ->get()->toArray();
        $recieved_educations = $request->input('educations');
        $same = (count($existing_educations) == count($recieved_educations));
        if ($same) {
            for ($i = 0; $i < count($existing_educations); $i++) {
                $edu1 = $existing_educations[$i];
                $edu2 = $recieved_educations[$i];
                if (
                    $edu1['institute'] != $edu2['institute']
                    || $edu1['degree'] != $edu2['degree']
                    || $edu1['field'] != $edu2['field']
                    || $edu1['from'] != $edu2['from']
                    || $edu1['to'] != $edu2['to']
                ) {
                    $same = false;
                    break;
                }
            }
            if ($same) return Redirect::route('user.profile');
        }
        $user_profile->educations()->delete();
        $user_profile->educations()->createMany($recieved_educations);

        return Redirect::route('user.profile');
    }
    public function updateCourses(Request $request): RedirectResponse
    {
        $user_profile = $request->user()->userProfile;
        $existing_courses = $user_profile->courses()
            ->select('institute', 'certificate_name', 'from', 'to')
            ->get()->toArray();
        $recieved_courses = $request->input('courses');
        $same = (count($existing_courses) == count($recieved_courses));
        if ($same) {
            for ($i = 0; $i < count($existing_courses); $i++) {
                $edu1 = $existing_courses[$i];
                $edu2 = $recieved_courses[$i];
                if (
                    $edu1['institute'] != $edu2['institute']
                    || $edu1['certificate_name'] != $edu2['certificate_name']
                    || $edu1['from'] != $edu2['from']
                    || $edu1['to'] != $edu2['to']
                ) {
                    $same = false;
                    break;
                }
            }
            if ($same) return Redirect::route('user.profile');
        }
        $user_profile->courses()->delete();
        $user_profile->courses()->createMany($recieved_courses);

        return Redirect::route('user.profile');
    }
}
