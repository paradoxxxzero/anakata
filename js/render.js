function anakata_strokeMesh  () {
    var c = $('canvas').getContext('2d');
    var j = anakata_o.edges.length - 1;
    do {
	var edge = anakata_o.edges[j];
	anakata_c2d.lineWidth = anakata_o.lineWidth;
	anakata_c2d.beginPath();
	anakata_c2d.strokeStyle = anakata_o.edgesColor[j] ? anakata_o.edgesColor[j] : "#fff";
	var i = edge.length - 1;
	try {
	    do {		
		var path = edge[i];
		var x2d = anakata_projectedVertices[path][0];
		var y2d = anakata_projectedVertices[path][1];
		if(x2d < anakata_xClipMin) anakata_xClipMin = x2d;
		if(x2d > anakata_xClipMax) anakata_xClipMax = x2d;
		if(y2d < anakata_yClipMin) anakata_yClipMin = y2d;
		if(y2d > anakata_yClipMax) anakata_yClipMax = y2d;
		
		if(i == edge.length - 1) {
		    anakata_c2d.moveTo(x2d, y2d);
		} else {
		    anakata_c2d.lineTo(x2d, y2d);
		}
	    } while (i--);
	    anakata_c2d.stroke();
	} catch (x) {
	    if(anakata_infoQueue.length == 0) {
		anakata_info('Error in edges list on : [' + edge + ']\n Vertice ' + path + ' does not exist.', 0);
	    }
	}
    } while(j--);
}
function anakata_draw  () {
    if(!anakata_busy) {
	anakata_busy = true;
	anakata_updateAngles();
	var vertex = anakata_o.vertices.length - 1;
	do {		
	    anakata_projectedVertices[vertex] = anakata_projectTo2D(anakata_projectTo3D(anakata_rotate(vertex)));
	} while(vertex--);
	
	var clipMargin = 2 * anakata_o.lineWidth;
	anakata_c2d.clearRect(anakata_xClipMin - clipMargin, anakata_yClipMin - clipMargin, anakata_xClipMax - anakata_xClipMin + 2 * clipMargin, anakata_yClipMax - anakata_yClipMin + 2 * clipMargin);
	anakata_xClipMin = 10000;
	anakata_xClipMax = 0;
	anakata_yClipMin = 10000;
	anakata_yClipMax = 0;
	anakata_strokeMesh();
	anakata_frames++;
	anakata_busy = false;
    }
}

function anakata_fps () {
    $("fps").innerHTML = anakata_frames;
    anakata_frames = 0;
}

function anakata_render () {
    if(!!!document.createElement('canvas').getContext) {
	$('loading').remove();
	document.body.innerHTML = $('canvas').innerHTML;
	return;
    }
    anakata_initEvents();
    if(Prototype.Browser.Gecko) anakata_info("/!\\ <br />You seem to use firefox, good !<br />But to see this engine run smoothly try an up-to-date webkit based browser like Google Chrome.<br /> It's like 4 times faster.", 3);
    anakata_load(0);
    anakata_setValues();
    anakata_loginOnSession();
    document.addEventListener('keydown', anakata_kpress, false);
    $('canvas').width = window.innerWidth;
    $('canvas').height = window.innerHeight;
    anakata_c2d = $('canvas').getContext('2d');
    anakata_c2d.lineCap = 'round';
    window.addEventListener('resize', anakata_resize, false);
    $('loading').morph('top: 100%', { duration: anakata_defaultDuration });
    $('loading').remove();
    anakata_startDrawing();
    anakata_fpsTimer = setInterval(function() { anakata_fps(); }, 1000);
}
function anakata_startDrawing() {
    anakata_stopDrawing();
    for(var i = 0 ; i < anakata_timersNumber ; i++) { 
	anakata_drawTimer[i] = setInterval(function() { anakata_draw(); }, 5);
    }
}
function anakata_stopDrawing() {
    for(var i = 0 ; i < anakata_timersNumber ; i++) { 
	clearInterval(anakata_drawTimer[i]);    
    }
}
function anakata_resize () {
    $('canvas').width = window.innerWidth;
    $('canvas').height = window.innerHeight;
}

