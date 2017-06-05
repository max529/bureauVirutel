<?php
	class Bureau{
		public function __construct(){
			
		}
		public function saveState($wp){
			file_put_contents("../save.txt", $wp);
		}
		public function getState(){
			return file_get_contents("../save.txt");
		}
	}
?>