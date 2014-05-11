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

		$( '#mapContainer').append( '<audio id="GoldenEagle" src="http://species-id.net/o/media/e/e9/Aquila_chrysaetos_TSA-short.mp3" preload="auto"></audio>');
		$( '#mapContainer').append( '<audio id="Wolf" src="http://species-id.net/o/media/4/4f/Canis_lupus_TSA-medium.mp3" preload="auto"></audio>');
		$( '#mapContainer').append( '<audio id="FallowDeer" src="http://species-id.net/o/media/3/33/Dama_dama_TSA-medium.mp3" preload="auto"></audio>');
	},
	// -------------------------------------------------------------------------
	play: function( source) {
		var current = new Date();
		for( var i = 0; i < this.channels.length; ++i) {
			if( this.channels[ i][ 'finished'] < current.getTime()) {
				this.channels[ i][ 'finished'] = current.getTime() + document.getElementById( source).duration * 1000;
				this.channels[ i][ 'channel'].src = document.getElementById( source).src;
				this.channels[ i][ 'channel'].load();
				this.channels[ i][ 'channel'].play();

				return;
			}
		}
	},
	// -------------------------------------------------------------------------
}

// -----------------------------------------------------------------------------
