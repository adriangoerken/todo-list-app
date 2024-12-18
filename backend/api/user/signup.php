<?php
    require_once '../_helpers.php';

    function signUp() {
        try {
            $postData = json_decode(file_get_contents("php://input"), true);
            $email = sanitizeInput($postData['email']);
            $password = $postData['password'];            

            if (!validEmail($email) || !validPassword($password)) {                
                echo sendResponse(false, 'invalid_user_input', 'Invalid email or password format. Please try again.', 'Invalid input patterns: Email or password did not match regex patterns.', 422);
                return;
            }

            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $id = bin2hex(random_bytes(16));

            $db = DB::getInstance();
            $db->query('INSERT INTO users (id, email, password) VALUES(:id, :email, :password)', [
                ':id' => $id, 
                ':email' => $email, 
                ':password' => $hashedPassword
            ]);
            
            sendResponse(true, 'none', 'none', 'none');
        } catch (PDOException $e) {
            if ($e->getCode() == 23000) {
                error_log($e->getMessage());
                sendResponse(false, 'duplicate_entry', 'The email address is already in use.', $e->getMessage(), 409);                
            } else {
                error_log($e->getMessage());
                sendResponse(false, 'pdo_exception', 'A server error occurred while processing your request. Please try again.', $e->getMessage(), 500);            
            }
        } catch (Exception $e) {
            error_log($e->getMessage());            
            sendResponse(false, 'unknown_exception', 'An unexpected error occurred. Please try again.', $e->getMessage(), 500);
        }
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {        
        $postData = json_decode(file_get_contents("php://input"), true);
        
        if (isset($postData['email']) && isset($postData['password'])) {            
            signUp();
        } else {            
            sendResponse(false, 'data_not_set', 'An unexpected error occurred. Please try again.', 'No email and/or password were passed with POST.', 500);
        }
    } else if ($_SERVER['REQUEST_METHOD'] !== 'OPTIONS') {        
        sendResponse(false, 'invalid_request_method', 'An unexpected error occurred. Please try again.', 'The data was sent using the wrong method, use POST.', 500);
    }
?>