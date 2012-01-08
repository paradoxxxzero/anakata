function anakata_kpress (e) {
    var k = e.keyCode;
    var s = 0.1;
    var q = 50;
    if(e.ctrlKey) {
	s *= 2;
	s /= 2;
    }
    if(e.altKey){
	s /= 2;
	q *= 2;
    }
    if (k == 27) {
	anakata_unFullScreentextArea();
    }
    if(!anakata_isHotkeysEnabled) return true;
    if(k == 65) {
	anakata_xya += s;
    } else if(k == 81) {
	anakata_xya -= s;
    } else if(k == 90) {
	anakata_xza += s;
    } else if(k == 83) {
	anakata_xza -= s;
    } else if(k == 69) {
	anakata_xwa += s;
    } else if(k == 68) {
	anakata_xwa -= s;
    } else if(k == 82) {
	anakata_yza += s;
    } else if(k == 70) {
	anakata_yza -= s;
    } else if(k == 84) {
	anakata_ywa += s;
    } else if(k == 71) {
	anakata_ywa -= s;
    } else if(k == 89) {
	anakata_zwa += s;
    } else if(k == 72) {
	anakata_zwa -= s;
    } else if(k == 85) {
	anakata_o.mX += q;
    } else if(k == 74) {
	anakata_o.mX -= q;
    } else if(k == 73) {
	anakata_o.mY += q;
    } else if(k == 75) {
	anakata_o.mY -= q;
    } else if(k == 79) {
	anakata_o.mZ += q;
    } else if(k == 76) {
	anakata_o.mZ -= q;
    } else if(k == 80) {
	anakata_o.mW += q;
    } else if(k == 77) {
	anakata_o.mW -= q;
    } else if(k == 87) {
	anakata_addWidget('simple-cam-edit');
    } else if(k == 88) {
	anakata_addWidget('simple-speed-edit');
    } else if(k == 67) {
	anakata_addWidget('simple-vertices-edit');
    } else if(k == 86) {
	anakata_addWidget('simple-edges-edit');
    } else if(k == 66) {
	anakata_addWidget('simple-edgescolor-edit');
    } else if(k == 78) {
	anakata_addWidget('simple-desc-edit');
    } else if(k == 188) {
	anakata_addWidget('simple-misc-edit');
    } else if(k == 45) {
	anakata_clickOnsave();
    } else if(k == 36) {
	anakata_clickOnload();
    } else if(k == 46) {
	anakata_clickOnreset();
    } else if(k == 118) {
	anakata_startDrawing();
    } else if (k == 119) {
	anakata_stopDrawing();
    } else if (k== 120) {
	anakata_stopDrawing();
	anakata_timersNumber++;
	anakata_startDrawing();
    } else if (k== 121) {
	anakata_stopDrawing();
	if(anakata_timersNumber > 0) anakata_timersNumber--;
	anakata_startDrawing();
    } 


}
