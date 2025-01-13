<?php
    require_once '../_helpers.php';
    require_once '../_auth_helpers.php'; 

    resetTokenCookie();
    sendResponse(true, 'none', 'none', 'none', 200, ['accessToken' => $accessToken]);                   
?>