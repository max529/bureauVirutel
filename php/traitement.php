<?php
	require("loader.php");

	if(isset($_POST['getAllWp'])&&$_POST['getAllWp']=="getAllWp"){
		$conn = Load::load('Wallpaper');
		echo $conn->getAllWp();
	}else if(isset($_FILES['addImg'])){
		$conn = Load::load('Wallpaper');
		echo $conn->addWp($_FILES['addImg']);
	}


	else if(isset($_POST['getAllDoc'])&&$_POST['getAllDoc']=="getAllDoc"){
		$conn = Load::load('Document');
		echo $conn->getAllDocs();
	}else if(isset($_FILES['addDoc'])){
		$conn = Load::load('Document');
		echo $conn->addDoc($_FILES['addDoc']);
	}

	else if(isset($_POST['getParam'])&&$_POST['getParam']=="getParam"){
		$conn = Load::load('Bureau');
		echo $conn->getState();
	}else if(isset($_POST['saveParam'])&&$_POST['saveParam']!=""){
		$conn = Load::load('Bureau');
		echo $conn->saveState($_POST['saveParam']);
	}
?>