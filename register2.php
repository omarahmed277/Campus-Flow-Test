<?php
// Include the database connection
require_once 'db_connect.php';

// Initialize error messages array
$errorMessages = [];

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Validate gender
    if (empty($_POST['gender'])) {
        $errorMessages['gender'] = "الرجاء اختيار الجنس.";
    }

    // Validate country
    if (empty($_POST['country'])) {
        $errorMessages['country'] = "الرجاء إدخال البلد.";
    } elseif (!preg_match("/^[\p{Arabic}\s]+$/u", $_POST['country'])) {
        $errorMessages['country'] = "اسم البلد غير صحيح.";
    }

    // Validate specialty
    if (empty($_POST['specialty'])) {
        $errorMessages['specialty'] = "الرجاء اختيار التخصص.";
    }

    // Validate experience
    if (empty($_POST['experience'])) {
        $errorMessages['experience'] = "الرجاء اختيار عدد سنوات الخبرة.";
    }

    // Validate about me
    if (empty($_POST['about-me'])) {
        $errorMessages['about-me'] = "الرجاء إضافة نبذة عنك.";
    }

    // If there are no errors, insert data into the database
    if (empty($errorMessages)) {
        // Get form values
        $gender = $_POST['gender'];
        $country = $_POST['country'];
        $specialty = $_POST['specialty'];
        $experience = $_POST['experience'];
        $aboutMe = $_POST['about-me'];

        // Prepare an SQL statement to prevent SQL injection
        $stmt = $conn->prepare("INSERT INTO users (gender, country, specialty, experience, about_me) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $gender, $country, $specialty, $experience, $aboutMe);

        // Execute the query and check if it was successful
        if ($stmt->execute()) {
            // Success, return a success message
            echo json_encode(['success' => true, 'message' => 'تم التسجيل بنجاح.']);
        } else {
            // Database insertion failed, return error message
            echo json_encode(['success' => false, 'message' => 'حدث خطأ أثناء التسجيل: ' . $stmt->error]);
        }

        // Close the statement and connection
        $stmt->close();
        $conn->close();
    } else {
        // Return validation errors in JSON format
        echo json_encode(['success' => false, 'errors' => $errorMessages]);
    }
}
?>