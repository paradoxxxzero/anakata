
function anakata_makeLoadDiv() {
    var innerLoad = '<div id="loadBox"><div id="meshList">';
    
    if(localStorage.length == 0) {
	innerLoad += '<div class="mesh"><div class="meshName">';
	innerLoad += "There's nothing to load ! <br /> <br /> <span style='padding-left: 2em;'> Save something first ! </span><br /> ";
	innerLoad += '</div>';
	innerLoad += '</div>'; 
    } else for(var i = 0 ; i < localStorage.length ; i++) {
	var stored = new anakata_Settings(localStorage.getItem(localStorage.key(i)), false);
	innerLoad += '<div id="mesh' + i + '" class="mesh"><div class="meshNameDescription"><div id="name' + i + '"class="meshName">';
	innerLoad += stored.name;
	innerLoad += '</div><div class="meshDescription">' + stored.description;
	innerLoad += '</div></div><div id="del' + i + '" class="meshDel" >x</div>';
	innerLoad += '</div>'; 
    }
    innerLoad += '</div></div>';
    $('loadDiv').innerHTML = innerLoad;
    $('meshList').addEventListener('click', function (e) { e.stopPropagation(); }, false);

    for(var i = 0 ; i < localStorage.length ; i++) {
	$('name' + i).index = i;
	$('name' + i).addEventListener('click', function (e) {
	    anakata_load(this.index);
	    anakata_unloadDiv('loadBox');
	}, false);
	$('del' + i).index = i;
	$('del' + i).addEventListener('click', function (e) { 
	    anakata_del(this.index);
	}, false);
    }
}
function anakata_makeLoadOnlineDiv(meshs) {
    var innerLoad = '<div id="loadOnlineBox"><div id="onlineMeshList">';
    
    if(meshs.length == 0) {
	innerLoad += '<div class="mesh"><div class="meshName">';
	innerLoad += "There's nothing online ?! Strange...";
	innerLoad += '</div>';
	innerLoad += '</div>'; 
    } else for(var i = 0 ; i < meshs.length ; i++) {
	innerLoad += '<div id="omesh' + i + '" class="mesh">';
	innerLoad += '<div id="scoring">';
	innerLoad += '<div id="up' + i + '" class="meshUp" >∧</div>';
	innerLoad += '<div id="score' + i + '" class="meshScore">'+ meshs[i]["score"]+'</div>';
	innerLoad += '<div id="down' + i + '" class="meshDown" >∨</div>';
	innerLoad += '</div>';
	innerLoad += '<div class="meshNameDescription"><div id="oname' + i + '"class="meshName">';
	innerLoad += meshs[i]['meshname'] + ' by ' + meshs[i]["username"];
	innerLoad += '</div>';
	if(meshs[i]["mesh"]["description"])
	    innerLoad += '<div class="meshDescription">' + meshs[i]["mesh"]["description"] + '</div></div>';
	if(sessionStorage.getItem('login') == meshs[i]["username"]) {
	    innerLoad += '<div id="odel' + i + '" class="meshDel" >x</div>';
	}
	innerLoad += '</div>'; 
    }
    innerLoad += '</div></div>';
    $('loadOnlineDiv').innerHTML = innerLoad;
    $('onlineMeshList').addEventListener('click', function (e) { e.stopPropagation(); }, false);
    for(var i = 0 ; i < meshs.length ; i++) {
	$('oname' + i).name = meshs[i]["meshname"];
	$('oname' + i).addEventListener('click', function (e) {
	    anakata_loadMesh(this.name);
	    anakata_unloadDiv('loadOnlineBox');
	}, false);
	$('up' + i).index = i;
	$('up' + i).name = meshs[i]["meshname"];
	$('up' + i).addEventListener('click', function (e) {
	    anakata_vote(this.name, true, this.index);
	}, false);
	$('down' + i).index = i;
	$('down' + i).name = meshs[i]["meshname"];
	$('down' + i).addEventListener('click', function (e) {
	    anakata_vote(this.name, false, this.index);
	}, false);
	if(sessionStorage.getItem('login') == meshs[i]["username"]) {
	    $('odel' + i).name = meshs[i]["meshname"];
	    $('odel' + i).addEventListener('click', function (e) { 
		anakata_deleteMesh(this.name);
	    }, false);
	}
	var vote = meshs[i]["vote"];
	if(vote != "") anakata_setVote(i, vote == "true");
	
    }
}

function anakata_setVote(i, up) {
    if (up) {
	$('down' + i).style.color = '#FFF';
	$('up' + i).style.color = '#FF8B60';
	$('score' + i).style.color = '#FF8B60';
    } else {
	$('up' + i).style.color = '#FFF';
	$('down' + i).style.color = '#9494FF';
	$('score' + i).style.color = '#9494FF';
    }
}

function anakata_updateVote(i, up, score) {
    if (up) {
	$('down' + i).style.color = '#FFF';
	$('up' + i).style.color = '#FF8B60';
	$('score' + i).innerHTML = score;
	$('score' + i).morph('color: #FF8B60;', { duration: 1 });	
    } else {
	$('up' + i).style.color = '#FFF';
	$('down' + i).style.color = '#9494FF';
	$('score' + i).innerHTML = score;
	$('score' + i).morph('color: #9494FF;', { duration: 1 });
    }
}
function anakata_warpClick() {
    $('sliders').morph('opacity: 0;', { transition: 'easeInCirc', duration: anakata_defaultDuration }); 
    $('sliders').style.zIndex = -1;
    anakata_shrinkList();
    anakata_isBox.each(function (pair) {
	if(pair.value)
	    anakata_unloadDiv(pair.key);
    });
}


function anakata_loadDiv(box) {
    if(anakata_isNoBox()) {
	$(box).style.zIndex = 1664; 
	var halfHeight = window.innerHeight / 2;
	$(box).style.top = -window.innerHeight + 'px';
	$(box).morph('top: ' + halfHeight + 'px', {duration: 1.5, transition: 'bounce', after: function () { anakata_isBox.set(box, true);}});
    }
}

function anakata_unloadDiv(box) {
    if(anakata_isBox.get(box)) {
	$(box).style.zIndex = -1;
	$(box).style.top = (- window.innerHeight) + 'px';
	anakata_isBox.set(box, false);
    }
}

function anakata_expandList() {
    if(!anakata_isMenu) {
	$('navList').morph('left: 10px;', { transition: 'spring', duration: anakata_defaultDuration});
	$('listExpander').morph('top: -50px;');
	anakata_isMenu = true;
    }
}
function anakata_shrinkList() {
    if(anakata_isMenu) {
	$('navList').morph('left: -500px;', { transition: 'swingFrom', duration: anakata_defaultDuration , after: function () {$('listExpander').morph('top: 10px;');}});
	anakata_isMenu = false;
    }
}
function anakata_unFullScreentextArea () {
    if(anakata_fullScreenTextarea) {
	$('section').removeChild(anakata_fullScreenTextarea);
	anakata_fullScreenTextarea.removeClassName('full-textarea');
	$('edit' + anakata_fullScreenTextarea.id).parentNode.appendChild(anakata_fullScreenTextarea);
    }
}

function anakata_isNoBox() {
    var isThereOne = false;
    anakata_isBox.each(function (pair) {
	isThereOne = isThereOne || pair.value;
    });
    return !isThereOne;

}