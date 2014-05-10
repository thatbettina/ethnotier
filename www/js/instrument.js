// -----------------------------------------------------------------------------
/* instrument.js */
// -----------------------------------------------------------------------------

function Instrument( orchestra) {
	this.obj = $( '#instrument');
	this.orchestra = orchestra;

	if( 0 == this.obj.length) {
		this.create();
	}
}
Instrument.prototype = {
	// -------------------------------------------------------------------------
	create: function() {
		$( '#mapContainer').append( '<div id="instrument">instrument</div><audio id="GoldenEagle" src="http://species-id.net/o/media/e/e9/Aquila_chrysaetos_TSA-short.mp3" preload="auto"></audio>');
		this.obj = $( '#instrument');

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

		$( this.obj).css({ opacity: '0.8', position: 'absolute', left: this.draggingStart.left, top: this.draggingStart.top });
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
		$( this.obj).css({ opacity: '1'});

		this.orchestra.endCollisionSeat( this);
	},
	// -------------------------------------------------------------------------
	moveTo: function( centerPos) {
		var x = centerPos.x - parseInt( this.obj.outerWidth( true) / 2);
		var y = centerPos.y - parseInt( this.obj.outerHeight( true) / 2);

		$( this.obj).css({ left: x, top: y});
	},
	// -------------------------------------------------------------------------
}

// -----------------------------------------------------------------------------
