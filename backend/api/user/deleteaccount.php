<?php
    require_once '../_helpers.php';
    require_once '../_auth_helpers.php'; 

    use \Firebase\JWT\JWT;     
    use \Firebase\JWT\Key;    

    function deleteAccount() {
        list('decoded' => $decoded, 'accessToken' => $accessToken) = authorizeRequest();    
        $userId = $decoded->sub;               

        try {            
            $db = DB::getInstance(); 
            $db->beginTransaction(); 

            // Remove the refresh token from the database                 
            $db->query("DELETE FROM refresh_tokens WHERE user_id = :user_id", [':user_id' => $userId]); 
                
            // Remove user tasks from the database 
            $db->query("DELETE FROM tasks WHERE user_id = :user_id", [':user_id' => $userId]); 
                
            // Remove user 
            $db->query("DELETE FROM users WHERE id = :id", [':id' => $userId]); 
            $db->commit(); // Commit transaction 
                
            // Clear the refresh token cookie 
            resetTokenCookie();

            // Respond to the client
            sendResponse(true, 'none', 'none', 'none');            
        } catch (PDOException $e) {
            error_log($e->getMessage());
            sendResponse(false, "pdo_exception", getLocalizedString('GLOBAL.pdo_exception'), $e->getMessage(), 500);
        } catch (Exception $e) {
            error_log($e->getMessage());
            sendResponse(false, "unknown_exception", getLocalizedString('GLOBAL.unknown_exception'), $e->getMessage(), 500);
        }
    }

    // Handle the POST request for signing out
    if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        deleteAccount();
    } else if ($_SERVER['REQUEST_METHOD'] !== 'OPTIONS') {
        sendResponse(false, 'invalid_request_method', getLocalizedString('GLOBAL.invalid_request_method'), 'The data was sent using the wrong method, use DELETE.', 500);
    }

?>