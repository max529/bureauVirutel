<?php
	class Wallpaper{
		public function __construct(){
			
		}
		public function addWp($wp){
			move_uploaded_file($wp['tmp_name'],'../media/wallpaper/'.$wp['name']);
			return $this->getAllWp();
		}
		public function getAllWp(){
			$all = glob("../media/wallpaper/*.*");
			$res = array();
			foreach ($all as $img) {
				$res[count($res)] = str_replace("..", "", $img);
			}
			return json_encode($res);
		}
	}
?>