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
		// source: CC BY-SA http://offene-naturfuehrer.de/web/Open_Source_Tierstimmen
		{name:'toad',    src:'http://species-id.net/o/media/7/76/Bufo_calamita_TSA-medium.mp3'},
		{name:'swift',   src:'http://species-id.net/o/media/b/ba/Apus_apus_TSA-medium.mp3'},
		{name:'deer',    src:'http://species-id.net/o/media/3/33/Dama_dama_TSA-medium.mp3'},
		{name:'eagle',   src:'http://species-id.net/o/media/e/e9/Aquila_chrysaetos_TSA-short.mp3'},
		{name:'goose',   src:'http://species-id.net/o/media/b/bc/Branta_canadensis_TSA-medium.mp3'},
		{name:'mallard', src:'http://species-id.net/o/media/b/b0/Anas_platyrhynchos_TSA-medium.mp3'},
		{name:'owl',     src:'http://species-id.net/o/media/6/61/Bubo_bubo_TSA-medium.mp3'},
		{name:'wolf',    src:'http://species-id.net/o/media/4/4f/Canis_lupus_TSA-medium.mp3'},
/*		{name:'toad',    src:'media/Bufo_calamita_TSA-medium.mp3'},
		{name:'swift',   src:'media/Apus_apus_TSA-medium.mp3'},
		{name:'deer',    src:'media/Dama_dama_TSA-medium.mp3'},
		{name:'eagle',   src:'media/Aquila_chrysaetos_TSA-short.mp3'},
		{name:'goose',   src:'media/Branta_canadensis_TSA-medium.mp3'},
		{name:'mallard', src:'media/Anas_platyrhynchos_TSA-medium.mp3'},
		{name:'owl',     src:'media/Bubo_bubo_TSA-medium.mp3'},
		{name:'wolf',    src:'media/Canis_lupus_TSA-medium.mp3'},*/
		// source: CC BY https://commons.wikimedia.org/wiki/Category:Audiodateien_des_Ethnologischen_Museums
		{name:'I_C_1479',    src:'https://upload.wikimedia.org/wikipedia/commons/7/7b/I_C_1479_g_x.ogg'},
		{name:'I_C_38635',   src:'https://upload.wikimedia.org/wikipedia/commons/d/da/I_C_38635_b_x.ogg'},
		{name:'III_C_30616', src:'https://upload.wikimedia.org/wikipedia/commons/3/3c/III_C_30616_x.ogg'},
		{name:'VII_c_823',   src:'https://upload.wikimedia.org/wikipedia/commons/3/33/VII_c_823_-B_x.ogg'},
/*		{name:'I_C_1479',    src:'media/I_C_1479_g_x.ogg'},
		{name:'I_C_38635',   src:'media/I_C_38635_b_x.ogg'},
		{name:'III_C_30616', src:'media/III_C_30616_x.ogg'},
		{name:'VII_c_823',   src:'media/VII_c_823_-B_x.ogg'},*/
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
