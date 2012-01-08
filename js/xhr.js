function anakata_create (e) {
    anakata_setWIP();
    new Ajax.Request('/nosql/create-user.php', {
	method:'post',
	parameters: {
	    username: $('login').value, 
	    passwd: MD5(SHA1(MD5($('passwd').value)))
	},
	onSuccess: function(transport){
	    anakata_rmWIP();
	    var response = JSON.parse(transport.responseText);
	    switch (response.status) {
	    case 200 :
		anakata_info("User " + $('login').value + " has been succesfully created. You can now login.", 1);
		break;
	    case 400:
		anakata_info("400 - You must provide a login and a password", 0);
		break;
	    case 409:
		anakata_info("409 - User " + $('login').value + " already exist. Try another.", 0);
		break;
	    case 500:
		anakata_info("500 - Sever is slowly dying right now, sorry try again later (and donate :) )", 0);
		break;
	    }
	},
	onFailure: function(){ 
	    anakata_rmWIP();
	    anakata_info('Request failed, please report : ' + transport.responseText, 0);
	}
    });
}

function anakata_loginAttempt (e) {
    anakata_setWIP();
    new Ajax.Request('/nosql/get-user-auth.php', {
	method:'post',
	parameters: {
	    username: $('login').value, 
	    passwd: MD5(SHA1(MD5($('passwd').value)))
	},
	onSuccess: function(transport) {
	    anakata_rmWIP();
	    var response = JSON.parse(transport.responseText);
	    switch (response.status) {
	    case 200 :
		var login = $('login').value;
		anakata_info("Welcome  " + login + "!" , 1);
		$('elogin').innerHTML = 'Logout (' + login + ')';
		sessionStorage.setItem('login', login);
		sessionStorage.setItem('key', response.key);
		anakata_unloadDiv('loginBox');
		break;
	    case 403:
		anakata_info("403 - Bad password try again  " , 0);
		break;
	    case 404:
		anakata_info("404 - User " + $('login').value + " not found", 0);
		break;
	    case 500:
		anakata_info("500 - Sever is slowly dying right now, sorry try again later (and donate :) )", 0);
		break;
	    }
	},
	onFailure: function(transport) {
	    anakata_rmWIP();
	    anakata_info('Request failed, please report : ' + transport.responseText, 0);
	}
    });
}
function anakata_loginOnSession() {
    var login = sessionStorage.getItem('login');
    var key   = sessionStorage.getItem('key');
    if(login && key) {
	anakata_info("Welcome  " + login + "!" , 1);
	$('elogin').innerHTML = 'Logout (' + login + ')';
    }
}
function anakata_logout (notify) {
    var login = sessionStorage.getItem('login');
    sessionStorage.clear();
    if(notify) anakata_info("User " + login + " is now logged out", 1);
    $('elogin').innerHTML = 'Login';
}
function anakata_chpasswd (e) {
    anakata_setWIP();
    new Ajax.Request('/nosql/change-password.php', {
	method:'post',
	parameters: {
	    username: sessionStorage.getItem('login'),
	    key: sessionStorage.getItem('key'), 
	    oldpasswd: MD5(SHA1(MD5($('oldpasswd').value))),
	    newpasswd: MD5(SHA1(MD5($('newpasswd').value)))
	},
	onSuccess: function(transport) {
	    anakata_rmWIP();
	    var response = JSON.parse(transport.responseText);
	    switch (response.status) {
	    case 200 :
		anakata_info("Password has been succesfully updated", 1);
		anakata_unloadDiv('chpasswdBox');
		break;
	    case 403:
		anakata_info("403 - Bad password try again  " , 0);
		break;
	    case 404:
		anakata_info("404 - User " + $('login').value + " not found", 0);
		break;
	    case 426:
		anakata_info("426 - Session has expired ! Try logging again", 0);
		anakata_logout(false);
		break;
	    case 500:
		anakata_info("500 - Sever is slowly dying right now, sorry try again later (and donate :) )", 0);
		break;
	    }
	},
	onFailure: function(transport) {
	    anakata_rmWIP();
	    anakata_info('Request failed, please report : ' + transport.responseText, 0);
	}
    });
}
function anakata_vote (mesh, up, meshIndex) {
    anakata_setWIP();
    new Ajax.Request('/nosql/vote.php', {
	method:'post',
	parameters: {
	    username: sessionStorage.getItem('login'),
	    key: sessionStorage.getItem('key'), 
	    meshname: mesh,
	    up: up	    
	},
	onSuccess: function(transport) {
	    anakata_rmWIP();
	    var response = JSON.parse(transport.responseText);
	    switch (response.status) {
	    case 200 :
//		anakata_info((up ? "Up" : "Down") + "vote acknowledged for " + mesh, 1);
		anakata_updateVote(meshIndex, up, response.score);
		break;
	    case 403:
		anakata_info("403 - Bad password try again  " , 0);
		break;
	    case 404:
		anakata_info("404 - User " + $('login').value + " not found", 0);
		break;
	    case 426:
		anakata_info("426 - Session has expired ! Try logging again", 0);
		anakata_logout(false);
		break;
	    case 500:
		anakata_info("500 - Sever is slowly dying right now, sorry try again later (and donate :) )", 0);
		break;
	    }
	},
	onFailure: function(transport) {
	    anakata_rmWIP();
	    anakata_info('Request failed, please report : ' + transport.responseText, 0);
	}
    });
}

function anakata_publish () {
    anakata_setWIP();
    new Ajax.Request('/nosql/set-mesh.php', {
	method:'post',
	parameters: {
	    username: sessionStorage.getItem('login'),
	    key: sessionStorage.getItem('key'), 
	    meshname: anakata_o.name,
	    mesh: JSON.stringify(anakata_o)
	},
	onSuccess: function(transport){
	    anakata_rmWIP();
	    var response = JSON.parse(transport.responseText);
	    switch (response.status) {
	    case 200 :
		anakata_info("Mesh " + anakata_o.name + " has been succesfully uploaded.", 1);
		break;
	    case 400:
		anakata_info("400 - You are not logged in. Please do so.", 0);
		break;
	    case 403:
		anakata_info("403 - Unauthorized. Try logging again." , 0);
		anakata_logout(false);
		break;
	    case 404:
		anakata_info("404 - Session not found ! Try logging again", 0);
		anakata_logout(false);
		break;
	    case 409:
		anakata_info("409 - The mesh name " + anakata_o.name + " is already taken by user " + response.originalUserName + ". Please chose an other name.", 0);
		break;
	    case 426:
		anakata_info("426 - Session has expired ! Try logging again", 0);
		anakata_logout(false);
		break;
 	    case 500:
		anakata_info("500 - Sever is slowly dying right now, sorry try again later (and donate :) )", 0);
		break;			     
	    }
	},
	onFailure: function(){ 
	    anakata_rmWIP();
	    anakata_info('Request failed, please report : ' + transport.responseText, 0);
	}
    });
}
function anakata_loadMeshList () {
    anakata_setWIP();
    new Ajax.Request('/nosql/get-meshes.php', {
	method:'post',
	parameters: {
	    username: sessionStorage.getItem('login'),
	    key: sessionStorage.getItem('key')
	},
	onSuccess: function(transport){
	    anakata_rmWIP();
	    var response = JSON.parse(transport.responseText);
	    switch (response.status) {
	    case 200 :
		anakata_makeLoadOnlineDiv(response.meshes);
		anakata_loadDiv('loadOnlineBox');
		break;
	    case 400:
		anakata_info("400 - You are not logged in. Please do so.", 0);
		break;
	    case 403:
		anakata_info("403 - Unauthorized. Try logging again." , 0);
		anakata_logout(false);
		break;
	    case 404:
		anakata_info("404 - Session not found ! Try logging again", 0);
		anakata_logout(false);
		break;
	    case 426:
		anakata_info("426 - Session has expired ! Try logging again", 0);
		anakata_logout(false);
		break;
	    case 500:
		anakata_info("500 - Sever is slowly dying right now, sorry try again later (and donate :) )", 0);
		break;			     
	    }
	},
	onFailure: function(){ 
	    anakata_rmWIP();
	    anakata_info('Request failed, please report : ' + transport.responseText, 0);
	}
    });
}
function anakata_loadMesh (meshname) {
    anakata_setWIP();
    new Ajax.Request('/nosql/get-mesh.php', {
	method:'post',
	parameters: {
	    username: sessionStorage.getItem('login'),		  
	    key: sessionStorage.getItem('key'),
	    meshname: meshname
	},
	onSuccess: function(transport){
	    anakata_rmWIP();
	    var response = JSON.parse(transport.responseText);
	    switch (response.status) {
	    case 200 :
		anakata_loadUnsavedMesh(response.mesh);
		break;
	    case 400:
		anakata_info("400 - You are not logged in. Please do so.", 0);
		break;
	    case 403:
		anakata_info("403 - Unauthorized. Try logging again." , 0);
		anakata_logout(false);
		break;
	    case 404:
		anakata_info("404 - Session not found ! Try logging again", 0);
		anakata_logout(false);
		break;
	    case 426:
		anakata_info("426 - Session has expired ! Try logging again", 0);
		anakata_logout(false);
		break;
	    case 500:
		anakata_info("500 - Sever is slowly dying right now, sorry try again later (and donate :) )", 0);
		break;			     
	    }
	},
	onFailure: function(){ 
	    anakata_rmWIP();
	    anakata_info('Request failed, please report : ' + transport.responseText, 0);
	}
    });
}
function anakata_deleteMesh (meshname) {
    anakata_setWIP();
    new Ajax.Request('/nosql/rm-mesh.php', {
	method:'post',
	parameters: {
	    username: sessionStorage.getItem('login'),		  
	    key: sessionStorage.getItem('key'),
	    meshname: meshname
	},
	onSuccess: function(transport){
	    anakata_rmWIP();
	    var response = JSON.parse(transport.responseText);
	    switch (response.status) {
	    case 200 :
		anakata_info("Mesh " + meshname + " has been succesfully deleted", 1);
		anakata_unloadDiv('loadOnlineBox');		
		break;
	    case 400:
		anakata_info("400 - You are not logged in. Please do so.", 0);
		break;
	    case 403:
		anakata_info("403 - Unauthorized. Try logging again." , 0);
		anakata_logout(false);
		break;
	    case 404:
		anakata_info("404 - Session not found ! Try logging again", 0);
		anakata_logout(false);
		break;
	    case 409:
		anakata_info("409 - The mesh " + anakata_o.name + " belongs to user " + response.originalUserName + "!!", 0);
		break;
	    case 426:
		anakata_info("426 - Session has expired ! Try logging again", 0);
		anakata_logout(false);
		break;
	    case 500:
		anakata_info("500 - Sever is slowly dying right now, sorry try again later (and donate :) )", 0);
		break;			     
	    }
	},
	onFailure: function(){ 
	    anakata_rmWIP();
	    anakata_info('Request failed, please report : ' + transport.responseText, 0);
	}
    });
}

function anakata_setWIP() {
    $('animLoad').style.opacity = 1;
    anakata_xhrDone = false;
    glowUp();
}

function glowUp() {
    for(var n = 1 ; n < 11 ; n++) {
	$('al' + n).morph('top: 5px;', {duration: 0.5, delay: (n/10), transition: 'bouncePast'});
    }
    setTimeout(glowDown, 1500);
}
function glowDown() {
    for(var n = 1 ; n < 11 ; n++) {
	$('al' + n).morph('top: 30px;', {duration: 0.5, delay: (n/10)});
    }
    if(!anakata_xhrDone) {
	setTimeout(glowUp, 1500);
    }
}

function anakata_rmWIP() {
    anakata_xhrDone = true;
}