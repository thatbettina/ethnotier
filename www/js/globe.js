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

		this.sound.stop( instrument.name);
		this.orchestra.seats[ instrument.seat].instrument = null;
		instrument.seat = -1;

		this.slotMenu.push( instrument);
		this.sortMenuInstrument();
	},
	// -------------------------------------------------------------------------
	moveInstrumentToSeat: function( instrument, seat) {
		var menuPosition = 0;
		for( ; menuPosition < this.slotMenu.length; ++menuPosition) {
			if( this.slotMenu[menuPosition].name == instrument.name) {
				break;
			}
		}
		var seatIsTaken = (null != this.orchestra.seats[ seat].instrument);
		var moveSeatToSeat = (-1 != instrument.seat);
		var moveMenuToSeat = (menuPosition < this.slotMenu.length);

		if( moveMenuToSeat && moveSeatToSeat) {
			// should be impossible
			instrument.moveToDragStart();
			return;
		} else if( moveMenuToSeat && seatIsTaken) {
			this.moveInstrumentToGlobe( this.orchestra.seats[ seat].instrument);
			this.slotMenu.splice( menuPosition, 1);
			this.sortMenuInstrument();
			this.sound.play( instrument.name);
		} else if( moveMenuToSeat) {
			this.slotMenu.splice( menuPosition, 1);
			this.sortMenuInstrument();
			this.sound.play( instrument.name);
		} else if( moveSeatToSeat && seatIsTaken) {
			this.orchestra.seats[ instrument.seat].instrument = null;
			this.moveInstrumentToSeat( this.orchestra.seats[ seat].instrument, instrument.seat);
			instrument.seat = -1;
		} else if( moveSeatToSeat) {
			this.orchestra.seats[ instrument.seat].instrument = null;
			instrument.seat = -1;
		} else {
			// should be impossible
			instrument.moveToDragStart();
			return;
		}

		this.orchestra.seats[ seat].instrument = instrument;
		this.sound.volume( instrument.name, this.orchestra.seats[ seat].volume);

		instrument.seat = seat;
		instrument.moveTo( this.orchestra.seats[ seat].center);
	},
	// -------------------------------------------------------------------------
}

// -----------------------------------------------------------------------------
