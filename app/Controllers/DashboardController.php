<?php

namespace App\Controllers;

class DashboardController
{
  public function showDashboard()
  {
    include __DIR__ . "/../Views/dashboard.php";
  }
}
