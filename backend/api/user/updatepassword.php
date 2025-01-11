<?php
    require_once '../_helpers.php';
    require_once '../_auth_helpers.php'; 

    use \Firebase\JWT\JWT;     
    use \Firebase\JWT\Key;        
    
    function updatePassword() {                
        list('decoded' => $decoded, 'accessToken' => $accessToken) = authorizeRequest();    
        $userId = $decoded->sub;               

        try {
            $putData = json_decode(file_get_contents("php://input"), true);                       
            $password = $putData['password'];            

            if (!validPassword($password)) {                
                echo sendResponse(false, 'invalid_user_input', getLocalizedString('updatepassword.invalid_user_input'), 'Invalid input patterns: Password did not match regex pattern.');
                return;
            }

            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

            $db = DB::getInstance();                                         
            $db->query('UPDATE users SET password = :password WHERE id = :id', [':password' => $hashedPassword, ':id' => $userId]);                      
            
            sendResponse(true, 'none', 'none', 'none', 200, ['accessToken' => $accessToken]);            
        } catch (PDOException $e) {
            error_log($e->getMessage());
            sendResponse(false, "pdo_exception", getLocalizedString('GLOBAL.pdo_exception'),$e->getMessage(), 500);
        } catch (Exception $e) {            
            error_log($e->getMessage());            
            sendResponse(false, "unknown_exception", getLocalizedString('GLOBAL.unknown_exception'), $e->getMessage(), 500);
        }   
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