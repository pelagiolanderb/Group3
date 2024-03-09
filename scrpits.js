// Run this code when the document is ready
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
  });
  
  // Define the form submit function
  function formSubmit() {
    // Send a POST request to the server to add a new task
    $.ajax({
      type: "POST",
      url: "addtask.php",
      data: $("#add").serialize(), // Get the form data
      success: function (response) {
        // Display an alert message and hide the modal when the task is successfully added
        alert("Successfully Added a task!"),
          $(".modal").css("display", "none"),
          displayTasks();
      },
    });
  
    // Reset the form
    var form = document.getElementById("add").reset();
  
    // Prevent the form from submitting
    return false;
  }