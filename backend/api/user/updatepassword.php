<?php
    require_once '../_helpers.php';
    require_once '../_auth_helpers.php'; 

    use \Firebase\JWT\JWT;     
    use \Firebase\JWT\Key;        
    
    function updatePassword() {                
        list('decoded' => $decoded, 'accessToken' => $accessToken) = authorizeRequest();    
        $userId = $decoded->sub;                       
        $putData = json_decode(file_get_contents("php://input"), true);                       
        $password = $putData['password'];            

        // Validate password
        if (!validPassword($password)) {                
            echo sendResponse(false, 'invalid_user_input', getLocalizedString('updatepassword.invalid_user_input'), 'Invalid input patterns: Password did not match regex pattern.');
            return;
        }

        // Hash password    
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Update password in database
        handleDatabaseQuery('UPDATE users SET password = :password WHERE id = :id', [':password' => $hashedPassword, ':id' => $userId]);                                  
        sendResponse(true, 'none', 'none', 'none', 200, ['accessToken' => $accessToken]);            
    }

    if ($_SERVER['REQUEST_METHOD'] === 'PUT') {                
        $putData = json_decode(file_get_contents("php://input"), true);
        
        if (isset($putData['password'])) {            
            updatePassword();
        } else {            
            sendResponse(false, 'data_not_set', getLocalizedString('GLOBAL.data_not_set'), 'No data was passed with PUT.', 500);
        }
    } else if ($_SERVER['REQUEST_METHOD'] !== 'OPTIONS') {             
        sendResponse(false, 'invalid_request_method', getLocalizedString('GLOBAL.invalid_request_method'), 'The data was sent using the wrong method, use PUT.', 500);
    }
?>