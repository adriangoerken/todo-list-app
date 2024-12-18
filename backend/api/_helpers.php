<?php
    // Set CORS headers
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Credentials: true");
    header("Content-Type: application/json");
    
    // Require necessary files
    require_once '../DB.php';
    require_once '../../libs/JWTExceptionWithPayloadInterface.php';
    require_once '../../libs/ExpiredException.php';    
    require_once '../../libs/JWT.php';    
    require_once '../../libs/Key.php';       

    // Store request method for convenience
    $requestMethod = $_SERVER['REQUEST_METHOD'];


    function validEmail($email) {
        $sanitizedEmail = filter_var($email, FILTER_SANITIZE_EMAIL);
        $emailRegex = '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/';
        return preg_match($emailRegex, $sanitizedEmail);
    }

    function validPassword($password) {
        $passwordRegex = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,128}$/';
        return preg_match($passwordRegex, $password);
    }    

    function genResponse ($success, $errorType, $error, $errorDebug, $data = []) {        
        return json_encode([
            "success" => $success,
            "errorType" => $errorType,
            "error" => $error,
            "errorDebug" => $errorDebug,                        
            "data" => $data,            
        ]);        
    }

    function sendResponse($success, $type, $userMessage, $logMessage, $code = 200, $data = []) {                                
        http_response_code($code);
        echo genResponse($success, $type, $userMessage, $logMessage, $data);        
    }    

    function retrieveUserInfo($userId) {
        $db = DB::getInstance();        
        return $db->query('SELECT email, role from users where id = :id', [':id' => $userId]);
    }

    function sanitizeInput($data) {
        return htmlspecialchars(strip_tags(trim($data)));
    }

    function deSanitizeQuill($data) {
        return htmlspecialchars_decode($data, ENT_QUOTES);
    }   
?>