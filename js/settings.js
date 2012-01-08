/**
 * @constructor
 */
function anakata_Settings (jsonString, parsed) {
    var json;
    if(jsonString) {
	if(!parsed)
	    json = JSON.parse(jsonString);
	else
	    json = jsonString;
	this.name = json.name;
	this.fov = parseFloat(json.fov);
	this.scale = parseFloat(json.scale);
	this.mX = parseFloat(json.mX);
	this.mY = parseFloat(json.mY);
	this.mZ = parseFloat(json.mZ);
	this.mW = parseFloat(json.mW);
	this.xyStep = parseFloat(json.xyStep);
	this.xzStep = parseFloat(json.xzStep);
	this.xwStep = parseFloat(json.xwStep);
	this.yzStep = parseFloat(json.yzStep);
	this.ywStep = parseFloat(json.ywStep);
	this.zwStep = parseFloat(json.zwStep);
	this.vertices =   JSON.parse(json.vertices);
	this.edges =      JSON.parse(json.edges);
	this.edgesColor = JSON.parse(json.edgesColor);
	this.lineWidth = parseFloat(json.lineWidth);
	this.description = json.description;
    } else {
	this.reset();
    }
}
anakata_Settings.prototype = {
    reset: function () {
	this.name = "Tesseract";
	this.mX = window.innerWidth / 2 ;
	this.mY = window.innerHeight / 2;
	this.mZ = 500;
	this.mW = 500;
	this.fov = 1;
	this.scale = 100;
	this.xyStep = 7;
	this.xzStep = 10;
	this.xwStep = 13;
	this.yzStep = 9;
	this.ywStep = 7;
	this.zwStep = 15;
	this.vertices = [
 	    [-1,-1,-1, 1],
	    [ 1,-1,-1, 1],
	    [ 1, 1,-1, 1],
	    [-1, 1,-1, 1],
	    [-1,-1, 1, 1],
	    [ 1,-1, 1, 1],
	    [ 1, 1, 1, 1],
	    [-1, 1, 1, 1],
 	    [-1,-1,-1,-1],
	    [ 1,-1,-1,-1],
	    [ 1, 1,-1,-1],
	    [-1, 1,-1,-1],
	    [-1,-1, 1,-1],
	    [ 1,-1, 1,-1],
	    [ 1, 1, 1,-1],
	    [-1, 1, 1,-1]
	];
	this.edges = [
	    [0, 1, 2, 3, 0, 4, 5, 6, 7, 4],
	    [8, 9, 10, 11, 8, 12, 13, 14, 15, 12],
	    [1, 5],
	    [2, 6],
	    [3, 7],
	    [9, 13],
	    [10, 14],
	    [11, 15],
	    [0, 8],
	    [1, 9],
	    [2, 10],
	    [3, 11],
	    [4, 12],
	    [5, 13],
	    [6, 14],
	    [7, 15]
	];
	this.edgesColor = [
	    "#0f0",
	    "#f00",
	    "#0f0",
	    "#0f0",
	    "#0f0",
	    "#f00",
	    "#f00",
	    "#f00",
	    "#66f",
	    "#66f",
	    "#66f",
	    "#66f",
	    "#00f",
	    "#00f",
	    "#00f",
	    "#00f"
	];
	this.lineWidth = 0.5;
	this.description = "A simple 4 dimensions hypercube";
    }
}
    