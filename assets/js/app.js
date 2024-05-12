/**
 * App
 * Copyright 2024 Abel Brencsan
 * Released under the MIT License
 */
const app = {

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
	 * Initialize app.
	 * 
	 * @public
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
		for (let key in app.breakpoints) {
			window.matchMedia(app.breakpoints[key]).addListener(app.onBreakpointChange);
		}

		// Init global modules
		FocusTracker.init();

		// Init single-instance modules
		app.detectBreakpointChange();
	},

	/**
	 * Add event listeners for breakpoint changes.
	 * 
	 * @public
	 */
	detectBreakpointChange() {

		// Init variables
		let mql;

		// Add event listeners for breakpoint changes
		for (let key in app.breakpoints) {
			mql = window.matchMedia(app.breakpoints[key]);
			mql.addEventListener('change', app.onBreakpointChange);
		}
	},

	/**
	 * Event when breakpoint has been changed.
	 * 
	 * @public
	 * @param {MediaQueryListEvent} event
	 */
	onBreakpointChange: function(event) {
	}
};

app.init();
