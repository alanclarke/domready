/*
 * domready
 * https://github.com/alanclarke/domready.js
 * logic stripped from https://github.com/jquery/
 * Copyright (c) 2012 Alan Clarke
 * Licensed under the GPL license.
 */

function domready(callback){
		var self = this;
		self.readyWait = 1;

		// The ready event handler and self cleanup method
		self.DOMContentLoaded = function() {
			if ( document.addEventListener ) {
				document.removeEventListener( "DOMContentLoaded", self.DOMContentLoaded, false );
				self.ready();
			} else if ( document.readyState === "complete" ) {
			// we're here because readyState === "complete" in oldIE
			// which is good enough for us to call the dom ready!
				document.detachEvent( "onreadystatechange", self.DOMContentLoaded );
				self.ready();
			}
		};

		// Handle when the DOM is ready
		self.ready = function(wait){
			
			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --self.readyWait : self.isReady ) { return; }
			
			// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
			if ( !document.body ) {
				return setTimeout( self.ready, 1 );
			}

			// Remember that the DOM is ready
			self.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --self.readyWait > 0 ) {
				return;
			}
			// trigger callback
			return !callback||callback();
		};



		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			setTimeout( self.ready, 1 );
		
		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", self.ready, false );

		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", DOMContentLoaded );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", self.ready );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;
			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}
			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !self.isReady ) {
						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}
						// and execute waiting functions
						self.ready();
					}
				})();
			}
		}
};	