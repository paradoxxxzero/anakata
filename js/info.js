/**
 * @constructor
 */
function anakata_Message (message, level) {
    this.message = message;
    this.level = level;
}

//error        -> 0
//warning      -> 1
//info         -> 2
//long warning -> 3
function anakata_info (message, level) {
    if(anakata_isInfoDisplaying) {
	anakata_infoQueue.push(new anakata_Message(message, level));
    } else {
	anakata_isInfoDisplaying = true;
	var color;
	switch(level) {
	case 0:
	    color = '#f00';
	    break;
	case 1:
	case 3:
	    color = '#ff0';
	    break;
	case 2:
	    color = '#77f';
	    break;
	default:
	    color = '#fff';
	}
	$('info').innerHTML = message;
	$('info').style.left = '-50%'
	var afterAfterMorph = function () {
	    anakata_isInfoDisplaying = false; 
	    if(anakata_infoQueue.size() > 0) { 
		var queuedMessage = anakata_infoQueue.shift(); 
		anakata_info(queuedMessage.message, queuedMessage.level); 
	    }
	};
	var afterMorph = function () {
	    $('info').morph('left: 100%; color: #000;', { duration: .4, transition: 'easeFrom', after: afterAfterMorph });
	};
	var timeAfterMorph = function () { 
	    setTimeout(function () {afterMorph()}, level == 3 ? 10000 : 2000);
	}
	$('info').morph('left: 25%; color: ' + color, { duration: .4, transition: 'bounce', after: timeAfterMorph });
    }    
}
