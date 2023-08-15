<?php

namespace App\Enums;

enum NotificationType: int
{
    case ApplicationSubmitted = 0;
    case ApplicationAccepted = 1;
    case ApplicationDeclined = 2;
    case JobAdded = 3;
    case CompanyVerificationRequestSent = 4;
    case CompanyVerificationRequestAccepted = 5;
}
