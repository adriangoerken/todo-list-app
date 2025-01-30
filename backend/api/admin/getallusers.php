<?php
    require_once '../_helpers.php';
    require_once '../_auth_helpers.php'; 

    use \Firebase\JWT\JWT;     
    use \Firebase\JWT\Key;                  

    function getAllUsers() {        
        list('decoded' => $decoded, 'accessToken' => $accessToken) = authorizeRequest();    
        $userId = $decoded->sub;
        authorizeAdminRequest($userId);               
        
        $result = handleDatabaseQuery('SELECT (SELECT COUNT(*) FROM taskdoneify_users) AS user_count, email, id, role, signup_date, signup_number FROM taskdoneify_users ORDER BY signup_number ASC');
        sendResponse(true, 'none', 'none', 'none', 200, ['users' => $result, 'accessToken' => $accessToken]);        
    }
    

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {                       
        getAllUsers();        
    } else if ($_SERVER['REQUEST_METHOD'] !== 'OPTIONS') {             
        sendResponse(false, 'invalid_request_method', getLocalizedString('GLOBAL.invalid_request_method'), 'The data was sent using the wrong method, use POST.', 500);
    }
?>