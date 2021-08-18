/**
 * App - v.1.1.0
 * Copyright 2021 Abel Brencsan
 * Released under the MIT License
 */

var app = {

	// App settings
	isTouch: false,

	// Breakpoints as media queries
	breakpoints: {
		large: '(max-width: 82em)',
		medium: '(max-width: 62em)',
		small: '(max-width: 47em)',
		xsmall: '(max-width: 32em)'
	},

	/**
	 * Initialize app
	 */
	init: function() {

		// Detect JavaScript is enabled
		document.body.classList.remove('no-js');

		// Detect page has loaded
		document.body.classList.add('is-loading');
		window.addEventListener('load', function() {
			document.body.classList.remove('is-loading');
		});

		// Detect touch screen
		window.addEventListener('touchstart', function touchDetect() {
			app.isTouch = true;
			document.body.classList.remove('no-touch');
			window.removeEventListener('touchstart', touchDetect);
		});
		window.addEventListener('pointerdown', function pointerTouchDetect(event) {
			if (event.pointerType != 'mouse') {
				app.isTouch = true;
				document.body.classList.remove('no-touch');
			}
			window.removeEventListener('touchstart', pointerTouchDetect);
		});

		// Breakpoint has changed
		for (var key in app.breakpoints) {
			window.matchMedia(app.breakpoints[key]).addListener(app.onBreakpointChange);
		}

		// Initialize global modules
		FocusTracker.init();

	},

	/**
	 * Breakpoint has changed
	 */
	onBreakpointChange: function(mediaQuery) {
	}
};

app.init();
