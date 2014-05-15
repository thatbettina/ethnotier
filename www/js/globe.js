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
		this.cabinet = new Cabinet();

		this.showMenuInstrument();
	},
	// -------------------------------------------------------------------------
	showMenuInstrument: function() {
		for( var i = 0; i < this.cabinet.instruments.length; ++i) {
			var instrument = new Instrument( this.cabinet.instruments[i].name, this.orchestra);
			$( instrument.obj).css({ left: 100 * i + 5, top: 220});
		}
	},
	// -------------------------------------------------------------------------
}

// -----------------------------------------------------------------------------
