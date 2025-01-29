<?php
require_once 'config.php'; // Load environment variables

// Database Connection
$conn = new mysqli($_ENV['DB_HOST'], $_ENV['DB_USER'], $_ENV['DB_PASS'], $_ENV['DB_NAME']);

if ($conn->connect_error) {
    die(json_encode(['errors' => ['general' => "Database connection failed."]]));
}
?>