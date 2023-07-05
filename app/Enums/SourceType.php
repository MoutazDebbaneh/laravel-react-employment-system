<?php

namespace App\Enums;

enum SourceType: int
{
    case Internal = 1;
    case Scrape = 2;
    case API = 3;
}
