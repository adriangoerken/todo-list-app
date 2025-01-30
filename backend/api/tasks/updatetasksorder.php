<?php
    require_once '../_helpers.php';
    require_once '../_auth_helpers.php'; 

    use \Firebase\JWT\JWT;     
    use \Firebase\JWT\Key;        
    
    function updateOrder() {                
        list('decoded' => $decoded, 'accessToken' => $accessToken) = authorizeRequest();    
        $userId = $decoded->sub;                       
        $putData = json_decode(file_get_contents("php://input"), true);           
            
        // Prepare the SQL statement 
        $updateOrderQuery = 'UPDATE taskdoneify_tasks SET task_order = CASE id '; 
        
        // Loop through the tasks and add the task ID and order number to the SQL statement
        foreach ($putData['tasks'] as $index => $task) {
            $taskId = intval($task['id']); 
            $taskOrder = intval($index + 1); 
            $updateOrderQuery .= "WHEN $taskId THEN $taskOrder "; 
        }

        // Add the user ID to the SQL statement and close the query
        $updateOrderQuery .= 'END WHERE id IN (' . implode(',', array_map('intval', array_column($putData['tasks'], 'id'))) . ') AND user_id = :user_id';                        
        $params = [':user_id' => $userId];                   
        
        // Execute the SQL statement
        handleDatabaseQuery($updateOrderQuery, $params);                                  
        sendResponse(true, 'none', 'none', 'none', 200, ['accessToken' => $accessToken]);                    
    }

    if ($_SERVER['REQUEST_METHOD'] === 'PUT') {                
        $putData = json_decode(file_get_contents("php://input"), true);
        
        if (isset($putData['tasks']) && is_array($putData['tasks'])) {            
            updateOrder();
        } else {            
            sendResponse(false, 'data_not_set', getLocalizedString('GLOBAL.data_not_set'), 'No data was passed with PUT.', 500);
        }
    } else if ($_SERVER['REQUEST_METHOD'] !== 'OPTIONS') {             
        sendResponse(false, 'invalid_request_method', getLocalizedString('GLOBAL.invalid_request_method'), 'The data was sent using the wrong method, use PUT.', 500);
    }
?>