<?php

date_default_timezone_set("Europe/Paris");


$ip=$_SERVER['REMOTE_ADDR'];

$connection = new Mongo(); // connects to localhost:27017
$anakata = $connection->anakata;
$users = $anakata->users;

$info = array('ip' => $ip, 'request' => $_REQUEST, 'self' => $_SERVER['PHP_SELF'], 'date' => date('d.m.Y..H.i.s'));

$anakata->trace->insert($info);
$user = array( "username" => $_POST['username'], 
	       "passwd" => $_POST['passwd']);

$return = null;

if($user["username"] == null || $user["username"] == '') {
	$return = array("status" => 400);
} else {
	if($users->findOne(array ("username" => $_POST['username'])) != null) {
		$return = array("status" => 409);
	} else {
		try {
			$users->insert($user);
			mail('anakata.tk@gmail.com', 'New User !', $_POST["username"]);
			$return = array("status" => 200);
		} catch (MongoCursorException $e) {
			$return = array("status" => 500, "message" => $e );
		}
	}
}
	echo json_encode($return);
?>