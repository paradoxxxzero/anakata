<?php

date_default_timezone_set("Europe/Paris");


$ip=$_SERVER['REMOTE_ADDR'];

$connection = new Mongo(); // connects to localhost:27017
$anakata = $connection->anakata;
$users = $anakata->users;
$votes = $anakata->votes;

$info = array('ip' => $ip, 'request' => $_REQUEST, 'self' => $_SERVER['PHP_SELF'], 'date' => date('d.m.Y..H.i.s'));

$anakata->trace->insert($info);

$return = null;

$xhrUserName = $_POST['username'];

if($xhrUserName == null || $xhrUserName == '') {
	$return = array("status" => 400);
} else {
	$sessions = $anakata->sessions;
	$session = $sessions->findOne(array( "username" => $xhrUserName));
	if($session == null) {
		$return = array("status" => 404);
	} else if(time() - $session["date"] > 3600) {
		$return = array("status" => 426);
	} else if($session["key"] != $_POST["key"]) {
		$return = array("status" => 403);
	} else {
		try {
			$sessions->update(array("username" => $xhrUserName),
					 array('$set' => array("date" => time())));
			$meshs = $anakata->meshs;
			$meshCursor = $meshs->find(array(), array("username" => true, "meshname" => true, "score" => true, "mesh.description" => true))->sort(array("score" => -1));
			$meshList = array();
			foreach ($meshCursor as $mesh) {
				unset($mesh['_id']);
				$vote = $votes->findOne(array("username" => $xhrUserName, "meshname" => $mesh["meshname"]), array("up" => true));
				$mesh["vote"] = $vote != null ? $vote["up"] : "";
				$meshList[] = $mesh;
			}
			$return = array("status" => 200, "meshes" => $meshList);
		} catch (MongoException $x) {
			$return = array("status" => 500, "message" => $x);
		}
	}
}
echo json_encode($return);
?>