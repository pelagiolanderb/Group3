<?php
// Connect to your database
require('connection.php');

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if task ID is provided
if(isset($_POST['taskId'])) {
    // Escape user inputs for security
    $taskId = $conn->real_escape_string($_POST['taskId']);
    
    // SQL to delete a task
    $sql = "DELETE FROM tbltask WHERE taskId = $taskId";

    if ($conn->query($sql) === TRUE) {
        // Deletion successful
        echo "Task deleted successfully!";
    } else {
        // Error handling
        echo "Error deleting task: " . $conn->error;
    }
} else {
    // If task ID is not provided
    echo "Task ID is missing!";
}

// Close database connection
$conn->close();
?>