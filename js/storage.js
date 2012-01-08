function anakata_setValues () {
    $H(anakata_o).each( function (atr) {
	if(typeof atr.value !== "function") {
	    if(atr.key == 'name') {
		$('nameoveredit').value = $('nameover').innerHTML = $(atr.key).value = atr.value;
	    } else if(atr.key == 'description') {
		$('description').value = atr.value;
	    } else if (atr.key != 'vertices' && atr.key != 'edges' && atr.key != 'edgesColor') {
		$('s' + atr.key + "_simple").innerHTML = $(atr.key + "_simple").value = $('s' + atr.key).innerHTML = $(atr.key).value = atr.value;
	    } else if(atr.key == 'edgesColor') {
		$(atr.key + "_simple").innerHTML = $(atr.key).value = JSON.stringify(atr.value).replace(/(^\"|\"$|\\|\[|\])/g, "").replace(/, /g, ",\n");
	    } else {
		$(atr.key + "_simple").innerHTML = $(atr.key).value = JSON.stringify(atr.value).replace(/\"/g, "").replace(/\[\[/, "[").replace(/\]\]/, "]").replace(/\],\s?/g, "],\n");
	    }
	}
    });
}
function anakata_loadUnsavedMesh (mesh) {
    anakata_o = new anakata_Settings(mesh, true);
    anakata_setValues();
    anakata_info('Mesh ' + anakata_o.name + ' has been loaded', 2);
    
}
function anakata_save () {
    $H(anakata_o).each( function (atr) {
	if(typeof atr.value !== "function") {
	    atr.value = $(atr.key).value;
	}
    });
    localStorage.setItem(anakata_o.name, JSON.stringify(anakata_o));
    anakata_info('Mesh ' + anakata_o.name + ' has been saved', 2);
}

function anakata_reset () {
    localStorage.clear();
    anakata_o.reset();
    anakata_setValues();
    anakata_info('Local storage has been cleared', 2);
}

function anakata_load (index) {
    if(localStorage.length > index) {
	anakata_o = new anakata_Settings(localStorage.getItem(localStorage.key(index)), false);
	anakata_setValues();
	anakata_info('Mesh ' + anakata_o.name + ' has been loaded', 2);
    } else {
	anakata_o = new anakata_Settings(null, false);
	anakata_info('No saved mesh has been found, loading defaults', 2);
    }
}
function anakata_del (index) {
    localStorage.removeItem(localStorage.key(index));
    $('mesh' + index).remove();
    anakata_info('Mesh has been deleted', 2);
}
