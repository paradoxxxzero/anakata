function anakata_initEvents () {
    var lis = $$('.navListElement');
    lis.each(function (li) {
	if(li.id.match(/^e/)) {
	    li.addEventListener('click', window[li.id.replace(/^e/, 'anakata_clickOn')], false);
	} else if(li.id.match(/^w/)) {
	    li.addEventListener('click', function () { 
		anakata_shrinkList();
		anakata_addWidget('simple-'+ li.id.replace(/^w/, '') +'-edit');
	    }, false);
	}
    });
    
    $$('.simple').each(function (widget) {
	widget.appendChild(new Element('div', { 'class': 'kill', id: 'kill'+widget.id}).update("x"));
	$('kill' + widget.id).addEventListener('click', function(e) {
	    anakata_remWidget(widget.id);
	}, false);
	widget.addEventListener('click', function(e) {
	    if(anakata_killMode || e.altKey || e.ctrlKey) {
		anakata_killMode = false;
		document.body.style.cursor = 'default';
		anakata_remWidget(widget.id);
	    }
	}, false);

	widget.style.top = 0;
	widget.style.right = screen.width + 'px';
    });

    $('wrap').addEventListener('click', anakata_warpClick, false);
    $('name').addEventListener('input', function () { $('nameoveredit').value = $('nameover').innerHTML = anakata_o.name = this.value;}, false);
    $('name').addEventListener('focus', function () { anakata_isHotkeysEnabled = false;}, false);
    $('name').addEventListener('blur', function () { anakata_isHotkeysEnabled = true;}, false);
    $('nameover').addEventListener('click', function () {
	$('nameoveredit').morph('top: 10px', { transition : 'bounce' });
	$('nameoveredit').focus();
    }, false);
    $('nameoveredit').addEventListener('input', function (e) {
	$('nameover').innerHTML = $('name').value = anakata_o.name = this.value;
    }, false);
    $('nameoveredit').addEventListener('focus', function () { anakata_isHotkeysEnabled = false;}, false);
    $('nameoveredit').addEventListener('blur', function () { anakata_isHotkeysEnabled = true;}, false);
    $('nameoveredit').addEventListener('blur', function (e) {
	$('nameoveredit').morph('top: -40px', { transition : 'swingFrom' });
    }, false);
    $('nameoveredit').addEventListener('keydown', function (e) {
	if(e.keyCode == 13) {
	    $('nameoveredit').morph('top: -40px', { transition : 'swingFrom' });
	}
    }, false);
    var sliders = $('section').getElementsBySelector('input[type="range"]');

    sliders.each(function (slider) {
	slider.addEventListener('input', function (e) {
	    var id = slider.id;
	    if(id.indexOf('_simple') != -1) {
		var idSummary = id.replace('_simple', '');
		$('s' + idSummary).innerHTML = $(idSummary).value = this.value;
	    } else {
		var idSimple = id + '_simple';
		$('s' + idSimple).innerHTML = $(idSimple).value = this.value;
	    }
	    $('s' + id).innerHTML = anakata_o[id.replace('_simple', '')] = parseFloat(this.value);
	}, false);
	$('s' + slider.id).addEventListener('click', function (e) {
	    var id = slider.id;
	    if(id.indexOf('_simple') != -1) {
		var idSummary = id.replace('_simple', '');
		$(idSummary).value = $('s' + idSummary).innerHTML = $(idSummary).value = 0;
	    } else {
		var idSimple = id + '_simple';
		$(idSimple).value = $('s' + idSimple).innerHTML = $(idSimple).value = 0;
	    }
	    $(id).value = $('s' + id).innerHTML = anakata_o[id.replace('_simple', '')] = parseFloat(0);
	}, false);
    });

    var textareas = $('section').getElementsBySelector('.dual');
    
    textareas.each(function (textarea) {
	textarea.ancestors()[0].appendChild(new Element('div', { 'class': 'edit', id: 'edit'+textarea.id}).update("Fullscreen"));
	$('edit' + textarea.id).addEventListener('click', function (e) {
	    anakata_fullScreenTextarea = textarea;
	    textarea.ancestors()[0].removeChild(textarea);
	    $('section').appendChild(textarea);
	    textarea.addClassName('full-textarea');
	}, false);
	textarea.addEventListener('input', function (e) {
	    try {
		var id = textarea.id;
		anakata_o[id.replace('_simple', '')] = JSON.parse('[' + this.value + ']');
		if($(id).style.color != '#0A0') $(id).morph('color: #0A0;', { duration: anakata_defaultDuration });
		if(id.indexOf('_simple') != -1) {
		    var idSummary = id.replace('_simple', '');
		    $(idSummary).value = this.value;
		} else {
		    var idSimple = id + '_simple';
		    $(idSimple).value = this.value;
		}
	    } catch(x) {
		$(id).morph('color: #A00;', { duration: anakata_defaultDuration });
	    }
	}, false);
	textarea.addEventListener('focus', function () { anakata_isHotkeysEnabled = false;}, false);
	textarea.addEventListener('blur', function () { anakata_isHotkeysEnabled = true;}, false);

    });

    $('description').addEventListener('input', function () { anakata_o.description = this.value;}, false);
    $('description').addEventListener('focus', function () { anakata_isHotkeysEnabled = false;}, false);
    $('description').addEventListener('blur', function () { anakata_isHotkeysEnabled = true;}, false);

    $('login').addEventListener('focus', function () { anakata_isHotkeysEnabled = false;}, false);
    $('login').addEventListener('blur', function () { anakata_isHotkeysEnabled = true;}, false);
    $('passwd').addEventListener('focus', function () { anakata_isHotkeysEnabled = false;}, false);
    $('passwd').addEventListener('blur', function () { anakata_isHotkeysEnabled = true;}, false);
    $('oldpasswd').addEventListener('focus', function () { anakata_isHotkeysEnabled = false;}, false);
    $('oldpasswd').addEventListener('blur', function () { anakata_isHotkeysEnabled = true;}, false);
    $('newpasswd').addEventListener('focus', function () { anakata_isHotkeysEnabled = false;}, false);
    $('newpasswd').addEventListener('blur', function () { anakata_isHotkeysEnabled = true;}, false);
    $('chpasswd').addEventListener('click', function (e) { anakata_chpasswd(e); }, false);
    $('save').addEventListener('click', anakata_save, false);
    $('reset').addEventListener('click', anakata_reset, false);
    $('load').addEventListener('click', function () { anakata_makeLoadDiv(); anakata_loadDiv('loadDiv'); }, false);
    $('listExpander').addEventListener('click', anakata_expandList, false);   
    $('listShrinker').addEventListener('click', anakata_shrinkList, false);   
    $('create').addEventListener('click', anakata_create, false);
    $('logmein').addEventListener('click', anakata_loginAttempt, false);
    $('email').appendChild(new Element('a', {href: 'mailto:anakata.tk+credits' + '@' + 'gmail.com'}).update('anakata.tk' + '@' + 'gmail.com'));    
}

function anakata_clickOnkill () {
    anakata_shrinkList();
    anakata_killMode = true;
    document.body.style.cursor = 'alias';
}

function anakata_clickOnsave () {
    anakata_shrinkList();
    anakata_save();
}

function anakata_clickOnload () {
    anakata_shrinkList();
    anakata_makeLoadDiv();
    anakata_loadDiv('loadBox');
}

function anakata_clickOnreset () {
    anakata_shrinkList();
    anakata_reset();
}

function anakata_clickOnlogin () {
    anakata_shrinkList();
    if($('elogin').innerHTML.match(/Logout.+/)) {
	anakata_logout(true);
    } else {
	anakata_loadDiv('loginBox');
    }
}
function anakata_clickOnchpasswd () {
    anakata_shrinkList();
    anakata_loadDiv('chpasswdBox');    
}


function anakata_clickOnpublish () {
    anakata_shrinkList();
    anakata_publish();
}

function anakata_clickOnmesheslist () {
    anakata_shrinkList();
    anakata_loadMeshList();
}

function anakata_clickOnall () {
    anakata_shrinkList();
    $('sliders').style.zIndex = 1337;
    $('sliders').morph('opacity: 0.75;', { transition: 'easeInCirc', duration: anakata_defaultDuration });
}

function anakata_clickOnhelp () {
    anakata_shrinkList();
    anakata_loadDiv('helpBox');
}

function anakata_clickOncredits () {
    anakata_shrinkList();
    anakata_loadDiv('creditsBox');
}
