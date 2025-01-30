<?php    
    use \Firebase\JWT\JWT;    
    use \Firebase\JWT\JWTExceptionWithPayloadInterface;    
    use \Firebase\JWT\ExpiredException;        
    use \Firebase\JWT\Key;    
    
    function retrieveRefreshToken() {
        return $_COOKIE['taskdoneify_refreshToken'] ?? null;
    }

    function verifyRefreshTokenDB($refreshToken) {        
        $result = handleDatabaseQuery('SELECT * FROM taskdoneify_refresh_tokens WHERE token = :token AND expires_at > NOW()', [':token' => $refreshToken]);
        return $result ? true : false;
    }    

    function retrieveAccessToken() {
        $headers = apache_request_headers();
        return isset($headers['Authorization']) ? str_replace('Bearer ', '', $headers['Authorization']) : null;                
    }

    function resetTokenCookie() { 
        setcookie(
            'taskdoneify_refreshToken',
            '',
            [
                'expires' => time() - 3600,
                'path' => '/',
                'domain' => 'adriangoerken.de',
                'secure' => true, // Set to true in production
                'httponly' => true,
                'samesite' => 'None' // Set to Strict in production
            ]
        );
    }
    
    function verifyToken($token) {
        $publicKey = file_get_contents('../../public.pem');
    
        try {
            return JWT::decode($token ?? '', new Key($publicKey, 'RS256'));            
        } catch (Exception $e) {            
            return false;
        }
    }    

    function refreshAccessToken() {
        $refreshToken = retrieveRefreshToken();
        $publicKey = file_get_contents('../../public.pem');        

        $decoded = verifyToken($refreshToken);

        if (!$decoded) {
            sendResponse(false, 'invalid_refresh_token', getLocalizedString('GLOBAL.invalid_refresh_token'), 'The refreshToken was invalid when tried to generate a new accessToken from it.', 401);            
            exit();
        }

        $userId = $decoded->sub;    

        try {                       
            // Generate new access token
            $payload = [
                "sub" => $userId,
                "exp" => time() + 900
            ];

            $privateKey = file_get_contents('../../private.pem');
            $accessToken = JWT::encode($payload, $privateKey, 'RS256');
    
            return $accessToken;
        } catch (Exception $e) {
            return false;
        }    
    }
 
    function authorizeRequest() {
        $accessToken = retrieveAccessToken();
        $decoded = verifyToken($accessToken);
    
        if (!$decoded) {            
            $newAccessToken = refreshAccessToken();
            
            if ($newAccessToken) {
                $accessToken = $newAccessToken;
                $decoded = verifyToken($newAccessToken);
    
                if (!$decoded) {
                    sendResponse(false, 'invalid_access_token', getLocalizedString('GLOBAL.invalid_access_token'), 'The refreshed accessToken was invalid.', 401);
                    exit();
                }
            } else {
                sendResponse(false, 'invalid_refresh_token', getLocalizedString('GLOBAL.invalid_refresh_token'), 'The refreshToken was invalid and a new accessToken could not be generated.', 401);
                exit();
            }
        }
    
        return ['decoded' => $decoded, 'accessToken' => $accessToken];
    }    

    function authorizeAdminRequest($userId) {                       
        $result = handleDatabaseQuery('SELECT COUNT(*) AS count FROM taskdoneify_users WHERE :id = :id AND role = 0', [':id' => $userId]);
        
        if (!$result || $result[0]['count'] !== 1) {
            sendResponse(false, 'unauthorized_admin_request', 'Access denied!', 'The user is not authorized to perform this action.', 403);
            exit();
        }
    }    
?>