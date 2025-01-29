<?php
require_once 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__); // Use __DIR__ to point to the current folder
$dotenv->load();
?>