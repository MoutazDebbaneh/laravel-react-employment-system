<?php

namespace App\Enums;

enum Role: int
{
    case Root_Admin = 1;
    case Admin = 2;
    case User = 3;
    case Company = 4;
}
