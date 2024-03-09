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
                var row = '<tr>' +
                            '<td>' + task.date + '</td>' +
                            '<td>' + task.taskName + '</td>' +
                            '<td>' + task.taskDeadline + '</td>' +
                            '<td>' + task.status + '</td>' +
                            '<td><button class="edit-button" data-task-id="' + task.id + '">Edit</button>' +
                            '<button class="delete-button" data-task-id="' + task.id + '">Delete</button></td>' +
                        '</tr>';
                tableBody.append(row);
            });

            // Add event listener for edit button
            $(".edit-button").click(function () {
                var taskId = $(this).data("task-id");
                // Populate the edit modal with task details
                $("#edit-task-id").val(taskId);
                var taskName = $(this).closest("tr").find("td:nth-child(2)").text();
                $("#edit-task-name").val(taskName);
                var taskDeadline = $(this).closest("tr").find("td:nth-child(3)").text();
                $("#edit-task-deadline").val(taskDeadline);
                // Display the edit modal
                $("#edit-modal").css("display", "block");
            });

            // Add event listener for delete button
            $(".delete-button").click(function () {
                // Handle delete functionality here
                // You might want to confirm deletion with a modal or directly delete the task
            });
        }
    });
}