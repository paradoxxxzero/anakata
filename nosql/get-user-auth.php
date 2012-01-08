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
	$user = $users->findOne(array("username" => $_POST['username']));
	if($user != null) {
		if($_POST['passwd'] == $user["passwd"]) {
			try {
				$authKey = md5(md5(microtime()));
				$sessions = $anakata->sessions;
				$sessions->update(array("username" => $user["username"]),
						 array('$set' => array("username" => $user["username"], "key" => $authKey, "date" => time())),
						 array("upsert" => true));
				$return = array("status" => 200, "key" => $authKey);
			} catch (MongoException $x) {
				$return = array("status" => 500, "message" => $x);
			}
		} else {
			$return = array("status" => 403);
		}
	} else {
		$return = array("status" => 404);
	}
}
echo json_encode($return);
?>