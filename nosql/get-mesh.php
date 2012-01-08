<?php

date_default_timezone_set("Europe/Paris");


$ip=$_SERVER['REMOTE_ADDR'];

$connection = new Mongo(); // connects to localhost:27017
$anakata = $connection->anakata;
$users = $anakata->users;

$info = array('ip' => $ip, 'request' => $_REQUEST, 'self' => $_SERVER['PHP_SELF'], 'date' => date('d.m.Y..H.i.s'));

$anakata->trace->insert($info);

$return = null;

if($_POST['username'] == null || $_POST['username'] == '') {
	$return = array("status" => 400);
} else {
	$sessions = $anakata->sessions;
	$session = $sessions->findOne(array( "username" => $_POST["username"]));
	if($session == null) {
		$return = array("status" => 404);
	} else if(time() - $session["date"] > 3600) {
		$return = array("status" => 426);
	} else if($session["key"] != $_POST["key"]) {
		$return = array("status" => 403);
	} else {
		try {
			$sessions->update(array("username" => $_POST["username"]),
					 array('$set' => array("date" => time())));
			$meshs = $anakata->meshs;
			$mesh = $meshs->findOne(array("meshname" => $_POST["meshname"]));
			$return = array("status" => 200, "mesh" => $mesh["mesh"]);
		} catch (MongoException $x) {
			$return = array("status" => 500, "message" => $x);
		}
	}
}
echo json_encode($return);
?>