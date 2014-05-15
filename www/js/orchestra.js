// -----------------------------------------------------------------------------
/* orchestra.js */
// -----------------------------------------------------------------------------

function Orchestra( globe) {
	this.obj = $( '#orchestra');
	this.globe = globe;
	this.seats = new Array();
	this.collisionSeat = -1;

	if( 0 == this.obj.length) {
		this.create();
	}
}
Orchestra.prototype = {
	// -------------------------------------------------------------------------
	create: function() {
		$( '#mapContainer').append( '<div id="orchestra">orchestra (drag some instruments to the seats)</div>');
		this.obj = $( '#orchestra');

		for( var i = 0; i < 4; ++i) {
			$( '#mapContainer').append( '<div id="seat' + i + '" class="seat" style="left:' + (i*120+60) +'px;bottom:60px;">seat</div>');
			this.seats[ i] = { obj: $( '#seat' + i), instrument: null };

			var pos = $( this.seats[ i].obj).position();
			this.seats[ i].center = { x: pos.left + parseInt( this.seats[ i].obj.outerWidth( true) / 2), y: pos.top + parseInt( this.seats[ i].obj.outerHeight( true) / 2) };
		}
	},
	// -------------------------------------------------------------------------
	showCollisionSeat: function( center) {
		var max = 1000000;
		var pos = -1;

		for( var i = 0; i < this.seats.length; ++i) {
			var distance = Math.sqrt( Math.pow( this.seats[ i].center.x - center.x, 2) + Math.pow( this.seats[ i].center.y - center.y, 2));

			if( distance < max) {
				max = distance;
				pos = i;
			}
		}

		if( max > 100) {
			pos = -1;
		}
		if(( -1 == pos) && (center.y < $( this.obj).position().top)) {
			pos = this.seats.length;
		}

		if( this.collisionSeat != pos) {
			if(( -1 < this.collisionSeat) && (this.collisionSeat < this.seats.length)) {
				$(this.seats[ this.collisionSeat].obj).removeClass( 'over');
			}
			this.collisionSeat = pos;
			if(( -1 < this.collisionSeat) && (this.collisionSeat < this.seats.length)) {
				$(this.seats[ this.collisionSeat].obj).addClass( 'over');
			}
		}
	},
	// -------------------------------------------------------------------------
	endCollisionSeat: function( instrument) {
		if(( this.collisionSeat > -1) && (this.collisionSeat == instrument.seat)) {
			$(this.seats[ this.collisionSeat].obj).removeClass( 'over');
			this.collisionSeat = -1;
		}

		if( this.collisionSeat == -1) {
			instrument.moveToDragStart();
		} else if( this.collisionSeat == this.seats.length) {
			this.collisionSeat = -1;

			this.globe.moveInstrumentToGlobe( instrument);
		} else {
			$(this.seats[ this.collisionSeat].obj).removeClass( 'over');

			this.globe.moveInstrumentToSeat( instrument, this.collisionSeat);

			this.collisionSeat = -1;
		}
	},
	// -------------------------------------------------------------------------
}

// -----------------------------------------------------------------------------
