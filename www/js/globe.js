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

			this.onResizeInstrument();
		} catch( e) {
			console.log( e);
		}
	},
	// -------------------------------------------------------------------------
	onResizeInstrument: function() {
		try {
			if( typeof this.orchestra === 'undefined') {
				return;
			}
			if( this.orchestra.seats.length == 0) {
				return;
			}

			var winHeight = $( window).height();
			var winWidth = $( window).width();

			var size = winWidth / (this.orchestra.seats.length + 1);

			for( var i = 0; i < this.slotMenuEarth.length; ++i) {
				this.slotMenuEarth[i].obj.css({
					width: parseInt( size) + 'px',
					height: parseInt( size) + 'px',
				});
			}
			for( var i = 0; i < this.slotMenuAnimal.length; ++i) {
				this.slotMenuAnimal[i].obj.css({
					width: parseInt( size) + 'px',
					height: parseInt( size) + 'px',
				});
			}

			this.sortMenuInstrument();

			for( var seat = 0; seat < this.orchestra.seats.length; ++seat) {
				var instrument = this.orchestra.seats[ seat].instrument;
				if( null != instrument) {
					instrument.obj.css({
						width: parseInt( size) + 'px',
						height: parseInt( size) + 'px',
					});
					instrument.moveTo( this.orchestra.seats[ seat].center);
				}
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
		this.wakeUpInstrument();

		this.canvas.wakeUp();
		this.orchestra.wakeUp();
	},
	// -------------------------------------------------------------------------
	preloadResources: function() {
		var that = this;

		this.canvas = new Canvas( function() {
			that.sound = new Sound;

			that.orchestra = new Orchestra( that, function() {
				that.cabinet = new Cabinet( function() {
					that.preloadInstrument( function() {
						that.wakeUp();
					});
				});
			});
		});
	},
	// -------------------------------------------------------------------------
	preloadInstrument: function( callback) {
		preload.begin();

		this.slotMenuEarth = [];
		this.slotMenuAnimal = [];

		preload.addCSS( '.instrumentImg', 'position:absolute;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:51;');

		for( var i = 0; i < this.cabinet.instruments.length; ++i) {
			if( 'animal' == this.cabinet.instruments[i].group) {
				this.slotMenuAnimal.push( new Instrument( this.cabinet.instruments[i].name, this.cabinet.instruments[i].group, this.orchestra));
			} else {
				this.slotMenuEarth.push( new Instrument( this.cabinet.instruments[i].name, this.cabinet.instruments[i].group, this.orchestra));
			}
		}

		preload.wait( function() {
			callback();
		});
	},
	// -------------------------------------------------------------------------
	wakeUpInstrument: function() {
		for( var i = 0; i < this.slotMenuEarth.length; ++i) {
			this.slotMenuEarth[i].obj.removeClass( 'hidden userStatic').addClass( 'instrumentImg');
		}
		for( var i = 0; i < this.slotMenuAnimal.length; ++i) {
			this.slotMenuAnimal[i].obj.removeClass( 'hidden userStatic').addClass( 'instrumentImg');
		}

		this.sortMenuInstrument();
	},
	// -------------------------------------------------------------------------
	sortMenuInstrument: function() {
		var winHeight = $( window).height();
		var winWidth = $( window).width();

		var size = winWidth / (this.orchestra.seats.length + 1);

		for( var i = 0; i < this.slotMenuEarth.length; ++i) {
			this.slotMenuEarth[i].moveTo({ x: parseInt( size * (i * 1.15 + 1)), y: 250});
		}
		for( var i = 0; i < this.slotMenuAnimal.length; ++i) {
			this.slotMenuAnimal[i].moveTo({ x: parseInt( size * (i * 1.15 + 1)), y: 550});
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

		if( 'animal' == instrument.group) {
			this.slotMenuAnimal.push( instrument);
		} else {
			this.slotMenuEarth.push( instrument);
		}
		this.sortMenuInstrument();
	},
	// -------------------------------------------------------------------------
	moveInstrumentToSeat: function( instrument, seat) {
		var menuEarthPos = 0;
		var menuAnimalPos = 0;
		for( ; menuEarthPos < this.slotMenuEarth.length; ++menuEarthPos) {
			if( this.slotMenuEarth[menuEarthPos].name == instrument.name) {
				break;
			}
		}
		for( ; menuAnimalPos < this.slotMenuAnimal.length; ++menuAnimalPos) {
			if( this.slotMenuAnimal[menuAnimalPos].name == instrument.name) {
				break;
			}
		}
		var seatIsTaken = (null != this.orchestra.seats[ seat].instrument);
		var moveSeatToSeat = (-1 != instrument.seat);
		var moveEarthToSeat = (menuEarthPos < this.slotMenuEarth.length);
		var moveAnimalToSeat = (menuAnimalPos < this.slotMenuAnimal.length);

		if( moveEarthToSeat && moveSeatToSeat) {
			// should be impossible
			instrument.moveToDragStart();
			return;
		} else if( moveAnimalToSeat && moveSeatToSeat) {
			// should be impossible
			instrument.moveToDragStart();
			return;
		} else if( moveEarthToSeat && seatIsTaken) {
			this.moveInstrumentToGlobe( this.orchestra.seats[ seat].instrument);
			this.slotMenuEarth.splice( menuEarthPos, 1);
			this.sortMenuInstrument();
			this.sound.play( instrument.name);
		} else if( moveAnimalToSeat && seatIsTaken) {
			this.moveInstrumentToGlobe( this.orchestra.seats[ seat].instrument);
			this.slotMenuAnimal.splice( menuAnimalPos, 1);
			this.sortMenuInstrument();
			this.sound.play( instrument.name);
		} else if( moveEarthToSeat) {
			this.slotMenuEarth.splice( menuEarthPos, 1);
			this.sortMenuInstrument();
			this.sound.play( instrument.name);
		} else if( moveAnimalToSeat) {
			this.slotMenuAnimal.splice( menuAnimalPos, 1);
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
