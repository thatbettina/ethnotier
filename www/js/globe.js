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
		this.orchestra = new Orchestra( this);
		this.cabinet = new Cabinet();

		this.slotMenu = [];

		this.showMenuInstrument();
	},
	// -------------------------------------------------------------------------
	showMenuInstrument: function() {
		for( var i = 0; i < this.cabinet.instruments.length; ++i) {
			this.slotMenu.push( new Instrument( this.cabinet.instruments[i].name, this.orchestra));
		}

		this.sortMenuInstrument();
	},
	// -------------------------------------------------------------------------
	sortMenuInstrument: function() {
		for( var i = 0; i < this.slotMenu.length; ++i) {
			this.slotMenu[i].moveTo({ x: 100 * i + 50, y: 250});
		}
	},
	// -------------------------------------------------------------------------
	moveInstrumentToGlobe: function( instrument) {
		if( -1 == instrument.seat) {
			instrument.moveToDragStart();
			return;
		}
		if( null == this.orchestra.seats[ instrument.seat].instrument) {
			instrument.moveToDragStart();
			return;
		}
		if( instrument.name == this.orchestra.seats[ instrument.seat].name) {
			instrument.moveToDragStart();
			return;
		}

		this.orchestra.seats[ instrument.seat].instrument = null;
		instrument.seat = -1;

		this.slotMenu.push( instrument);
		this.sortMenuInstrument();
	},
	// -------------------------------------------------------------------------
	moveInstrumentToSeat: function( instrument, seat) {
		if( -1 != instrument.seat) {
			instrument.moveToDragStart();
			return;
		}
		if( null != this.orchestra.seats[ seat].instrument) {
			instrument.moveToDragStart();
			return;
		}

		var i = 0;
		for( ; i < this.slotMenu.length; ++i) {
			if( this.slotMenu[i].name == instrument.name) {
				break;
			}
		}
		if( i < this.slotMenu.length) {
			this.slotMenu.splice( i, 1);
		} else {
			instrument.moveToDragStart();
			return;
		}

		this.orchestra.seats[ seat].instrument = instrument;

		instrument.seat = seat;
		instrument.moveTo( this.orchestra.seats[ seat].center);

		this.sound.play( instrument.name);

		this.sortMenuInstrument();
	},
	// -------------------------------------------------------------------------
}

// -----------------------------------------------------------------------------
