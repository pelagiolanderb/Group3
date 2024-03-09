<?php
// Include the connection file
require('connection.php');

// Fetch tasks from the database
$query = "SELECT * FROM tbltask";
$result = mysqli_query($conn, $query);

// Prepare an array to store tasks
$tasks = array();

// Fetch tasks row by row
while ($row = mysqli_fetch_assoc($result)) {
    // Push each task into the tasks array
    $tasks[] = $row;
}

// Close the database connection
mysqli_close($conn);

// Encode tasks array into JSON format and send it as response
echo json_encode($tasks);
?>