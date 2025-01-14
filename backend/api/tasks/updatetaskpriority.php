<?php
    require_once '../_helpers.php';
    require_once '../_auth_helpers.php'; 

    use \Firebase\JWT\JWT;     
    use \Firebase\JWT\Key;        
    
    function updatePriority() {                
        list('decoded' => $decoded, 'accessToken' => $accessToken) = authorizeRequest();    
        $userId = $decoded->sub;                       
        $putData = json_decode(file_get_contents("php://input"), true);           
        $id = $putData['id'];
        $priority = $putData['priority'];                            

        // Update priority of the task
        HandleDatabaseQuery('UPDATE tasks SET priority = :priority WHERE id = :id AND user_id = :userId', [':priority' => $priority, ':id' => $id, ':userId' => $userId]);                                  
        sendResponse(true, 'none', 'none', 'none', 200, ['accessToken' => $accessToken]);                    
    }

    if ($_SERVER['REQUEST_METHOD'] === 'PUT') {                
        $putData = json_decode(file_get_contents("php://input"), true);
        
        if (isset($putData['id']) && isset($putData['priority'])) {            
            updatePriority();
        } else {            
            sendResponse(false, 'data_not_set', getLocalizedString('GLOBAL.data_not_set'), 'No data was passed with PUT.', 500);
        }
    } else if ($_SERVER['REQUEST_METHOD'] !== 'OPTIONS') {             
        sendResponse(false, 'invalid_request_method', getLocalizedString('GLOBAL.invalid_request_method'), 'The data was sent using the wrong method, use PUT.', 500);
    }
?>