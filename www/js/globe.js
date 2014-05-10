// -----------------------------------------------------------------------------
/* globe.js */
// -----------------------------------------------------------------------------

function Globe() {
	this.obj = $( '#globe');

	if( 0 == this.obj.length) {
		this.create();
	}
}
Globe.prototype = {
	// -------------------------------------------------------------------------
	create: function() {
		this.preloadGlobe();
	},
	// -------------------------------------------------------------------------
	preloadGlobe: function() {
		this.showGlobe();
		this.preloadResources();
	},
	// -------------------------------------------------------------------------
	showGlobe: function() {
		$( '#mapContainer').append( '<div id="globe">globe</div>');
		this.obj = $( '#globe');
	},
	// -------------------------------------------------------------------------
	preloadResources: function() {
		this.sound = new Sound;
		this.orchestra = new Orchestra( this.sound);

		this.showMenuInstrument();
	},
	// -------------------------------------------------------------------------
	showMenuInstrument: function() {
		for( var i = 0; i < 1; ++i) {
			var instrument = new Instrument( i, this.orchestra);
		}
	},
	// -------------------------------------------------------------------------
}

// -----------------------------------------------------------------------------
