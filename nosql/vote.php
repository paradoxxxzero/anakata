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

$xhrKey = $_POST['key'];
$xhrUserName = $_POST['username'];
$xhrMeshName = $_POST['meshname'];
$xhrVote = $_POST['up'];

if($xhrUserName == null || $xhrUserName == '') {
	$return = array('status' => 400);
} else {
	$sessions = $anakata->sessions;
	$session = $sessions->findOne(array( 'username' => $xhrUserName));
	if($session == null) {
		$return = array('status' => 404);
	} else if(time() - $session['date'] > 3600) {
		$return = array('status' => 426);
	} else if($session['key'] != $xhrKey) {
		$return = array('status' => 403);
	} else {
		try {
			$sessions->update(array('username' => $xhrUserName),
					  array('$set' => array('date' => time())));
			$meshs = $anakata->meshs;
			$meshPresent = $meshs->findOne(array('meshname' => $xhrMeshName));
			if($meshPresent == null) {
				$return = array('status' => 409, 'originalUserName' => $meshPresent['username']);
			} else {
				$votes->update(array('username' => $xhrUserName, 'meshname' => $xhrMeshName),
					       array('$set' => array('username' => $xhrUserName, 'meshname' => $xhrMeshName, 'up' => $xhrVote)),
					       array('upsert' => true));
				$upvotes = $votes->count(array('meshname' => $xhrMeshName, 'up' => "true"));
				$downvotes = $votes->count(array('meshname' => $xhrMeshName, 'up' => "false"));
				$score = $upvotes - $downvotes;
				$meshs->update(array('meshname' => $xhrMeshName),
					       array('$set' => array('score' => $score)));
				$return = array('status' => 200, 'score' => $score);
			}
		} catch (MongoException $x) {
			$return = array('status' => 500, 'message' => $x);
		}
	}
}
echo json_encode($return);
?>