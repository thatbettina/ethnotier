// -----------------------------------------------------------------------------
/* cabinet.js */
// -----------------------------------------------------------------------------

var gCabinetCount = 0;

function Cabinet() {
	if( 0 == gCabinetCount) {
		this.create();
	}
	++gCabinetCount;
}
Cabinet.prototype = {
	// -------------------------------------------------------------------------
	create: function() {
		this.initInstruments();
		this.preloadInstruments();
	},
	// -------------------------------------------------------------------------
	initInstruments: function() {
		this.instruments = [
		// source: http://offene-naturfuehrer.de/web/Open_Source_Tierstimmen
		{name:'deer',    src:'http://species-id.net/o/media/3/33/Dama_dama_TSA-medium.mp3'},
		{name:'eagle',   src:'http://species-id.net/o/media/e/e9/Aquila_chrysaetos_TSA-short.mp3'},
		{name:'goose',   src:'http://species-id.net/o/media/b/bc/Branta_canadensis_TSA-medium.mp3'},
		{name:'mallard', src:'http://species-id.net/o/media/b/b0/Anas_platyrhynchos_TSA-medium.mp3'},
		{name:'owl',     src:'http://species-id.net/o/media/6/61/Bubo_bubo_TSA-medium.mp3'},
		{name:'swift',   src:'http://species-id.net/o/media/b/ba/Apus_apus_TSA-medium.mp3'},
		{name:'toad',    src:'http://species-id.net/o/media/7/76/Bufo_calamita_TSA-medium.mp3'},
		{name:'wolf',    src:'http://species-id.net/o/media/4/4f/Canis_lupus_TSA-medium.mp3'},
		];
	},
	// -------------------------------------------------------------------------
	preloadInstruments: function() {
		for( var i = 0; i < this.instruments.length; ++i) {
			$( '#mainContainer').append( '<audio id="audio' + this.instruments[i].name + '" src="' + this.instruments[i].src + '" preload="auto"></audio>');
		}
	},
	// -------------------------------------------------------------------------
}

// -----------------------------------------------------------------------------
