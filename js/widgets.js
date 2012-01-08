/**
 * @constructor
 */
function anakata_Midget (widget, top, right) {
    this.widget = widget;
    this.top = 0;
    this.right = 0;
}

function anakata_reArrangeWidgets () {
    var padding = 10;
    var right = padding;
    var top = padding;
    var zindex = 10;
    anakata_midgets.sort(anakata_byHeight);
    anakata_midgets.each(function (midget) {
	if(top + midget.widget.offsetHeight > window.innerHeight) {
	    top = padding;
	    right += midget.widget.offsetWidth + padding;
	    midget.top = padding;
	} else {
	    midget.top = top;
	}	    
	midget.right = right;
	top += midget.widget.offsetHeight + padding;
	midget.widget.style.zIndex = zindex++;
    });
    anakata_midgets.each(function (midget) {
	midget.widget.morph('top: ' + midget.top + 'px; right: ' + midget.right + 'px;', { transition: 'bounce', duration: anakata_defaultDuration, propertyTransitions: { top: 'easeTo' }});
    });
}
function anakata_addWidget (widget) {
    if(anakata_widgetsOpen.indexOf(widget) != -1) {
	anakata_remWidget(widget);
    } else {
	anakata_midgets.push(new anakata_Midget($(widget), 0, 0));
	anakata_widgetsOpen.push(widget);
	anakata_reArrangeWidgets();
    }
}
function anakata_remWidget (widget) {
    anakata_widgetsOpen = anakata_widgetsOpen.without(widget);
    var midgetToRem;
    anakata_midgets.each(function (midget) {
	if(midget.widget.id == widget) {
	    midgetToRem = midget;
	}
    });
    anakata_midgets = anakata_midgets.without(midgetToRem);
    $(widget).morph('right: ' + window.innerWidth + 'px;', { transition: 'easeInExpo', duration: anakata_defaultDuration });
    anakata_reArrangeWidgets();
}

function anakata_byHeight (midget1, midget2) {
    return midget2.widget.offsetHeight - midget1.widget.offsetHeight;
}
