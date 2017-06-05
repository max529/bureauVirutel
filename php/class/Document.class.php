<?php
	class Document{
		public function __construct(){
			
		}
		public function addDoc($wp){
			move_uploaded_file($wp['tmp_name'],'../media/documents/'.$wp['name']);
			return $this->getAllDocs();
		}
		public function getAllDocs(){
			$all = glob("../media/documents/*.*");
			$res = array();
			foreach ($all as $img) {
				$res[count($res)] = str_replace("..", "", $img);
			}
			return json_encode($res);
		}
	}
?>