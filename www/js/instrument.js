// -----------------------------------------------------------------------------
/* instrument.js */
// -----------------------------------------------------------------------------

function Instrument() {
	this.obj = $( '#instrument');

	if( 0 == this.obj.length) {
		this.create();
	}
}
Instrument.prototype = {
	// -------------------------------------------------------------------------
	create: function() {
		$( '#mapContainer').append( '<div id="instrument" draggable="true">instrument</div><audio id="GoldenEagle" src="http://species-id.net/o/media/e/e9/Aquila_chrysaetos_TSA-short.mp3" preload="auto"></audio>');
		this.obj = $( '#instrument');

		this.obj.on( 'dragstart', function( event) {
			event.originalEvent.dataTransfer.setData( 'text/html', 'GoldenEagle');
			this.style.opacity = '0.6';
//			event.dataTransfer.effectAllowed = 'move';
		});

		// to do: remove drag events and switch to touch and mouse events
		// (iPad have no drag events)

		this.obj.on( 'touchstart', function( event) {
			event.preventDefault();
			this.style.opacity = '0.6';
		});
		this.obj.on( 'touchmove', function( event) {
			event.preventDefault();
			var touch = event.originalEvent.touches[0];
//			alert( touch.pageX + " - " + touch.pageY);
		});
		this.obj.on( 'touchend', function( event) {
			if( event.stopPropagation) {
				event.stopPropagation();
			}
			this.style.opacity = '1';
			var sound = new Sound;
			sound.play( "GoldenEagle");
		});
	},
	// -------------------------------------------------------------------------
}

// -----------------------------------------------------------------------------
