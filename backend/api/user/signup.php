<?php
    require_once '../_helpers.php';

    function signUp() {
        $postData = json_decode(file_get_contents("php://input"), true);
        $email = sanitizeInput($postData['email']);
        $password = $postData['password'];            

        // Validate email and password
        if (!validEmail($email) || !validPassword($password)) {                
            sendResponse(false, 'invalid_user_input', getLocalizedString('user.signup.invalid_user_input'), 'Invalid input patterns: Email or password did not match regex patterns.', 422);
            return;
        }

        // Check if email already exists
        $user = handleDatabaseQuery('SELECT * FROM users WHERE email = :email', [':email' => $email]);

        if ($user) {                
            sendResponse(false, 'duplicate_entry', getLocalizedString('user.signup.duplicate_entry'), 'The email address is already in use.', 409);
            return;
        }
        
        // Hash password and insert user into database
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $id = bin2hex(random_bytes(16));

        handleDatabaseQuery('INSERT INTO users (id, email, password) VALUES(:id, :email, :password)', [
            ':id' => $id, 
            ':email' => $email, 
            ':password' => $hashedPassword
        ]);
            
        sendResponse(true, 'none', 'none', 'none');
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {        
        $postData = json_decode(file_get_contents("php://input"), true);
        
        if (isset($postData['email']) && isset($postData['password'])) {            
            signUp();
        } else {            
            sendResponse(false, 'data_not_set', getLocalizedString('GLOBAL.data_not_set'), 'No email and/or password were passed with POST.', 500);
        }
    } else if ($_SERVER['REQUEST_METHOD'] !== 'OPTIONS') {        
        sendResponse(false, 'invalid_request_method', getLocalizedString('GLOBAL.invalid_request_method'), 'The data was sent using the wrong method, use POST.', 500);
    }
?>