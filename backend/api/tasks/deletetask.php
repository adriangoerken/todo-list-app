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
                sendResponse(false, 'id_mismatch', getLocalizedString('tasks.deletetask.id_mismatch'), "The user committing the delete request doesn't own the entry.");
            }
        } catch (PDOException $e) {
            error_log($e->getMessage());
            sendResponse(false, "pdo_exception", getLocalizedString('GLOBAL.pdo_exception'),$e->getMessage(), 500);
        } catch (Exception $e) {            
            error_log($e->getMessage());            
            sendResponse(false, "unknown_exception", getLocalizedString('GLOBAL.unknown_exception'), $e->getMessage(), 500);
        }
    }

    if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {                       
        if (isset($_GET['id']) && isset($_GET['task_order'])) {            
            deleteTask();
        } else {            
            sendResponse(false, 'data_not_set', getLocalizedString('GLOBAL.data_not_set'), 'No id was provided in the url params.', 500);
        }
    } else if ($_SERVER['REQUEST_METHOD'] !== 'OPTIONS') {             
        sendResponse(false, 'invalid_request_method', getLocalizedString('GLOBAL.invalid_request_method'), 'The data was sent using the wrong method, use DELETE.', 500);
    }
?>