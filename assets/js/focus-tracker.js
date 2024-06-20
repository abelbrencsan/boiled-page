/**
 * Focus tracker
 * Copyright 2024 Abel Brencsan
 * Released under the MIT License
 */
const FocusTracker = (function(){

	'use strict';

	let focusTracker = {};
	let className = 'keyboard-focus';
	let isUsingKeyboard = false;

	/**
	* Initialize focus tracker.
	* 
	* @public
	*/
	let init = function() {
		addEvents();
	};

	/**
	* Add events to the document body.
	* 
	* @private
	*/
	let addEvents = function() {
		document.body.addEventListener('keydown', preFocus);
		document.body.addEventListener('mousedown', preFocus);
		document.body.addEventListener('focusin', addFocus);
		document.body.addEventListener('focusout', removeFocus);
	};

	/**
	* Remove events from document body.
	* 
	* @private
	*/
	let removeEvents = function() {
		document.body.removeEventListener('keydown', preFocus);
		document.body.removeEventListener('mousedown', preFocus);
		document.body.removeEventListener('focusin', addFocus);
		document.body.removeEventListener('focusout', removeFocus);
	};

	/**
	* Detect user is using keyboard or mouse.
	* 
	* @private
	* @param {Event} event
	*/
	let preFocus = function(event) {
		isUsingKeyboard = (event.type === 'keydown');
	};

	/**
	* Add focus tracker class on keyboard focus in.
	* 
	* @private
	* @param {Event} event
	*/
	let addFocus = function(event) {
		if (isUsingKeyboard) event.target.classList.add(className);
	};

	/**
	* Remove focus tracker class on focus out.
	* 
	* @private
	* @param {Event} event
	*/
	let removeFocus = function(event) {
		event.target.classList.remove(className);
	};

	/**
	* Destroy focus tracker.
	* 
	* @public
	*/
	let destroy = function() {
		removeEvents();
	};

	/**
	* Get value of "isUsingKeyboard".
	* 
	* @private
	* @return {boolean}
	*/
	let getIsUsingKeyboard = function() {
		return isUsingKeyboard;
	};

	return {
		init: init,
		destroy: destroy,
		getIsUsingKeyboard: getIsUsingKeyboard
	};
	
})();
