<?php    
    use \Firebase\JWT\JWT;    
    use \Firebase\JWT\JWTExceptionWithPayloadInterface;    
    use \Firebase\JWT\ExpiredException;        
    use \Firebase\JWT\Key;    
    
    function retrieveRefreshToken() {
        return $_COOKIE['refreshToken'] ?? null;
    }

    function verifyRefreshTokenDB($refreshToken) {
        $db = DB::getInstance();
        $result = $db->query('SELECT * FROM refresh_tokens WHERE token = :token AND expires_at > NOW()', [':token' => $refreshToken]);
        return $result ? true : false;
    }    

    function retrieveAccessToken() {
        $headers = apache_request_headers();
        return isset($headers['Authorization']) ? str_replace('Bearer ', '', $headers['Authorization']) : null;                
    }

    function resetTokenCookie() { 
        setcookie(
            'refreshToken',
            '',
            [
                'expires' => time() - 3600,
                'path' => '/',
                'domain' => '',
                'secure' => false, // Set to true in production
                'httponly' => true,
                'samesite' => 'Lax' // Set to Strict in production
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
            sendResponse(false, 'invalid_refresh_token', 'Your session has expired. Please sign in again.', 'The refreshToken was invalid when tried to generate a new accessToken from it.', 401);            
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
                    sendResponse(false, 'invalid_access_token', 'Your session has expired. Please sign in again.', 'The refreshed accessToken was invalid.', 401);
                    exit();
                }
            } else {
                sendResponse(false, 'invalid_refresh_token', 'Your session has expired. Please sign in again.', 'The refreshToken was invalid and a new accessToken could not be generated.', 401);
                exit();
            }
        }
    
        return ['decoded' => $decoded, 'accessToken' => $accessToken];
    }    
?>