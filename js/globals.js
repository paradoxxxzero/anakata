 /* *Globals* */

var anakata_timersNumber = 1;
var anakata_c2d;
var anakata_busy = false;
var anakata_killMode = false;
var anakata_widgetsOpen = new Array();
var anakata_midgets = new Array();
var anakata_defaultDuration = 0.75;
var anakata_isInfoDisplaying = false;
var anakata_isHotkeysEnabled = true;
var anakata_drawTimer = new Array();
var anakata_fpsTimer;
var anakata_xya = 0;
var anakata_xza = 0;
var anakata_xwa = 0;
var anakata_yza = 0;
var anakata_ywa = 0;
var anakata_zwa = 0;
var anakata_projectedVertices = new Array();
var anakata_frames = 0;
var anakata_xClipMin = 0;
var anakata_xClipMax = 0;
var anakata_yClipMin = 0;
var anakata_yClipMax = 0;
var anakata_isloadBox = false;
var anakata_isMenu = false;
var anakata_isBox = new Hash();
var anakata_infoQueue = new Array();
var anakata_o = {};
var anakata_fullScreenTextarea;
var anakata_xhrDone = true;
var anakata_isInError = false;
anakata_isBox.set('loginBox', false);
anakata_isBox.set('creditsBox', false);
anakata_isBox.set('loadBox', false);
anakata_isBox.set('loadOnlineBox', false);

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-5078036-13']);
//_gaq.push(['_setDomainName', '.anakata.tk']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();


function s(angle) {
    return Math.sin(angle);
}
function c(angle) {
    return Math.cos(angle);
}
