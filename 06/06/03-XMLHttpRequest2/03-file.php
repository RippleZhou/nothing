<?php
	
	$file=$_FILES['upload'];

	 // var_dump($_FILES);	
	// 临时文件名
	// echo $file['tmp_name'];


	move_uploaded_file($file['tmp_name'], './test.png');


	echo './test.png';
?>