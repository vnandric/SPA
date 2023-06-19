<?php
  // Read the JSON file
  $file = 'data.json';
  $json_data = file_get_contents($file);

  // Convert JSON data to PHP array
  $data = json_decode($json_data, true); // Associative array

  // Retrieve form data
  $name = $_POST['name'];
  $email = $_POST['email'];

  // Add new entry to the data array
  $newEntry = array(
    'name' => $name,
    'email' => $email
  );

  // Append the new entry to the data array
  $data[] = $newEntry;

  // Convert the data array back to JSON
  $json = json_encode($data, JSON_PRETTY_PRINT);

  // Save the updated JSON data to the file
  if (file_put_contents($file, $json)) {
    echo 'Data saved successfully!';
  } else {
    echo 'Error occurred. Please try again later.';
  }
?>
