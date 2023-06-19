$(document).ready(function () {
    $('#myForm').submit(function (e) {
        e.preventDefault(); // Prevent form submission

        // Get form data
        let formData = $(this).serialize();

        // Send data using AJAX
        $.ajax({
            type: 'POST',
            url: 'save_data.php', // PHP file to handle the data
            data: formData,
            success: function (response) {
                alert('Data saved successfully!');
                // Optionally, perform additional actions after data is saved
            },
            error: function () {
                alert('Error occurred. Please try again later.');
            }
        });
    });
});

$(document).ready(function () {
    // Function to retrieve and display JSON data
    function fetchData() {
        $.ajax({
            type: 'GET',
            url: 'data.json', // Path to your JSON file
            dataType: 'json',
            success: function (data) {
                // Clear previous data
                $('#dataContainer').empty();

                // Loop through the data and append to container
                $.each(data, function (index, entry) {
                    var name = entry.name;
                    var email = entry.email;
                    var updateButton = '<button class="updateBtn btn btn-primary" data-index="' + index + '">Update</button>';
                    var deleteButton = '<button class="deleteBtn btn btn-primary" data-index="' + index + '">Delete</button>';

                    // Append the data, update button, and delete button to the container
                    $('#dataContainer').append('<p>Name: ' + name + '</p>');
                    $('#dataContainer').append('<p>Email: ' + email + '</p>');
                    $('#dataContainer').append(updateButton);
                    $('#dataContainer').append(deleteButton);
                    $('#dataContainer').append('<hr>');
                });

                // Attach click event handlers to update and delete buttons
                $('.updateBtn').click(function () {
                    var index = $(this).data('index');
                    showUpdateForm(index);
                });

                $('.deleteBtn').click(function () {
                    var index = $(this).data('index');
                    deleteData(index);
                });
            },
            error: function () {
                alert('Error occurred. Please try again later.');
            }
        });
    }

    // Call the fetchData function initially
    fetchData();

    // Function to show update form
    function showUpdateForm(index) {
        // Retrieve data for the selected index
        $.ajax({
            type: 'GET',
            url: 'data.json', // Path to your JSON file
            dataType: 'json',
            success: function (data) {
                var entry = data[index];
                var name = entry.name;
                var email = entry.email;

                // Create the update form
                var updateForm = '<form id="updateForm">';
                updateForm += '<input type="text" name="name" value="' + name + '">';
                updateForm += '<input type="email" name="email" value="' + email + '">';
                updateForm += '<button type="submit">Update</button>';
                updateForm += '</form>';

                // Replace the data with the update form
                $('#dataContainer').html(updateForm);

                // Attach submit event handler to the update form
                $('#updateForm').submit(function (e) {
                    e.preventDefault(); // Prevent form submission

                    // Get updated form data
                    const data = $('#updateForm').serializeArray();
                    // Perform the update
                    updateData(index, data[0].value, data[1].value);
                });
            },
            error: function () {
                alert('Error occurred. Please try again later.');
            }
        });
    }

    // Function to update data
    function updateData(index, name, email) {
        // Retrieve the JSON data
        $.getJSON('data.json', function (data) {
            // Update the specific data entry
            data[index].name = name;
            data[index].email = email;

            // Send the updated JSON data
            $.ajax({
                type: 'POST',
                url: 'update_data.php', // PHP script to handle the update
                data: { updatedData: JSON.stringify(data) },
                success: function (response) {
                    alert('Data updated successfully!');

                    // Fetch data again to update the displayed content
                    fetchData();
                },
                error: function () {
                    alert('Error occurred while updating data.');
                }
            });
        });
    }

    // Function to delete data
    function deleteData(index) {
        $.ajax({
            type: 'POST',
            url: 'delete_data.php', // PHP script to handle the deletion
            data: {
                index: index
            },
            success: function (response) {
                alert('Data deleted successfully!');
                // Optionally, perform additional actions after deletion
                // Fetch data again to update the displayed content
                fetchData();
            },
            error: function () {
                alert('Error occurred while deleting data.');
            }
        });
    }
});
