<?php
    require_once '../_helpers.php';
    require_once '../_auth_helpers.php'; 

    use \Firebase\JWT\JWT;     
    use \Firebase\JWT\Key;    

    function signOut() {
        try {
            // Retrieve the refresh token from the cookie
            $refreshToken = retrieveRefreshToken();

            if ($refreshToken) {
                $db = DB::getInstance();

                // Remove the refresh token from the database
                $db->query("DELETE FROM refresh_tokens WHERE token = :token", [':token' => $refreshToken]);

                // Clear the refresh token cookie
                resetTokenCookie();

                // Respond to the client
                sendResponse(true, 'none', 'none', 'none');
            } else {
                sendResponse(false, 'invalid_refresh_token', 'No refresh token found.', 'The user tried to sign out, but no refresh token was found in the cookies.', 400);
            }
        } catch (PDOException $e) {
            error_log($e->getMessage());
            sendResponse(false, "pdo_exception", "A server error occurred while processing your request. Please try again.", $e->getMessage(), 500);
        } catch (Exception $e) {
            error_log($e->getMessage());
            sendResponse(false, "unknown_exception", "An unexpected error occurred. Please try again.", $e->getMessage(), 500);
        }
    }

    // Handle the POST request for signing out
    if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        signOut();
    } else if ($_SERVER['REQUEST_METHOD'] !== 'OPTIONS') {
        sendResponse(false, 'invalid_request_method', 'An unexpected error occurred. Please try again.', 'The data was sent using the wrong method, use DELETE.', 500);
    }

?>