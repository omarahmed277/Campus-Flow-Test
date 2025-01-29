<?php
require_once 'db_connect.php'; // Include database connection
require_once 'vendor/autoload.php'; // Load Composer autoloader

header('Content-Type: application/json'); // Ensure JSON response
session_start();

// Process AJAX Request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $errors = [];
    $successMessage = '';

    // Get JSON input
    $data = json_decode(file_get_contents("php://input"), true);

    $name = trim($data['userName'] ?? '');
    $email = trim($data['email'] ?? '');
    $password = $data['password'] ?? '';
    $confirmPassword = $data['passwordConfirm'] ?? '';
    $phone = trim($data['phone'] ?? '');

    // Validation
    if (empty($name)) $errors['name'] = "Name is required.";
    if (empty($email)) {
        $errors['email'] = "Email is required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "الرجاء إدخال بريد إلكتروني صالح.";
    }
    if (empty($password)) {
        $errors['password'] = "Password is required.";
    } elseif (!preg_match('/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/', $password)) {
        $errors['password'] = "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل وتحتوي على حرف كبير وحرف صغير ورقم ورمز.";
    }
    if (empty($confirmPassword)) {
        $errors['confirm-password'] = "Confirm Password is required.";
    } elseif ($password !== $confirmPassword) {
        $errors['confirm-password'] = "كلمة المرور غير متطابقة.";
    }
    if (!empty($phone) && !preg_match('/^\d{10,15}$/', $phone)) {
        $errors['phone'] = "يجب أن يحتوي رقم الهاتف على 10-15 رقمًا.";
    }

    // Check if email already exists
    if (empty($errors['email'])) {
        $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();
        if ($stmt->num_rows > 0) {
            $errors['email'] = "البريد الإلكتروني موجود بالفعل.";
        }
        $stmt->close();
    }

    // If no errors, insert into database
    if (empty($errors)) {
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $conn->prepare("INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)");
        if ($stmt) {
            $stmt->bind_param("ssss", $name, $email, $hashedPassword, $phone);
            if ($stmt->execute()) {
                $_SESSION['user_id'] = $stmt->insert_id; // Store user ID for next step
                $successMessage = "تم التسجيل بنجاح....";
                echo json_encode(['errors' => $errors, 'successMessage' => $successMessage, 'redirect' => 'sign-up2.html']);
                exit();
            } else {
                $errors['general'] = "حدث خطأ ما. الرجاء المحاولة مرة أخرى.";
            }
            $stmt->close();
        } else {
            $errors['general'] = "حدث خطأ ما. الرجاء المحاولة مرة أخرى.";
        }
    }

    // Return JSON response
    echo json_encode(['errors' => $errors]);
    exit();
}

$conn->close();
?>