// -----------------------------------------------------------------------------
/* cabinet.js */
// -----------------------------------------------------------------------------

var gCabinetCount = 0;

function Cabinet( callback) {
	if( 0 == gCabinetCount) {
		this.create( callback);
	}
	++gCabinetCount;
}
Cabinet.prototype = {
	// -------------------------------------------------------------------------
	create: function( callback) {
		this.initInstruments();

		this.preloadCabinet( callback);
	},
	// -------------------------------------------------------------------------
	initInstruments: function() {
		this.instruments = [

// group:               animal
// source:              http://offene-naturfuehrer.de/web/Open_Source_Tierstimmen
// copyright owner:     Museum für Naturkunde
// copyright statement: Copyright Tierstimmenarchiv of the Museum für Naturkunde 2013
// license statement:   Creative Commons: Author Attribution Required, Share-Alike (CC BY-SA 3.0)

		{group:'animal', name:'toad',    src:'media/animalBufoCalamita.mp3'     }, // http://species-id.net/openmedia/File:Bufo_calamita_TSA-medium.mp3      Creators: Conrads
		{group:'animal', name:'wolf',    src:'media/animalCanisLupus.mp3'       }, // http://species-id.net/openmedia/File:Canis_lupus_TSA-medium.mp3        Creators: Frommolt
		{group:'animal', name:'mallard', src:'media/animalAnasPlatyrhynchos.mp3'}, // http://species-id.net/openmedia/File:Anas_platyrhynchos_TSA-medium.mp3 Creators: Tembrock
		{group:'animal', name:'swift',   src:'media/animalApusApus.mp3'         }, // http://species-id.net/openmedia/File:Apus_apus_TSA-medium.mp3          Creators: Tembrock
		{group:'animal', name:'eagle',   src:'media/animalAquilaChrysaetos.mp3' }, // http://species-id.net/openmedia/File:Aquila_chrysaetos_TSA-medium.mp3  Creators: Tembrock
		{group:'animal', name:'goose',   src:'media/animalBrantaCanadensis.mp3' }, // http://species-id.net/openmedia/File:Branta_canadensis_TSA-medium.mp3  Creators: Frommolt
		{group:'animal', name:'deer',    src:'media/animalDamaDama.mp3'         }, // http://species-id.net/openmedia/File:Dama_dama_TSA-medium.mp3          Creators: Tembrock
		{group:'animal', name:'owl',     src:'media/animalBuboBubo.mp3'         }, // http://species-id.net/openmedia/File:Bubo_bubo_TSA-medium.mp3          Creators: Tembrock

// group:               instruments
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
	preloadCabinet: function( callback) {
		preload.begin();

		for( var i = 0; i < this.instruments.length; ++i) {
			preload.addMedia( 'audio' + this.instruments[i].name, this.instruments[i].src);
		}

		preload.wait( function() {
			callback();
		});
	},
	// -------------------------------------------------------------------------
}

// -----------------------------------------------------------------------------
