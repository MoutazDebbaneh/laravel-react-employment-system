<?php

namespace App\Http\Controllers;

use App\Models\apiSource;
use App\Models\ScrapeSource;
use Illuminate\Http\Request;

class SourcesController extends Controller
{
    public function scrapeSourceAdd(Request $request)
    {
        $data = $request->input('editableSource');
        dd($data);
        // Handle Logo
        if ($request->hasFile('editableSource.logo')) {
            $file = $request->file('editableSource.logo');
            $savedFile = $file->store('public/images/sources');
            $data['logo'] = basename($savedFile);
        }

        $scrape_source = new ScrapeSource($data);
        $scrape_source->save();
        $scrape_source->scrapeSourceConfiguration()->create($data['scrape_source_configuration']);

        info('Scrape Source added');
        return back();
    }
    public function scrapeSourceEdit(string $id, Request $request)
    {
        $source = ScrapeSource::where(['id' => $id])->with('scrapeSourceConfiguration')->first();
        if (empty($source)) abort(404);

        $data = $request->input('editableSource');

        // Handle Logo
        if ($request->hasFile('editableSource.logo')) {
            $file = $request->file('editableSource.logo');
            $savedFile = $file->store('public/images/sources');
            $data['logo'] = basename($savedFile);
        }

        $source->fill($data);
        $source->scrapeSourceConfiguration->fill($data['scrape_source_configuration']);
        $source->scrapeSourceConfiguration->save();
        $source->save();
        info('Scrape Source updated');
        return back();
    }
    public function apiSourceAdd(Request $request)
    {
        $data = $request->input('editableSource');
        dd($data);
        // Handle Logo
        if ($request->hasFile('editableSource.logo')) {
            $file = $request->file('editableSource.logo');
            $savedFile = $file->store('public/images/sources');
            $data['logo'] = basename($savedFile);
        }

        $api_source = new apiSource($data);
        $api_source->save();
        $api_source->apiSourceConfiguration()->create($data['api_source_configuration']);

        info('API Source added');
        return back();
    }
    public function apiSourceEdit(string $id, Request $request)
    {
        // dd("here");
        $source = APISource::where(['id' => $id])->with('apiSourceConfiguration')->first();
        if (empty($source)) abort(404);

        $data = $request->input('editableSource');

        // Handle Logo
        if ($request->hasFile('editableSource.logo')) {
            $file = $request->file('editableSource.logo');
            $savedFile = $file->store('public/images/sources');
            $data['logo'] = basename($savedFile);
        }

        $source->fill($data);
        $source->apiSourceConfiguration->fill($data['api_source_configuration']);
        $source->apiSourceConfiguration->save();
        $source->save();
        info('API Source updated');
        return back();
    }
}
