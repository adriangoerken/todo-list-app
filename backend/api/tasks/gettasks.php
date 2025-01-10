<?php
    require_once '../_helpers.php';
    require_once '../_auth_helpers.php'; 

    use \Firebase\JWT\JWT;     
    use \Firebase\JWT\Key;                  

    function getTasks() {        
        list('decoded' => $decoded, 'accessToken' => $accessToken) = authorizeRequest();    
        $userId = $decoded->sub;               
    
        try {            
            $db = DB::getInstance();                                         
            $result = $db->query('SELECT id, task, task_order, priority, is_done, created_at FROM tasks WHERE user_id = :user_id ORDER BY priority ASC, task_order ASC', [':user_id' => $userId]);  
            
            sendResponse(true, 'none', 'none', 'none', 200, ['tasks' => $result, 'accessToken' => $accessToken]);
        } catch (PDOException $e) {
            error_log($e->getMessage());
            sendResponse(false, "pdo_exception", getLocalizedString('GLOBAL.pdo_exception'),$e->getMessage(), 500);
        } catch (Exception $e) {            
            error_log($e->getMessage());            
            sendResponse(false, "unknown_exception", getLocalizedString('GLOBAL.unknown_exception'), $e->getMessage(), 500);
        }           
    }
    

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {                       
        getTasks();        
    } else if ($_SERVER['REQUEST_METHOD'] !== 'OPTIONS') {             
        sendResponse(false, 'invalid_request_method', getLocalizedString('GLOBAL.invalid_request_method'), 'The data was sent using the wrong method, use POST.', 500);
    }
?>