<?php
    require_once '../_helpers.php';
    require_once '../_auth_helpers.php'; 

    use \Firebase\JWT\JWT;     
    use \Firebase\JWT\Key;    
       
    function deleteTask() {
        list('decoded' => $decoded, 'accessToken' => $accessToken) = authorizeRequest();
        $userId = $decoded->sub;               

        try {
            $taskId = sanitizeInput($_GET['id']);            
            $deletedTaskOrder = sanitizeInput($_GET['task_order']);            
            $db = DB::getInstance();                     
            
            $affectedRows = $db->query('DELETE FROM tasks WHERE id = :task_id AND user_id = :user_id', [':task_id' => $taskId, ':user_id' => $userId]);

            if ($affectedRows === 1) {               
                $updateOrderQuery = '
                UPDATE tasks 
                SET task_order = task_order - 1 
                WHERE task_order > :deleted_task_order 
                AND user_id = :user_id
                ';
                $params = [':deleted_task_order' => $deletedTaskOrder, ':user_id' => $userId];
                $affectedRows = $db->query($updateOrderQuery, $params);

                sendResponse(true, 'none', 'none', 'none', 200, ['accessToken' => $accessToken]);            
            }  else {
                sendResponse(false, 'id_mismatch', "You can't delete someone else's entry.", "The user committing the delete request doesn't own the entry.");
            }
        } catch (PDOException $e) {
            error_log($e->getMessage());
            sendResponse(false, "pdo_exception", "A server error occurred while processing your request. Please try again.",$e->getMessage(), 500);
        } catch (Exception $e) {            
            error_log($e->getMessage());            
            sendResponse(false, "unknown_exception", "An unexpected error occurred. Please try again.", $e->getMessage(), 500);
        }
    }

    if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {                       
        if (isset($_GET['id']) && isset($_GET['task_order'])) {            
            deleteTask();
        } else {            
            sendResponse(false, 'data_not_set', 'An unexpected error occurred. Please try again.', 'No id was provided in the url params.', 500);
        }
    } else if ($_SERVER['REQUEST_METHOD'] !== 'OPTIONS') {             
        sendResponse(false, 'invalid_request_method', 'An unexpected error occurred. Please try again.', 'The data was sent using the wrong method, use DELETE.', 500);
    }
?>