<?php
    require_once '../_helpers.php';
    require_once '../_auth_helpers.php'; 

    use \Firebase\JWT\JWT;     
    use \Firebase\JWT\Key;       
    
    function addTask() {
        list('decoded' => $decoded, 'accessToken' => $accessToken) = authorizeRequest();    
        $userId = $decoded->sub;               

        try {            
            $db = DB::getInstance();                             

            $highestOrder = $db->query('SELECT MAX(task_order) as max_order FROM tasks WHERE user_id = :user_id', [':user_id' => $userId]);   
            $taskOrder = $highestOrder[0]['max_order'] + 1;           

            $postData = json_decode(file_get_contents("php://input"), true);
            $task = sanitizeInput($postData['task']);                       
            
            $db->query('INSERT INTO tasks (user_id, task, task_order) VALUES (:user_id, :task, :task_order)', [':user_id' => $userId, ':task' => $task, ':task_order' => $taskOrder]);

            sendResponse(true, 'none', 'none', 'none', 200, ['accessToken' => $accessToken]);            
        } catch (PDOException $e) {
            error_log($e->getMessage());
            sendResponse(false, "pdo_exception", "A server error occurred while processing your request. Please try again.",$e->getMessage(), 500);
        } catch (Exception $e) {            
            error_log($e->getMessage());            
            sendResponse(false, "unknown_exception", "An unexpected error occurred. Please try again.", $e->getMessage(), 500);
        }   
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {                
        $postData = json_decode(file_get_contents("php://input"), true);
        
        if (isset($postData['task'])) {            
            addTask();
        } else {            
            sendResponse(false, 'data_not_set', 'An unexpected error occurred. Please try again.', 'No data was passed with POST.', 500);
        }
    } else if ($_SERVER['REQUEST_METHOD'] !== 'OPTIONS') {             
        sendResponse(false, 'invalid_request_method', 'An unexpected error occurred. Please try again.', 'The data was sent using the wrong method, use POST.', 500);
    }
?>
