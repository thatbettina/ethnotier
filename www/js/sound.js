// -----------------------------------------------------------------------------
/* sound.js */
// -----------------------------------------------------------------------------

function Sound() {
	this.create();
}
Sound.prototype = {
	// -------------------------------------------------------------------------
	create: function() {
		var channelCount = 10;
		this.channels = new Array();

		for( var i = 0; i < channelCount; ++i) {
			this.channels[ i] = new Array();
			this.channels[ i][ 'channel'] = new Audio();
			this.channels[ i][ 'finished'] = -1;
		}
	},
	// -------------------------------------------------------------------------
	play: function( source) {
		var current = new Date();
		for( var i = 0; i < this.channels.length; ++i) {
			if( this.channels[ i][ 'finished'] < current.getTime()) {
				this.channels[ i][ 'finished'] = current.getTime() + document.getElementById( 'audio' + source).duration * 1000;
				this.channels[ i][ 'channel'].src = document.getElementById( 'audio' + source).src;
				this.channels[ i][ 'channel'].load();
				this.channels[ i][ 'channel'].play();

				return;
			}
		}
	},
	// -------------------------------------------------------------------------
}

// -----------------------------------------------------------------------------
