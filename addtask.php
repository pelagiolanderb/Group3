<?php
// Include the connection file
require('connection.php');

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Escape the task name and task deadline inputs
    $taskName = mysqli_real_escape_string($conn, $_POST['task-name']);
    $taskDeadline = mysqli_real_escape_string($conn, $_POST['task-deadline']);

    // Prepare the SQL query
    $insert_query = $conn->prepare("insert into tbltask(taskName, taskDeadline, dateCreated, status) 
                                    values (?, ?, NOW(), 'Not Started')");

    // Bind the parameters to the query
    $insert_query->bind_param("ss", $taskName, $taskDeadline);

    // Execute the query
    $insert_query->execute();

    // Get the ID of the inserted row
    $inserted_id = $insert_query->insert_id;

    // Close the prepared statement
    $insert_query->close();

    // Fetch the inserted task from the database
    $select_query = $conn->prepare("SELECT * FROM tbltask WHERE taskId = ?");
    $select_query->bind_param("i", $inserted_id);
    $select_query->execute();
    $result = $select_query->get_result();
    $task = $result->fetch_assoc();

    // Close the database connection
    $conn->close();

    // Return the inserted task data as JSON
    echo json_encode($task);
}
?>