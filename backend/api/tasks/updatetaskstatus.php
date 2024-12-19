<?php
    require_once '../_helpers.php';
    require_once '../_auth_helpers.php'; 

    use \Firebase\JWT\JWT;     
    use \Firebase\JWT\Key;        
    
    function updateStatus() {                
        list('decoded' => $decoded, 'accessToken' => $accessToken) = authorizeRequest();    
        $userId = $decoded->sub;               

        try {
            $putData = json_decode(file_get_contents("php://input"), true);           
            $id = $putData['id'];
            $isDone = $putData['isDone'] === true ? 1 : 0;                
            

            $db = DB::getInstance();                                         
            $db->query('UPDATE tasks SET is_done = :isDone WHERE id = :id AND user_id = :userId', [':isDone' => $isDone, ':id' => $id, ':userId' => $userId]);                      
            
            sendResponse(true, 'none', 'none', 'none', 200, ['accessToken' => $accessToken]);            
        } catch (PDOException $e) {
            error_log($e->getMessage());
            sendResponse(false, "pdo_exception", "A server error occurred while processing your request. Please try again.",$e->getMessage(), 500);
        } catch (Exception $e) {            
            error_log($e->getMessage());            
            sendResponse(false, "unknown_exception", "An unexpected error occurred. Please try again.", $e->getMessage(), 500);
        }   
    }

    if ($_SERVER['REQUEST_METHOD'] === 'PUT') {                
        $putData = json_decode(file_get_contents("php://input"), true);
        
        if (isset($putData['id']) && isset($putData['isDone'])) {            
            updateStatus();
        } else {            
            sendResponse(false, 'data_not_set', 'An unexpected error occurred. Please try again.', 'No data was passed with PUT.', 500);
        }
    } else if ($_SERVER['REQUEST_METHOD'] !== 'OPTIONS') {             
        sendResponse(false, 'invalid_request_method', 'An unexpected error occurred. Please try again.', 'The data was sent using the wrong method, use PUT.', 500);
    }
?>