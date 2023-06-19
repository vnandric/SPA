<?php
// Retrieve the updated JSON data
$updatedData = $_POST['updatedData'];

// Save the updated JSON data to the file
if (file_put_contents('data.json', stripslashes($updatedData))) {
  echo 'Data updated successfully!';
} else {
  echo 'Error occurred while updating data.';
}
?>