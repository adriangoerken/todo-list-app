<?php
    require_once '../_helpers.php';
    require_once '../_auth_helpers.php'; 

    use \Firebase\JWT\JWT;     
    use \Firebase\JWT\Key;       
    
    function addTask() {
        list('decoded' => $decoded, 'accessToken' => $accessToken) = authorizeRequest();    
        $userId = $decoded->sub;                       
        $postData = json_decode(file_get_contents("php://input"), true);
        $task = sanitizeInput($postData['task']);                       

        // Get highest order number and increment by 1
        $highestOrder = handleDatabaseQuery('SELECT MAX(task_order) as max_order FROM tasks WHERE user_id = :user_id', [':user_id' => $userId]);   
        $taskOrder = $highestOrder[0]['max_order'] + 1;                   
        
        // Insert task into database
        handleDatabaseQuery('INSERT INTO tasks (user_id, task, task_order) VALUES (:user_id, :task, :task_order)', [':user_id' => $userId, ':task' => $task, ':task_order' => $taskOrder]);
        sleep(2);
        sendResponse(true, 'none', 'none', 'none', 200, ['accessToken' => $accessToken]);                    
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {                
        $postData = json_decode(file_get_contents("php://input"), true);
        
        if (isset($postData['task'])) {            
            addTask();
        } else {            
            sendResponse(false, 'data_not_set', getLocalizedString('GLOBAL.data_not_set'), 'No data was passed with POST.', 500);
        }
    } else if ($_SERVER['REQUEST_METHOD'] !== 'OPTIONS') {             
        sendResponse(false, 'invalid_request_method', getLocalizedString('GLOBAL.invalid_request_method'), 'The data was sent using the wrong method, use POST.', 500);
    }
?>
