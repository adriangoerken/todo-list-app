<?php
include_once 'db.php'; // Include your database connection file
include_once 'auth.php'; // Include your authentication file

// Ensure the user is authenticated
$user = authenticate_user();
if (!$user) {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'Unauthorized']);
    exit;
}

// Get the JSON payload
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['task']) || trim($data['task']) === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid payload']);
    exit;
}

$db = DB::getInstance();

// Start a transaction to ensure data integrity
$db->query('START TRANSACTION');

try {
    // Fetch the highest task_order for the user
    $highestOrder = $db->query('SELECT MAX(task_order) as max_order FROM tasks WHERE user_id = :user_id', [':user_id' => $user['id']]);
    
    // Calculate the new task_order
    $newTaskOrder = $highestOrder[0]['max_order'] + 1;

    // Insert the new task
    $insertTaskQuery = 'INSERT INTO tasks (user_id, task, task_order, is_done, created_at) VALUES (:user_id, :task, :task_order, 0, NOW())';
    $params = [
        ':user_id' => $user['id'],
        ':task' => trim($data['task']),
        ':task_order' => $newTaskOrder
    ];
    $result = $db->query($insertTaskQuery, $params);

    if ($result) {
        $db->query('COMMIT');
        echo json_encode(['success' => true, 'data' => ['task_id' => $db->lastInsertId()]]);
    } else {
        throw new Exception('Failed to add new task');
    }
} catch (Exception $e) {
    // Rollback the transaction in case of an error
    $db->query('ROLLBACK');
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
