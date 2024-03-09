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

    // Delegate form submission event to a static parent element
    $(document).on('submit', '#add', function (event) {
        // Prevent the form from submitting normally
        event.preventDefault();

        // Get the form data
        var taskName = $("#task-name").val();
        var taskDeadline = $("#task-deadline").val();

        // Send a POST request to the server to add a new task
        $.ajax({
            type: "POST",
            url: "addtask.php",
            data: {
                'task-name': taskName,
                'task-deadline': taskDeadline
            },
            success: function (response) {
                // Parse the JSON response
                var task = JSON.parse(response);

                // Create a new row for the task
                var row = '<tr>' +
                    '<td>' + task.dateCreated + '</td>' +
                    '<td>' + task.taskName + '</td>' +
                    '<td>' + task.taskDeadline + '</td>' +
                    '<td>' + task.status + '</td>' +
                    '<td><button class="edit-button" data-task-id="' + task.id + '">Edit</button>' +
                    '<button class="delete-button" data-task-id="' + task.id + '">Delete</button></td>' +
                    '</tr>';

                // Append the new row to the table
                $(".task-display").append(row);

                // Display an alert message and hide the modal
                alert("Successfully Added a task!");
                $(".modal").css("display", "none");

                // Reset the form
                $("#add")[0].reset();
            }
        });
    });

    // Call the displayTasks function when the document is ready
    displayTasks();
});
