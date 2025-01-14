<?php
    // Set CORS headers
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, Accept-Language");
    header("Access-Control-Allow-Credentials: true");
    header("Content-Type: application/json");
    
    // Require necessary files
    require_once '../DB.php';
    require_once '../../libs/JWTExceptionWithPayloadInterface.php';
    require_once '../../libs/ExpiredException.php';    
    require_once '../../libs/JWT.php';    
    require_once '../../libs/Key.php';       

    $requestMethod = $_SERVER['REQUEST_METHOD'];

    // Load localized strings    
    function getLocalizedString($identifier) {
        $language = $_SERVER['HTTP_ACCEPT_LANGUAGE'];    
        $jsonFilePath = "../translations/$language/global.json";
        $fallbackFilePath = "../translations/en/global.json";
        
        if (!file_exists($jsonFilePath)) {
            $jsonFilePath = $fallbackFilePath;
        }
        
        $jsonContent = file_get_contents($jsonFilePath);        
        $localizedStrings = json_decode($jsonContent, true);
    
        if (json_last_error() !== JSON_ERROR_NONE) {
            die('Error decoding JSON: ' . json_last_error_msg());
        }
    
        if (!$localizedStrings) {
            die('Failed to load localized strings from: ' . $jsonFilePath);
        }
    
        // Split the identifier by dots to access nested keys
        $keys = explode('.', $identifier);
        $string = $localizedStrings;
    
        foreach ($keys as $key) {
            if (isset($string[$key])) {
                $string = $string[$key];                
            }
        }
    
        return $string;
    }        

    // Handle exceptions
    function handleException($e) {
        error_log($e->getMessage());
        
        if ($e instanceof PDOException) {
            sendResponse(false, "pdo_exception", getLocalizedString('GLOBAL.pdo_exception'), $e->getMessage(), 500);
        } else {
            sendResponse(false, "unknown_exception", getLocalizedString('GLOBAL.unknown_exception'), $e->getMessage(), 500);
        }

        exit();
    }

    // Handle database queries
    function handleDatabaseQuery($query, $params = []) {
        try {
            $db = DB::getInstance();
            return $db->query($query, $params);            
        } catch (Exception $e) {
            handleException($e);
        }
    }

    // Validate email and password
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
        return handleDatabaseQuery('SELECT email, role from users where id = :id', [':id' => $userId]);
    }

    function sanitizeInput($data) {
        return htmlspecialchars(strip_tags(trim($data)));
    }

    function deSanitizeQuill($data) {
        return htmlspecialchars_decode($data, ENT_QUOTES);
    }   
?>