<?php
// Include the connection file
require('connection.php');

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Escape the task ID, task name, and task deadline inputs
    $taskId = mysqli_real_escape_string($conn, $_POST['task-id']);
    $taskName = mysqli_real_escape_string($conn, $_POST['edit-task-name']);
    $taskDeadline = mysqli_real_escape_string($conn, $_POST['edit-task-deadline']);

    // Prepare the SQL query to update the task
    $update_query = "UPDATE tbltask SET taskName = '$taskName', taskDeadline = '$taskDeadline' WHERE taskId = '$taskId'";

    // Execute the query
    if (mysqli_query($conn, $update_query)) {
        // Task updated successfully
        echo "Task updated successfully";
    } else {
        // Error updating task
        echo "Error updating task: " . mysqli_error($conn);
    }
    
    // Close the database connection
    mysqli_close($conn);
}
?>