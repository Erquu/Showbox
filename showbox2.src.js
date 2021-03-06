/**
 * @author Patrick Schmidt
 * 
 * Showbox Version 2.2
 */

var Showbox = function() {
	showboxPadding = 25;
	showboxMinTop = 25;
	sbFrontColor = '#FFFFFF';
	sbTextColor = '#000000';
	showboxBackground = 'rgba(0, 0, 0, 0.5)';
	sbBorderColor = sbFrontColor;
	showboxdisplay = 'none';
	content = "";
	/**
	 * @return Returns the Window Height 
	 */
	var windowHeight = function(win) {
		if(win == undefined) win = window;
		if (win.innerHeight)   
			return win.innerHeight;   
		else
			if (win.document.documentElement && win.document.documentElement.clientHeight)   
				return win.document.documentElement.clientHeight;   
		return win.document.body.offsetHeight;
	};
	/**
	 * @return Returns the Window Width
	 */
	var windowWidth = function() {
		if (window.innerWidth)
			return window.innerWidth;
		else if (document.body && document.body.offsetWidth)
			return document.body.offsetWidth;
		else
			return 0;
	};
	/*
	 * Removes the 'px' in a string an returns the number
	 */
	var pxToNum = function(str) {
		str = str.replace(' ', '').replace('px', '');
		str *= 1;
		return str;
	};
	// SHOWBOX FUCNTIONS
	var init = function(vars){
		if(vars) {
			if(vars.padding) this.showboxPadding = vars.padding;
			if(vars.minTop) this.showboxMinTop = vars.minTop;
			if(vars.sbBackground) this.sbFrontColor = vars.sbBackground;
			if(vars.sbForeground) this.sbTextColor = vars.sbForeground;
			if(vars.background) this.showboxBackground = vars.background;
			if(vars.borderColor) this.sbBorderColor = vars.borderColor;
		}
		
		var FWidth  = this.windowWidth();
		var FHeight = this.windowHeight();

		// Transparenter Hintergrund
		var showbox = document.createElement("div");
		showbox.id                    = 'ShowboxBG';
		showbox.name                  = 'ShowboxBG';
		showbox.style.display         = 'none';
		showbox.style.position        = 'fixed';
		showbox.style.top             = '0px';
		showbox.style.left            = '0px';
		showbox.style.background      = this.showboxBackground;
		showbox.setAttribute('onclick', 'Showbox.hide()');
		showbox.style.height          = FHeight + 'px';
		showbox.style.width           = FWidth + 'px';
		document.body.appendChild(showbox);

		// Box mit Inhalt
		var showboxcontent = document.createElement("div");
		showboxcontent.id               = 'Showbox';
		showboxcontent.name             = 'Showbox';
		showboxcontent.style.display    = 'none';
		showboxcontent.style.position   = 'fixed';
		showboxcontent.style.background = this.sbFrontColor;
		showboxcontent.style.padding    = this.showboxPadding + 'px';
		showboxcontent.innerHTML        = '<div style="font-family:Verdana;"><h2 style="line-height:0px;">Showbox</h2><span syle="font-size:9px">By Patrick Schmidt &copy; 2010-2011</span></div>';
		document.body.appendChild(showboxcontent);

		if(document.all) {
			// Positinonierung IE
			document.all.Showbox.style.display = 'block';
			document.all.Showbox.style.left    = ((FWidth / 2) - (document.all.Showbox.offsetWidth / 2)) + 'px';
			document.all.Showbox.style.top     = ((FHeight / 2) - (document.all.Showbox.offsetHeight / 2)) + 'px';
			if(this.pxToNum(document.all.Showbox.style.top) < this.showboxMinTop){document.all.Showbox.style.top = this.showboxMinTop + 'px'}
			document.all.Showbox.style.display = 'none';
		} else {
			// Positinonierung FireFox
			document.getElementById('Showbox').style.display = 'block';
			document.getElementById('Showbox').style.left    = ((FWidth / 2) - (document.getElementById('Showbox').offsetWidth / 2)) + 'px';
			document.getElementById('Showbox').style.top     = ((FHeight / 2) - (document.getElementById('Showbox').offsetHeight / 2)) + 'px';
			if(this.pxToNum(document.getElementById('Showbox').style.top) < this.showboxMinTop){document.getElementById('Showbox').style.top = this.showboxMinTop + 'px'}
			document.getElementById('Showbox').style.display = 'none';
		}
		
		var pa   = document.getElementsByTagName('head')[0] ;
		var el   = document.createElement('style');
		el.type  = 'text/css';
		el.media = 'screen';
		var str  = '';
		str     += '#Showbox, #Showbox *{color:'+this.sbTextColor+'}';
		str     += '#Showbox{border:1px solid '+sbBorderColor+';-moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;-moz-box-shadow:0 0 15px #333;-webkit-box-shadow:0 0 15px #333;box-shadow:0 0 15px #333;}';
		str     += '.ShowboxFadein{-moz-animation-duration:1s;-moz-animation-name:showbox_fadein;-webkit-animation-duration:1s;-webkit-animation-name:showbox_fadein;}';
		str     += '@-moz-keyframes showbox_fadein {from {background:rgba(0,0,0,0.0);color:rgba(0,0,0,0.0);}}';
		str     += '@-webkit-keyframes showbox_fadein {0% {background:rgba(0,0,0,0.0);color:rgba(0,0,0,0.0);}}';
		if (el.styleSheet) el.styleSheet.cssText= str;// IE method
		else el.appendChild(document.createTextNode(str));// others
		pa.appendChild(el);

		this.resize();
	};
	var toggle = function() {
		this.showboxdisplay = this.showboxdisplay == 'none' ? 'block' : 'none';
		if(this.showboxdisplay == 'block') {
			this.show();
		} else {
			this.hide();
		}
	};
	var show = function(url, sync) {
		if(url && url.length > 0) {
			if(sync != null && sync) {
				this.setText(this.getText(url));
			} else {
				this.setTextAsync(url);
			}
		}
		var showbox         = document.getElementById('ShowboxBG');
		var showboxcontent  = document.getElementById('Showbox');
		this.showboxdisplay = 'block';
		showbox.className			 = 'ShowboxFadein';
		showboxcontent.className	 = 'ShowboxFadein';
		this.resize();
	};
	var hide = function() {
		var showbox         = document.getElementById('ShowboxBG');
		var showboxcontent  = document.getElementById('Showbox');
		this.showboxdisplay = 'none';
		showbox.className		 = '';
		showboxcontent.className = '';
		showbox.style.display    = this.showboxdisplay;
		showboxcontent.style.display = this.showboxdisplay;
	};
	var setText = function(text) {
		document.getElementById('Showbox').innerHTML = text;
		this.resize();
	};
	var resize = function() {
		var FWidth  = this.windowWidth();
		var FHeight = this.windowHeight();

		if(document.all) {
			// Positinonierung IE
			document.all.Showbox.style.display            = 'block';
			document.getElementById('Showbox').style.left = ((FWidth / 2) - (document.all.Showbox.offsetWidth / 2)) + 'px';
			document.getElementById('Showbox').style.top  = ((FHeight / 2) - (document.all.Showbox.offsetHeight / 2)) + 'px';
			document.all.Showbox.style.display            = this.showboxdisplay;
			document.all.ShowboxBG.style.display          = 'block';
			document.all.ShowboxBG.style.height           = FHeight + 'px';
			document.all.ShowboxBG.style.width            = FWidth + 'px';
			document.all.ShowboxBG.style.display          = this.showboxdisplay;
		} else {
			// Positinonierung FireFox
			document.getElementById('Showbox').style.display   = 'block';
			document.getElementById('Showbox').style.left      = ((FWidth / 2) - (document.getElementById('Showbox').offsetWidth / 2)) + 'px';
			document.getElementById('Showbox').style.top       = ((FHeight / 2) - (document.getElementById('Showbox').offsetHeight / 2)) + 'px';
			document.getElementById('Showbox').style.display   = this.showboxdisplay;
			document.getElementById('ShowboxBG').style.display = 'block';
			document.getElementById('ShowboxBG').style.height  = FHeight + 'px';
			document.getElementById('ShowboxBG').style.width   = FWidth + 'px';
			document.getElementById('ShowboxBG').style.display = this.showboxdisplay;
		}
	};
	/*
	 * AJAX Functions
	 */
	var getText = function(url) {
		if (window.XMLHttpRequest)
			request = new XMLHttpRequest();
		else
			request = new ActiveXObject("Microsoft.XMLHTTP");
		if (request) {
			request.open("GET", url, false);
			request.send(null);
			return request.responseText;
		} else return false;
	};
	var setTextSync = function(url) {
		this.setText(this.getText(url));
	};
	var setTextAsync = function(url) {
		this.setText("LADE...");
		if (window.XMLHttpRequest)
			request = new XMLHttpRequest();
		else
			request = new ActiveXObject("Microsoft.XMLHTTP");
		if (request) {
			request.open("GET", url, true);
			request.send(null);
			request.onreadystatechange = function() {
				if (request.readyState == 4) {
					Showbox.setText(request.responseText);		
				}
			};
		} else return false;
	};
	return {
		showboxPadding:showboxPadding,
		showboxMinTop:showboxMinTop,
		sbFrontColor:sbFrontColor,
		sbTextColor:sbTextColor,
		showboxBackground:showboxBackground,
		sbBorderColor:sbBorderColor,
		showboxdisplay:showboxdisplay,
		content:content,
		windowHeight:windowHeight,
		windowWidth:windowWidth,
		pxToNum:pxToNum,
		init:init,
		toggle:toggle,
		show:show,
		hide:hide,
		setText:setText,
		resize:resize,
		getText:getText,
		setTextSync:setTextSync,
		setTextAsync:setTextAsync
	};
}();
