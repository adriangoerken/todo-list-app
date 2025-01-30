<?php
    require_once '../_helpers.php';
    require_once '../_auth_helpers.php'; 

    use \Firebase\JWT\JWT;     
    use \Firebase\JWT\Key;                  

    function getTasks() {        
        list('decoded' => $decoded, 'accessToken' => $accessToken) = authorizeRequest();    
        $userId = $decoded->sub;                  
        
        // Get tasks from database
        $result = handleDatabaseQuery('SELECT id, task, task_order, priority, is_done, created_at FROM taskdoneify_tasks WHERE user_id = :user_id ORDER BY priority ASC, task_order ASC', [':user_id' => $userId]);              
        sendResponse(true, 'none', 'none', 'none', 200, ['tasks' => $result, 'accessToken' => $accessToken]);    
    }    

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {                       
        getTasks();        
    } else if ($_SERVER['REQUEST_METHOD'] !== 'OPTIONS') {             
        sendResponse(false, 'invalid_request_method', getLocalizedString('GLOBAL.invalid_request_method'), 'The data was sent using the wrong method, use POST.', 500);
    }
?>