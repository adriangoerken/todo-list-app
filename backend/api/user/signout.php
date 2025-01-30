<?php
    require_once '../_helpers.php';
    require_once '../_auth_helpers.php'; 

    use \Firebase\JWT\JWT;     
    use \Firebase\JWT\Key;    

    function signOut() {        
        // Retrieve the refresh token from the cookie
        $refreshToken = retrieveRefreshToken();

        if ($refreshToken) {

            // Remove the refresh token from the database
            handleDatabaseQuery("DELETE FROM taskdoneify_refresh_tokens WHERE token = :token", [':token' => $refreshToken]);

            // Clear the refresh token cookie
            resetTokenCookie();

            // Respond to the client
            sendResponse(true, 'none', 'none', 'none');
        } else {
            sendResponse(false, 'invalid_refresh_token', getLocalizedString('signout.invalid_refresh_token'), 'The user tried to sign out, but no refresh token was found in the cookies.', 400);
        }        
    }

    // Handle the POST request for signing out
    if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        signOut();
    } else if ($_SERVER['REQUEST_METHOD'] !== 'OPTIONS') {
        sendResponse(false, 'invalid_request_method', getLocalizedString('GLOBAL.invalid_request_method'), 'The data was sent using the wrong method, use DELETE.', 500);
    }

?>