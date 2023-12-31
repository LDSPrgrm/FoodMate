<?php
require "db_connection.php";

$postData = file_get_contents('php://input');
$data = json_decode($postData, true);

$username = $data['username'];
$password = $data['password'];
$firstName = $data['first_name'];
$middleName = $data['middle_name'];
$lastName = $data['last_name'];
$sex = $data['sex'];
$civilStatus = $data['civil_status'];
$email = $data['email'];

// Hash the password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO `users` (username, password, first_name, middle_name, last_name, sex, civil_status, email) VALUES(?,?,?,?,?,?,?,?)";
$stmt = $db_conn->prepare($sql);
$stmt->bind_param("ssssssss", $username, $hashedPassword, $firstName, $middleName, $lastName, $sex, $civilStatus, $email);

if ($stmt->execute()) {
    // User exists, fetch user data and send a success response with user information
    header('Content-Type: application/json');
    echo json_encode(['success' => true, 'message' => 'Registration successful.']);
} else {
    // User doesn't exist or credentials are incorrect, send a failure response
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'error' => 'Invalid username or password.']);
}

// Close the connection
$stmt->close();
$db_conn->close();
?>
