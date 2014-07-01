// -----------------------------------------------------------------------------
/* globe.js */
// -----------------------------------------------------------------------------

function Globe() {
	this.obj = $( '.globe');
	this.mode = '';
	this.canvas = null;
	this.angle = 275; // center to Germany
	this.globe = { width: 0, height: 0};

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
			var centerX = 0, centerY = 0, imgWidthHeight = 0;

			if( 'loading' == this.mode) {
				centerX = winWidth / 2;
				centerY = winHeight / 2;
				imgWidthHeight = minimum / 2;
			} else if( 'basis' == this.mode) {
				centerX = winWidth / 2;
				centerY = winHeight / 5;
				imgWidthHeight = minimum / 3;
			}

			var kids = $( '#carousel').children();
			var slices = kids.length;

			this.globe.height = imgWidthHeight * 1.1;
			this.globe.width = parseInt( this.globe.height / slices * Math.PI / 2*2);

			$( '.globe').css({
				top: parseInt( centerY - imgWidthHeight / 2) + 'px',
				left: parseInt( centerX - imgWidthHeight / 2) + 'px',
				width: parseInt( imgWidthHeight) + 'px',
				height: parseInt( imgWidthHeight) + 'px',
				borderRadius: parseInt( imgWidthHeight / 2) + 'px',
			});

			$( '#carousel').css({
				transform: 'rotateY(0deg) translateZ(' + (-imgWidthHeight/4) + 'px)',
			});

			$( '#carousel div').css({
				width: (this.globe.width + 2) + 'px',
				height: this.globe.height + 'px',
				backgroundSize: (this.globe.width/2 * slices) + 'px ' + this.globe.height + 'px',
			});
			var posX = 0;
			for( var i = 0; i < slices; ++i) {
				if( i < (slices / 2)) {
					posX = (i * this.globe.width);
				} else {
					posX = ((i - slices / 2) * this.globe.width);
				}
				kids[i].style[ 'backgroundPosition'] = '-' + posX + 'px 0px';
			}

			this.drawGlobe( this.angle);

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
	drawGlobe: function( angle) {
		var kids = $( '#carousel').children();
		var transZ = Math.round(( this.globe.width / 2 ) / Math.tan( Math.PI / kids.length));

		for( var i = 0; i < kids.length; ++i) {
			var rotY = parseInt( angle + i * (360 / kids.length));
			kids[i].style[ '-webkit-transform'] = 'rotateY(' + rotY + 'deg) translateZ(' + transZ + 'px)';
			kids[i].style[ '-moz-transform'] = 'rotateY(' + rotY + 'deg) translateZ(' + transZ + 'px)';
			kids[i].style[ 'transform'] = 'rotateY(' + rotY + 'deg) translateZ(' + transZ + 'px)';
			kids[i].style[ 'top'] = (($( '#carousel').height() - this.globe.height) / 2) + 'px';
			kids[i].style[ 'left'] = (($( '#carousel').width() - this.globe.width) / 2) + 'px';
		}
	},
	// -------------------------------------------------------------------------
	preloadGlobe: function() {
		var obj = this;

		var slices = 14;
		var perspective = 100;

		obj.globe.height = 500;
		obj.globe.width = parseInt( obj.globe.height / slices * Math.PI / 2);

		preload.begin();
		preload.addCSS( '.globe', 'position:absolute;z-index:50;width:0;height:0;border:0;-webkit-perspective:' + perspective + 'px;-moz-perspective:' + perspective + 'px;perspective:' + perspective + 'px;background-color:#346d9c;overflow:hidden;');
		preload.addCSS( '#imgEarthMap', 'display:none;');
		preload.addCSS( '#imgEarthOverlay', 'display:none;');
		preload.addImage( 'imgEarthMap', 'art/earthmap.svg');
		preload.addImage( 'imgEarthOverlay', 'art/earthoverlay.svg');
		preload.wait( function() {
			// http://desandro.github.io/3dtransforms/docs/carousel.html
			var str = '<section class="globe hidden"><div id="carousel">';
			for( var i = 0; i < slices; ++i) {
				str += '<div></div>';
			}
			str += '</div><img src="art/earthoverlay.svg" id="carouseloverlay" class="userStatic"></section>';
			$( '#mainContainer').append( str);
			preload.addCSS( '#carousel', 'width:100%;height:100%;position:absolute;transform-style:preserve-3d;');
			preload.addCSS( '#carousel div', 'display:block;position:absolute;width:' + (obj.globe.width+1) + 'px;height:' + obj.globe.height + 'px;left:0;top:0;border:0;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;backface-visibility:hidden;background-image:url("art/earthmap.svg");background-repeat:no-repeat;');
			preload.addCSS( '#carouseloverlay', 'width:100%;height:100%;position:absolute;z-index:52;');
			obj.drawGlobe( obj.angle);

			obj.obj = $( '.globe');
			obj.showGlobe( 'loading');
			obj.obj.removeClass( 'hidden');

			obj.obj.removeClass( 'userStatic');
			obj.obj.on( 'selectstart', function() {
				return false;
			});
			obj.obj.on( 'touchstart mousedown', function( event) {
				event.preventDefault();

				if(( typeof event.originalEvent.touches !== 'undefined') && (event.originalEvent.touches.length > 0)) {
					event.pageX = event.originalEvent.touches[0].pageX;
					event.pageY = event.originalEvent.touches[0].pageY;
				}

				obj.dragMousePos = { x: event.pageX, y: event.pageY };
				obj.dragMouseDiff = { x: 0, y: 0 };

				$( document).on( 'touchmove mousemove', eventDragMoveEvent);
				$( document).on( 'touchend mouseup mouseleave', eventDragEndFunc);

				obj.dragStartFunc.call( obj, event);

				function eventDragMoveEvent( event)
				{
					event.preventDefault();

					if(( typeof event.originalEvent.touches !== 'undefined') && (event.originalEvent.touches.length > 0)) {
						event.pageX = event.originalEvent.touches[0].pageX;
						event.pageY = event.originalEvent.touches[0].pageY;
					}

					obj.dragMouseDiff.x = event.pageX - obj.dragMousePos.x;
					obj.dragMouseDiff.y = event.pageY - obj.dragMousePos.y;

					obj.dragMoveFunc.call( obj, event);
				}

				function eventDragEndFunc( event)
				{
					event.stopPropagation();

					$( document).off( 'touchmove mousemove', eventDragMoveEvent);
					$( document).off( 'touchend mouseup mouseleave', eventDragEndFunc);

					if(( typeof event.originalEvent.touches !== 'undefined') && (event.originalEvent.touches.length > 0)) {
						event.pageX = event.originalEvent.touches[0].pageX;
						event.pageY = event.originalEvent.touches[0].pageY;
					}

					obj.dragEndFunc.call( obj, event);
				}
			});

			obj.preloadResources();
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
			this.slotMenu.push( new Instrument( this.cabinet.instruments[i].name, this.cabinet.instruments[i].group, this.orchestra));
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
	dragStartFunc: function( event) {
//		this.draggingStart = $( this.obj).position();

//		$( this.obj).addClass( 'drag');
	},
	// -------------------------------------------------------------------------
	dragMoveFunc: function( event) {
		var winWidth = $( window).width();
		var plusAngle = 360 * this.dragMouseDiff.x / winWidth;

		this.drawGlobe( this.angle + plusAngle);
	},
	// -------------------------------------------------------------------------
	dragEndFunc: function( event) {
		var winWidth = $( window).width();
		var plusAngle = 360 * this.dragMouseDiff.x / winWidth;

		this.angle += plusAngle;
		if( this.angle >= 360) {
			this.angle -= 360;
		}
		if( this.angle < 0) {
			this.angle += 360;
		}

//		$( this.obj).removeClass( 'drag');
	},
	// -------------------------------------------------------------------------
}

// -----------------------------------------------------------------------------
