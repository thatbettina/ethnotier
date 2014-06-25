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
//		{name:'toad',    src:'http://species-id.net/o/media/7/76/Bufo_calamita_TSA-medium.mp3'},
//		{name:'swift',   src:'http://species-id.net/o/media/b/ba/Apus_apus_TSA-medium.mp3'},
//		{name:'deer',    src:'http://species-id.net/o/media/3/33/Dama_dama_TSA-medium.mp3'},
//		{name:'eagle',   src:'http://species-id.net/o/media/e/e9/Aquila_chrysaetos_TSA-short.mp3'},
//		{name:'goose',   src:'http://species-id.net/o/media/b/bc/Branta_canadensis_TSA-medium.mp3'},
//		{name:'mallard', src:'http://species-id.net/o/media/b/b0/Anas_platyrhynchos_TSA-medium.mp3'},
//		{name:'owl',     src:'http://species-id.net/o/media/6/61/Bubo_bubo_TSA-medium.mp3'},
//		{name:'wolf',    src:'http://species-id.net/o/media/4/4f/Canis_lupus_TSA-medium.mp3'},
		{group:'animal', name:'toad',    src:'media/animalBufoCalamita.mp3'},
		{group:'animal', name:'swift',   src:'media/animalApusApus.mp3'},
		{group:'animal', name:'deer',    src:'media/animalDamaDama.mp3'},
		{group:'animal', name:'eagle',   src:'media/animalAquilaChrysaetos.mp3'},
		{group:'animal', name:'goose',   src:'media/animalBrantaCanadensis.mp3'},
		{group:'animal', name:'mallard', src:'media/animalAnasPlatyrhynchos.mp3'},
		{group:'animal', name:'owl',     src:'media/animalBuboBubo.mp3'},
		{group:'animal', name:'wolf',    src:'media/animalCanisLupus.mp3'},
		// source: CC BY https://commons.wikimedia.org/wiki/Category:Audiodateien_des_Ethnologischen_Museums
		// source: CC BY SA https://www.flickr.com/photos/121003427@N03/
		// metadata: CC BY https://offenedaten.de/de/dataset/metadaten-vii
		// metadata: CC BY https://offenedaten.de/de/dataset/metadaten-ic
		// I C   mostly Asia
		// VII a mostly Europe
		// VII b Africa, Asia, Europe
		// VII c mostly Asia
		// VII d mostly Australia
		// VII e mostly South America
		// VII f mostly Africa
		// VII g mostly North America
		// VII Nls mostly unknown
//		{name:'I_C_1479',    src:'https://upload.wikimedia.org/wikipedia/commons/7/7b/I_C_1479_g_x.ogg'},
//		{name:'I_C_38635',   src:'https://upload.wikimedia.org/wikipedia/commons/d/da/I_C_38635_b_x.ogg'},
//		{name:'III_C_30616', src:'https://upload.wikimedia.org/wikipedia/commons/3/3c/III_C_30616_x.ogg'},
//		{name:'VII_c_823',   src:'https://upload.wikimedia.org/wikipedia/commons/3/33/VII_c_823_-B_x.ogg'},
		{group:'', name:'I_C_1479',    src:'media/instrumentI1479.mp3'},
		{group:'', name:'I_C_38635',   src:'media/instrumentI38635.mp3'},
		{group:'', name:'III_C_30616', src:'media/instrumentIII30616.mp3'},
		{group:'', name:'VII_c_823',   src:'media/instrumentVII823.mp3'},

/* good sounds
Asia
I C 4652 a+b x.mp3
I C 7743 x.mp3
I C 30284 a x.mp3
VII 173 e x.mp3
VII c 202 x.mp3
VII c 345 a+b x.mp3
VII c 396 x.mp3
VII c 423 a x.mp3
VII c 632 x.mp3
VII c 762 x.mp3
VII c 794 a+b x.mp3
VII c 799 x.mp3
VII c 823 -A x.mp3
VII c 852 -F x.mp3
VII c 852 -K x.mp3
VII c 852 -LL x.mp3
VII c 853 -D x.mp3

Europe
VII a 14 x.mp3
VII a 26 x.mp3
VII a 70 x.mp3
VII b 4 x.mp3
VII b 8 x.mp3

Africa
VII f 28 x.mp3
VII f 49 x.mp3
VII f 54 x.mp3
VII f 83 x.mp3
VII f 137 x.mp3

South America
VII e 15 x.mp3
VII e 35 x.mp3
VII e 37 x.mp3
VII e 72 x.mp3
VII e 206 x.mp3
vii-e-22-a-x.mp3
vii-nls-1077-b-x.mp3

North America
tbd.

Australia
tbd.

Unknown
III B 63 -A x.mp3
III B 756 -A x.mp3
III B 2070 -A x.mp3
III B 2071 -A x.mp3
III C 35493 -A x.mp3
III D 387 -A x.mp3
III D 4683 -A x.mp3
*/
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
