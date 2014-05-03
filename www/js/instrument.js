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
		$( '#mapContainer').append( '<div id="instrument" draggable="true">instrument</div>');
		this.obj = $( '#instrument');

		this.obj.on( 'dragstart', function( event) {
			event.originalEvent.dataTransfer.setData( 'text/html', 'http://species-id.net/o/media/e/e9/Aquila_chrysaetos_TSA-short.mp3');
			this.style.opacity = '0.4';
//			event.dataTransfer.effectAllowed = 'move';
		});
	},
	// -------------------------------------------------------------------------
}

// -----------------------------------------------------------------------------
