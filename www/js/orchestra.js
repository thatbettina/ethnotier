// -----------------------------------------------------------------------------
/* orchestra.js */
// -----------------------------------------------------------------------------

function Orchestra() {
	this.obj = $( '#orchestra');

	if( 0 == this.obj.length) {
		this.create();
	}
}
Orchestra.prototype = {
	// -------------------------------------------------------------------------
	create: function() {
		$( '#mapContainer').append( '<div id="orchestra">orchestra</div>');
		this.obj = $( '#orchestra');

		this.obj.on( 'dragenter', function( event) {
			this.classList.add( 'over');
		});
		this.obj.on( 'dragleave', function( event) {
			this.classList.remove( 'over');
		});
		this.obj.on( 'dragend', function( event) {
			this.classList.remove( 'over');
		});
		this.obj.on( 'dragover', function( event) {
			if( event.preventDefault) {
				event.preventDefault();
			}

//			event.dataTransfer.dropEffect = 'move';

			return false;
		});
		this.obj.on( 'drop', function( event) {
			if( event.stopPropagation) {
				event.stopPropagation();
			}
			this.classList.remove( 'over');
			this.innerHTML = event.originalEvent.dataTransfer.getData( 'text/html');
			return false;
		});
	},
	// -------------------------------------------------------------------------
}

// -----------------------------------------------------------------------------
