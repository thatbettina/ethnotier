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
		$( '#mainContainer').append( '<div id="orchestra"></div>');
		this.obj = $( '#orchestra');

		this.preloadCanvas( callback);
	},
	// -------------------------------------------------------------------------
	onResize: function() {
		try {
			if( this.seats.length == 0) {
				return;
			}

			var winHeight = $( window).height();
			var winWidth = $( window).width();

//			var size = winWidth / (this.seats.length + 1);
			var size = winWidth / (11 + 1);

			for( var seat = 0; seat < this.seats.length; ++seat) {
				var x = 0;
				var y = 0;
				if( seat < 5) {
					x = ((winWidth - size * 5.5 * 1.2) / 2) + size * (seat + 0.5) * 1.2;
					y = winHeight - size * 3.3;
				} else {
					x = ((winWidth - size * 6.5 * 1.2) / 2) + size * (seat - 5 + 0.5) * 1.2;
					y = winHeight - size * 2.3;
				}
				$( '#imgSeat' + seat).css({
					top: parseInt( y) + 'px',
					left: parseInt( x) + 'px',
					width: parseInt( size) + 'px',
					height: parseInt( size * 120 / 150) + 'px',
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

		for( var seat = 0; seat < 11; ++seat) {
			preload.addCSS( '#imgSeat' + seat, 'position:absolute;z-index:10;width:0;height:0;');
//			preload.addCSS( '#imgSeat' + seat + '.over', 'background-color:rgba(255,255,255,0.5);');
			preload.addImage( 'imgSeat' + seat, 'art/seat' + (1+Math.floor(Math.random()*3)) + '.svg');

			this.seats[ seat] = {
				obj: $( '#imgSeat' + seat),
				instrument: null,
				volume: 1.0 - seat * .05
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
