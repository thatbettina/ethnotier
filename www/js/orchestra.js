// -----------------------------------------------------------------------------
/* orchestra.js */
// -----------------------------------------------------------------------------

function Orchestra( sound) {
	this.obj = $( '#orchestra');
	this.sound = sound;

	if( 0 == this.obj.length) {
		this.create();
	}
}
Orchestra.prototype = {
	// -------------------------------------------------------------------------
	create: function() {
		$( '#mapContainer').append( '<div id="orchestra">orchestra (drag some instruments here!)</div>');
		this.obj = $( '#orchestra');
		var that = this;

//		this.obj.on( 'dragenter', function( event) {
//			this.classList.add( 'over');
//		});
//		this.obj.on( 'dragleave', function( event) {
//			this.classList.remove( 'over');
//		});
//		this.obj.on( 'dragend', function( event) {
//			this.classList.remove( 'over');
//		});
//		this.obj.on( 'drop', function( event) {
//			if( event.stopPropagation) {
//				event.stopPropagation();
//			}
//			this.classList.remove( 'over');
//			this.innerHTML = event.originalEvent.dataTransfer.getData( 'text/html');
//			that.sound.play( event.originalEvent.dataTransfer.getData( 'text/html'));
//			return false;
//		});
	},
	// -------------------------------------------------------------------------
}

// -----------------------------------------------------------------------------
