<?php
    require_once '../_helpers.php';
    require_once '../_auth_helpers.php';

    function checkRefreshToken() {        
        // Check if a refresh token is stored
        $refreshToken = retrieveRefreshToken();

        if (!$refreshToken) {                            
            sendResponse(false, 'invalid_refresh_token', 'Your session has expired. Please sign in again.', 'No refreshToken was provided.');
            exit();
        }

        // Check if the refresh token is valid and not expired in the database       
        if (!verifyRefreshTokenDB($refreshToken)) {            
            resetTokenCookie();
            sendResponse(false, 'invalid_refresh_token', 'Your session has expired. Please sign in again.', 'RefreshToken is not in the database or has expired.');
            exit();
        }

        // Verify the refresh token
        $decoded = verifyToken($refreshToken);

        if (!$decoded) {            
            sendResponse(false, 'invalid_refresh_token', 'Your session has expired. Please sign in again.', 'Invalid refresh token signature.');
            exit();
        }

        // Refresh the access token
        $newAccessToken = refreshAccessToken($refreshToken);

        if (!$newAccessToken) {                                
            sendResponse(false, 'invalid_refresh_token', 'Your session has expired. Please sign in again.', 'RefreshToken is invalid, Access Denied.');
            exit();
        }

        // Retrieve user information from the database using the decoded token
        $userId = $decoded->sub;                        
        $userInfo = retrieveUserInfo($userId);

        if (count($userInfo) !== 1) {            
            sendResponse(false, 'invalid_refresh_token', 'Your session has expired. Please sign in again.', 'User not found.');
            exit();
        }

        // Extract user details and send the response        
        sendResponse(true, 'none', 'none', 'none', 200, [
            "userInfo" => [
                "userId" => $userId,
                "email" => $userInfo[0]['email'],
                "role" => $userInfo[0]['role'],
                "accessToken" => $newAccessToken
            ]
        ]);

        exit();
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {                        
        checkRefreshToken();
    } else if ($_SERVER['REQUEST_METHOD'] !== 'OPTIONS') {             
        sendResponse(false, 'invalid_request_method', 'An unexpected error occurred. Please try again.', 'Wrong method used, use POST.', 500);
    }
?>