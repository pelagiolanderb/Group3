<?php
    // connection details
    $servername = "localhost";
    $dbuser = "root";
    $dbpass = "";
    $dbname = "db_taskmanagement";

    // Create connection
    $conn = new mysqli($servername, $dbuser, $dbpass, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    ?>