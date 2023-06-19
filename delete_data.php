<?php
  // Read the JSON file
  $file = 'data.json';
  $json_data = file_get_contents($file);

  // Convert JSON data to PHP array
  $data = json_decode($json_data, true);

  // Retrieve the index from the AJAX request
  $index = $_POST['index'];

  // Remove the data at the specified index
  array_splice($data, $index, 1);

  // Convert the data array back to JSON
  $json = json_encode($data, JSON_PRETTY_PRINT);

  // Save the updated JSON data to the file
  if (file_put_contents($file, $json)) {
    echo 'Data deleted successfully!';
  } else {
    echo 'Error occurred while deleting data.';
  }
?>