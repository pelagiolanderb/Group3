$(document).ready(function () {
    // Add a click event listener to the add task button
    $("#add-button").click(function () {
        // Display the add task modal when the button is clicked
        $("#add-modal").css("display", "block");
    });

    // Add a click event listener to the close button
    $(".close").click(function () {
        // Hide the modal when the close button is clicked
        $(".modal").css("display", "none");
    });

    // Define the form submit function
    $("#add").submit(function (event) {
        // Prevent the form from submitting normally
        event.preventDefault();

        // Send a POST request to the server to add a new task
        $.ajax({
            type: "POST",
            url: "addtask.php",
            data: $(this).serialize(), // Get the form data
            success: function (response) {
                // Display an alert message and hide the modal when the task is successfully added
                alert("Successfully Added a task!");
                $(".modal").css("display", "none");
                // Call the displayTasks() function to update the task list
                displayTasks();
            },
        });

        // Reset the form
        $(this)[0].reset();
    });

    // Function to fetch tasks from the server and populate the table
    function displayTasks() {
        // Send an AJAX request to fetch tasks
        $.ajax({
            url: 'displaytask.php',
            type: 'GET',
            success: function(response) {
                // Parse the JSON response
                var tasks = JSON.parse(response);
                var tableBody = $('.task-display');
                
                // Clear existing table rows
                tableBody.empty();
                
                // Iterate through tasks and populate the table
                tasks.forEach(function(task) {
                    var currentDate = new Date().toISOString().slice(0, 10); // Get the current date
                    var row = '<tr>' +
                                '<td>' + currentDate + '</td>' + // Display the current date
                                '<td>' + task.taskName + '</td>' +
                                '<td>' + task.taskDeadline + '</td>' +
                                '<td>' + task.status + '</td>' +
                                '<td><button class="edit-button" data-task-id="' + task.id + '">Edit</button> ' +
                                '<button class="delete-button" data-task-id="' + task.id + '">Delete</button></td>' +
                            '</tr>';
                    tableBody.append(row);
                });
            }
        });
    }

    // Call the displayTasks function when the document is ready
    displayTasks();
});