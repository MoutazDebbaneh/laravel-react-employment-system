<?php

namespace App\Enums;

enum APIPassType: string
{
    case Query = 'Query';
    case Path = 'Path';
    case Form = 'Form';
}
