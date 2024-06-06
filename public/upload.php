<?php

//upload.php

header("Access-Control-Allow-Origin:* ");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$upload_directory = '../upload/';
$file_name_array = explode(".", $_FILES['file']['name']);
$file_name = time() . '.' . end($file_name_array);
$upload_file = $upload_directory . $file_name;
$image_link = basename(__DIR__).'/upload/' . $file_name;
if(!file_exists($upload_directory))
{
	mkdir($upload_directory, 0777, true);
}

if(move_uploaded_file($_FILES['file']['tmp_name'], $upload_file))
{
	echo json_encode([
		'message' => 'File uploaded successfully', 
		'image_link' => $image_link
	]);
}

?>