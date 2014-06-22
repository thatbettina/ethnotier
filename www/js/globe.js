// -----------------------------------------------------------------------------
/* globe.js */
// -----------------------------------------------------------------------------

function Globe() {
	this.obj = $( '#imgGlobe');
	this.mode = '';
	this.canvas = null;

	if( 0 == this.obj.length) {
		this.create();
	}
}
Globe.prototype = {
	// -------------------------------------------------------------------------
	create: function() {
		var that = this;

		this.preloadGlobe();

		$( window).resize( function() {
			that.onResize();
		});
	},
	// -------------------------------------------------------------------------
	onResize: function() {
		try {
			var winHeight = $( window).height();
			var winWidth = $( window).width();
			var minimum = winHeight < winWidth ? winHeight : winWidth;
			var centerX = 0, centerY = 0, imgWidth = 0, imgHeight = 0;

			if( 'loading' == this.mode) {
				centerX = winWidth / 2;
				centerY = winHeight / 2;
				imgWidth = minimum / 2;
				imgHeight = minimum / 2;
			} else if( 'basis' == this.mode) {
				centerX = winWidth / 2;
				centerY = winHeight / 5;
				imgWidth = minimum / 3;
				imgHeight = minimum / 3;
			}

			$( '#imgGlobe').css({
				top: parseInt( centerY - imgHeight / 2) + 'px',
				left: parseInt( centerX - imgWidth / 2) + 'px',
				width: parseInt( imgWidth) + 'px',
				height: parseInt( imgHeight) + 'px',
			});

			if( this.canvas != null) {
				this.canvas.onResize();
			}
			if( this.orchestra != null) {
				this.orchestra.onResize();
			}
		} catch( e) {
			console.log( e);
		}
	},
	// -------------------------------------------------------------------------
	preloadGlobe: function() {
		var that = this;

		preload.begin();
		preload.addCSS( '#imgGlobe', 'position:absolute;z-index:50;width:0;height:0;');
		preload.addImage( 'imgGlobe', 'art/earth.svg');
		preload.wait( function() {
			that.showGlobe( 'loading');
			$( '#imgGlobe').removeClass( 'hidden');

			// http://desandro.github.io/3dtransforms/docs/carousel.html
			var max = 9;

			var str = '<section class="container"><div id="carousel">';
			for( var i = 0; i < max; ++i) {
				str += '<figure>' + (i + 1) + '</figure>';
			}
			str += '</div></section>';
			$( '#mainContainer').append( str);
			preload.addCSS( '.container', 'width:210px;height:140px;position:relative;-webkit-perspective:1000px;-moz-perspective:1000px;perspective:1000px;z-index:1000;');
			preload.addCSS( '#carousel', 'width:100%;height:100%;position:absolute;transform-style:preserve-3d;');
			preload.addCSS( '#carousel figure', 'display:block;position:absolute;width:186px;height:116px;left:10px;top:10px;border:2px solid black;background-color:rgba(255,255,255,0.25)');
			for( var i = 0; i < max; ++i) {
				preload.addCSS( '#carousel figure:nth-child(' + (i + 1) + ')', '-webkit-transform:rotateY(' + parseInt(i*(360 / max)) + 'deg) translateZ(288px);-moz-transform:rotateY(' + parseInt(i*(360 / max)) + 'deg) translateZ(288px);transform:rotateY(' + parseInt(i*(360 / max)) + 'deg) translateZ(288px);');
			}

			that.preloadResources();
		});
	},
	// -------------------------------------------------------------------------
	showGlobe: function( mode) {
		this.mode = mode;
		this.onResize();
	},
	// -------------------------------------------------------------------------
	wakeUp: function() {
		this.showGlobe( 'basis');
		this.canvas.wakeUp();
		this.orchestra.wakeUp();
	},
	// -------------------------------------------------------------------------
	preloadResources: function() {
		var that = this;

		this.canvas = new Canvas( function() {
			that.sound = new Sound;

			that.orchestra = new Orchestra( that, function() {
				that.cabinet = new Cabinet();

				that.slotMenu = [];

				that.wakeUp();

				that.showMenuInstrument();
			});
		});
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
			this.slotMenu[i].moveTo({ x: 80 * i + 50, y: 250});
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
