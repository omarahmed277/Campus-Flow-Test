<?php
require_once 'db_connect.php'; // Include database connection
require_once 'vendor/autoload.php'; // Load Composer autoloader

session_start();

$client = new Google_Client();
$client->setClientId($_ENV['GOOGLE_CLIENT_ID']);
$client->setClientSecret($_ENV['GOOGLE_CLIENT_SECRET']);
$client->setRedirectUri($_ENV['GOOGLE_REDIRECT_URI']);
$client->addScope("email");
$client->addScope("profile");

if (!isset($_GET['code'])) {
    // Redirect the user to Google OAuth URL
    header("Location: " . $client->createAuthUrl());
    exit();
} else {
    // Authenticate user
    $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
    if (isset($token['error'])) {
        echo json_encode(['errors' => ['general' => "Authentication failed."]]);
        exit();
    }
    
    $client->setAccessToken($token['access_token']);
    $google_oauth = new Google_Service_Oauth2($client);
    $user_info = $google_oauth->userinfo->get();

    $email = $user_info->email;
    $name = $user_info->name;
    $google_id = $user_info->id;

    // Check if user exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    
    if ($stmt->num_rows > 0) {
        // User exists, log them in
        $stmt->bind_result($user_id);
        $stmt->fetch();
        $_SESSION['user_id'] = $user_id;
    } else {
        // New user, insert into database
        $stmt = $conn->prepare("INSERT INTO users (name, email, google_id) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $name, $email, $google_id);
        if ($stmt->execute()) {
            $_SESSION['user_id'] = $stmt->insert_id;
        } else {
            echo json_encode(['errors' => ['general' => "Failed to create account."]]);
            exit();
        }
    }
    
    $stmt->close();
    echo json_encode(['redirect' => 'sign-up2.html']);
    exit();
}
