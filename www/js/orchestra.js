// -----------------------------------------------------------------------------
/* orchestra.js */
// -----------------------------------------------------------------------------

function Orchestra( globe, callback) {
	this.globe = globe;

	this.obj = null;
	this.seats = new Array();
	this.collisionSeat = -1;

	this.create( callback);
}
Orchestra.prototype = {
	// -------------------------------------------------------------------------
	create: function( callback) {
		$( '#mainContainer').append( '<div id="orchestra">orchestra (drag some instruments to the seats)</div>');
		this.obj = $( '#orchestra');

		this.preloadCanvas( callback);
	},
	// -------------------------------------------------------------------------
	onResize: function() {
		try {
			var winHeight = $( window).height();
			var winWidth = $( window).width();

			for( var seat = 0; seat < this.seats.length; ++seat) {
				$( '#imgSeat' + seat).css({
					bottom: parseInt( 100) + 'px',
					left: parseInt( 50 + seat * 100) + 'px',
					width: parseInt( 50) + 'px',
					height: parseInt( 50) + 'px',
				});

				var pos = $( this.seats[ seat].obj).position();
				this.seats[ seat].center = { x: pos.left + parseInt( this.seats[ seat].obj.outerWidth( true) / 2), y: pos.top + parseInt( this.seats[ seat].obj.outerHeight( true) / 2) };
			}
		} catch( e) {
			console.log( e);
		}
	},
	// -------------------------------------------------------------------------
	preloadCanvas: function( callback) {
		preload.begin();

		for( var seat = 0; seat < 7; ++seat) {
			preload.addCSS( '#imgSeat' + seat, 'position:absolute;z-index:10;width:0;height:0;');
			preload.addCSS( '#imgSeat' + seat + '.over', 'background-color:rgba(255,255,255,0.5);');
			preload.addImage( 'imgSeat' + seat, 'art/seat1.svg');

			this.seats[ seat] = {
				obj: $( '#imgSeat' + seat),
				instrument: null,
				volume: 1.0 - seat * .1
			};
		}

		preload.wait( function() {
			callback();
		});
	},
	// -------------------------------------------------------------------------
	wakeUp: function() {
		this.onResize();

		for( var seat = 0; seat < this.seats.length; ++seat) {
			$( '#imgSeat' + seat).removeClass( 'hidden');
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
