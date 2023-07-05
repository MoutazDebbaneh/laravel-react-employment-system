<!DOCTYPE html>
<html lang="{{ Session::get('locale') ?? 'en' }}" dir="{{ Session::get('locale') == 'en' || Session::get('locale') == null ? 'ltr' : 'rtl' }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />


        <link href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700,800" rel="stylesheet" />


        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/ts/app.tsx', "resources/ts/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
