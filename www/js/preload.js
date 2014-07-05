// -----------------------------------------------------------------------------
/* preload.js */
// -----------------------------------------------------------------------------

function Preload() {
	this.create();
}
Preload.prototype = {
	// -------------------------------------------------------------------------
	create: function() {
		this.loaded = 0;
		this.media = new Array();
		this.callback = null;
	},
	// -------------------------------------------------------------------------
	begin: function() {
		this.callback = null;
	},
	// -------------------------------------------------------------------------
	wait: function( callback) {
		this.callback = callback;

		if(( null != this.callback) && (this.media.length == this.loaded)) {
			var callback = this.callback;
			this.callback = null;

			setTimeout( function() {
				callback();
			}, 100);
 		}
	},
	// -------------------------------------------------------------------------
	mediaLoaded: function() {
		++this.loaded;

		if(( null != this.callback) && (this.media.length == this.loaded)) {
			var callback = this.callback;
			this.callback = null;

			callback();
		}
	},
	// -------------------------------------------------------------------------
	addCSS: function( selector, css) {
		$( '<style type="text/css">' + selector + '{' + css + '}</style>').appendTo( 'head');
	},
	// -------------------------------------------------------------------------
	addImage: function( id, src, parent) {
		parent = parent || '#mainContainer';

		if( -1 == $.inArray( src, this.media)) {
			this.media.push( src);
			$( '<img id="' + id + '" src="' + src + '" />').addClass( 'hidden userStatic').appendTo( parent).load( function() {
				preload.mediaLoaded();
			});
		} else {
			$( '<img id="' + id + '" src="' + src + '" />').addClass( 'hidden userStatic').appendTo( parent);
		}
	},
	// -------------------------------------------------------------------------
	addMedia: function( id, src) {
		parent = '#mainContainer';

		$( '<audio id="' + id + '" src="' + src + '" preload="auto"></audio>').appendTo( parent).load();
	},
	// -------------------------------------------------------------------------
}

// -----------------------------------------------------------------------------

var preload = new Preload;

// -----------------------------------------------------------------------------
