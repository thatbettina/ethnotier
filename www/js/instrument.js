// -----------------------------------------------------------------------------
/* instrument.js */
// -----------------------------------------------------------------------------

function Instrument( name, group, orchestra) {
	this.name = name;
	this.group = group;
	this.obj = $( '#instrument' + this.name);
	this.orchestra = orchestra;
	this.seat = -1;

	if( 0 == this.obj.length) {
		this.create();
	}
}
Instrument.prototype = {
	// -------------------------------------------------------------------------
	create: function() {
		if( 'animal' == this.group) {
			preload.addImage( 'instrument' + this.name, 'art/animal' + this.name + '.svg');
		} else {
			preload.addImage( 'instrument' + this.name, 'art/animalvoid.svg');
		}
		this.obj = $( '#instrument' + this.name);

		var obj = this;

		this.obj.on( 'selectstart', function() {
			return false;
		});
		this.obj.on( 'touchstart mousedown', function( event) {
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
	},
	// -------------------------------------------------------------------------
	dragStartFunc: function( event) {
		this.draggingStart = $( this.obj).position();

		$( this.obj).addClass( 'drag');
	},
	// -------------------------------------------------------------------------
	dragMoveFunc: function( event) {
		var posX = this.draggingStart.left + this.dragMouseDiff.x;
		var posY = this.draggingStart.top + this.dragMouseDiff.y;

		$( this.obj).css({ left: posX, top: posY});

		posX += parseInt( this.obj.outerWidth( true) / 2);
		posY += parseInt( this.obj.outerHeight( true) / 2);

		this.orchestra.showCollisionSeat({ x: posX, y: posY });
	},
	// -------------------------------------------------------------------------
	dragEndFunc: function( event) {
		$( this.obj).removeClass( 'drag');

		this.orchestra.endCollisionSeat( this);
	},
	// -------------------------------------------------------------------------
	moveTo: function( centerPos) {
		var x = centerPos.x - parseInt( this.obj.outerWidth( true) / 2);
		var y = centerPos.y - parseInt( this.obj.outerHeight( true) / 2);

		$( this.obj).css({ left: x, top: y});
	},
	// -------------------------------------------------------------------------
	moveToDragStart: function() {
		var x = this.draggingStart.left;
		var y = this.draggingStart.top;

		$( this.obj).css({ left: x, top: y});
	},
	// -------------------------------------------------------------------------
}

// -----------------------------------------------------------------------------
