<?php
// Simple cookie test
setcookie(
    'testCookie', 
    'testValue', 
    [
      'expires' => time() + (90 * 24 * 60 * 60),
      'path' => '/',
      'domain' => '',
      'secure' => false, 
      'httponly' => true, 
      'samesite' => 'Lax' 
    ]
  );
  
  // Check the cookie
  if (isset($_COOKIE['testCookie'])) {
    echo 'Cookie is set!';
  } else {
    echo 'Cookie is not set.';
  }
  
?>