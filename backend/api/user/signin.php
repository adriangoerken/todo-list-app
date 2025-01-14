<?php
    require_once '../_helpers.php';
    require_once '../_auth_helpers.php'; 

    use \Firebase\JWT\JWT;     
    use \Firebase\JWT\Key;    

    // Sign in
    function signIn() {                
        $postData = json_decode(file_get_contents("php://input"), true);
        $email = $postData['email'];
        $password = $postData['password'];    
        
        // Check if email exists
        $result = handleDatabaseQuery("SELECT id, email, password, role FROM users WHERE email = :email", [':email' => $email]);            
    
        if (count($result) === 1) {                
            if (password_verify($password, $result[0]['password'])) {                    
                // JWT Tokens                    
                $privateKey = file_get_contents('../../private.pem');                      
                $userId = $result[0]['id'];                    
                    
                // Generate access token (valid for 15 minutes)
                $accessToken = JWT::encode([
                    'iss' => 'your-domain.com', // Issuer
                    'sub' => $userId,          // Subject (user ID)
                    'exp' => time() + 900       // Expiration time (15 minutes)
                ], $privateKey, 'RS256');

                // Generate refresh token (valid for 90 days)
                $refreshToken = JWT::encode([
                    'iss' => 'your-domain.com',
                    'sub' => $userId,
                    'exp' => time() + (90 * 24 * 60 * 60) // 90 days expiration
                ], $privateKey, 'RS256');                    

                $expiresAt = date('Y-m-d H:i:s', time() + (90 * 24 * 60 *60));

                // Store refresh token in database
                handleDatabaseQuery("INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (:user_id, :token, :expires_at)", [':user_id' => $userId, ':token' => $refreshToken, ':expires_at' => $expiresAt]);                    
                
                // Set refresh token as cookie
                if (isset($_COOKIE['cookieConsent']) && $_COOKIE['cookieConsent'] === 'true') {
                    setcookie(
                        'refreshToken', 
                        $refreshToken, 
                        [
                        'expires' => time() + (90 * 24 * 60 * 60),
                        'path' => '/',
                        'domain' => '',
                        'secure' => false,   // Set to true in production
                        'httponly' => true,
                        'samesite' => 'Lax' // Remove in production
                        ]
                    );
                }

                // Response
                sendResponse(true, 'none', 'none', 'none', 200, [
                    "userInfo" => [
                        "userId" => $userId,
                        "email" => $result[0]['email'],
                        "role" => $result[0]['role'],
                        "accessToken" => $accessToken
                ]]);                    
            } else {                    
                sendResponse(false, "wrong_password", getLocalizedString('user.signin.wrong_password'), "The user entered a password that does not match the email address provided.", 401);                    
            }
        } else {
            sendResponse(false, "email_not_found", getLocalizedString('user.signin.email_not_found'), "The provided email does not exist in the database.", 404);                                    
        }
        
    }    

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {                
        $postData = json_decode(file_get_contents("php://input"), true);
        
        if (isset($postData['email']) && isset($postData['password'])) {            
            signIn();            
        } else {            
            sendResponse(false, 'data_not_set', getLocalizedString('GLOBAL.data_not_set'), 'No email and/or password were passed with POST.', 500);
        }
    } else if ($_SERVER['REQUEST_METHOD'] !== 'OPTIONS') {             
        sendResponse(false, 'invalid_request_method', getLocalizedString('GLOBAL.invalid_request_method'), 'The data was sent using the wrong method, use POST.', 500);
    }
?>