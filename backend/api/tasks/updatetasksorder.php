<?php
    require_once '../_helpers.php';
    require_once '../_auth_helpers.php'; 

    use \Firebase\JWT\JWT;     
    use \Firebase\JWT\Key;        
    
    function updateOrder() {                
        list('decoded' => $decoded, 'accessToken' => $accessToken) = authorizeRequest();    
        $userId = $decoded->sub;               

        try {
            $putData = json_decode(file_get_contents("php://input"), true);           
            
            // Prepare the SQL statement 
            $updateOrderQuery = 'UPDATE tasks SET task_order = CASE id '; 
            
            foreach ($putData['tasks'] as $index => $task) {
                $taskId = intval($task['id']); 
                $taskOrder = intval($index + 1); 
                $updateOrderQuery .= "WHEN $taskId THEN $taskOrder "; 
            }

            $updateOrderQuery .= 'END WHERE id IN (' . implode(',', array_map('intval', array_column($putData['tasks'], 'id'))) . ') AND user_id = :user_id';                        
            $params = [':user_id' => $userId];           

            $db = DB::getInstance();                                         
            $db->query($updateOrderQuery, $params);                      
            
            sendResponse(true, 'none', 'none', 'none', 200, array('accessToken' => $accessToken));            
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
        
        if (isset($putData['tasks']) && is_array($putData['tasks'])) {            
            updateOrder();
        } else {            
            sendResponse(false, 'data_not_set', 'An unexpected error occurred. Please try again.', 'No data was passed with PUT.', 500);
        }
    } else if ($_SERVER['REQUEST_METHOD'] !== 'OPTIONS') {             
        sendResponse(false, 'invalid_request_method', 'An unexpected error occurred. Please try again.', 'The data was sent using the wrong method, use PUT.', 500);
    }
?>