// -----------------------------------------------------------------------------
/* canvas.js */
// -----------------------------------------------------------------------------

function Canvas( callback) {
	this.create( callback);
}
Canvas.prototype = {
	// -------------------------------------------------------------------------
	create: function( callback) {
		this.preloadCanvas( callback);
	},
	// -------------------------------------------------------------------------
	onResize: function() {
		try {
			var winHeight = $( window).height();
			var winWidth = $( window).width();
			var centerX = winWidth / 2;
			var centerY = winHeight / 2;
			var imgWidth = 2560;
			var imgHeight = 1920;

			var factorX = winWidth / imgWidth;
			var factorY = winHeight / imgHeight;
			var factor = factorX > factorY ? factorX : factorY;
			var shift = factorX > factorY ? 0 : 750 * (factorX - factorY);

			imgWidth *= factor;
			imgHeight *= factor;

			$( '#imgBackground').css({
				top: parseInt( centerY - imgHeight / 2) + 'px',
				left: parseInt( centerX - imgWidth / 2) + 'px',
				width: parseInt( imgWidth) + 'px',
				height: parseInt( imgHeight) + 'px',
			});
			$( '#imgTreeleft').css({
				top: parseInt( centerY - imgHeight / 2) + 'px',
				left: parseInt( centerX - imgWidth / 2 - shift) + 'px',
				width: parseInt( imgWidth) + 'px',
				height: parseInt( imgHeight) + 'px',
			});
			$( '#imgTreeright').css({
				top: parseInt( centerY - imgHeight / 2) + 'px',
				left: parseInt( centerX - imgWidth / 2 + shift) + 'px',
				width: parseInt( imgWidth) + 'px',
				height: parseInt( imgHeight) + 'px',
			});
			$( '#imgStringearth').css({
				top: '0px',
				left: parseInt( centerX - imgWidth / 2) + 'px',
				width: parseInt( imgWidth) + 'px',
				height: parseInt( imgHeight) + 'px',
			});

			var lightsLeft = centerX - imgWidth / 4 - shift;
			var lightsRight = centerX + imgWidth / 4 + shift;
			$( '#imgStringlights').css({
				top: '0px',
				left: '0px',
				width: parseInt( imgWidth) + 'px',
				height: parseInt( imgHeight) + 'px',
			});

//			var size = winWidth / (this.orchestra.seats.length + 1);
			var size = winWidth / (11 + 1);

			$( '#divGrassMiddle').css({
				height: parseInt( size * 1.2) + 'px',
			});
		} catch( e) {
			console.log( e);
		}
	},
	// -------------------------------------------------------------------------
	preloadCanvas: function( callback) {
		preload.begin();

		preload.addCSS( '#imgBackground', 'position:absolute;z-index:0;width:0;height:0;');
		preload.addImage( 'imgBackground', 'art/background.svg');

		preload.addCSS( '#imgGrassBack', 'position:absolute;z-index:2;width:100%;height:auto;bottom:0;left:0;');
		preload.addCSS( '#divGrassMiddle', 'position:absolute;z-index:3;width:100%;height:0;bottom:0;left:0;background-color:rgba(255,255,255,0.25);');
		preload.addCSS( '#imgGrassTop', 'position:absolute;z-index:52;width:100%;height:auto;bottom:0;left:0;');
		preload.addImage( 'imgGrassBack', 'art/grassback.svg');
		$( '<div id="divGrassMiddle" />').addClass( 'userStatic hidden').appendTo( '#mainContainer');
		preload.addImage( 'imgGrassTop', 'art/grasstop.svg');

		preload.addCSS( '#imgTreeleft', 'position:absolute;z-index:1;width:0;height:0;');
		preload.addCSS( '#imgTreeright', 'position:absolute;z-index:1;width:0;height:0;');
		preload.addCSS( '#imgStringearth', 'position:absolute;z-index:1;width:0;height:0;');
		preload.addCSS( '#imgStringlights', 'position:absolute;z-index:5;width:0;height:0;');
		preload.addImage( 'imgTreeleft', 'art/treeleft.svg');
		preload.addImage( 'imgTreeright', 'art/treeright.svg');
		preload.addImage( 'imgStringearth', 'art/stringearth.svg');
		preload.addImage( 'imgStringlights', 'art/stringlights.svg');

//		preload.addCSS( '#imgSeat1', 'position:absolute;z-index:4;width:0;height:0;');
//		preload.addImage( 'imgSeat1', 'art/seat1.svg');
//		preload.addCSS( '#imgSeat2', 'position:absolute;z-index:4;width:0;height:0;');
//		preload.addImage( 'imgSeat2', 'art/seat2.svg');
//		preload.addCSS( '#imgSeat3', 'position:absolute;z-index:4;width:0;height:0;');
//		preload.addImage( 'imgSeat3', 'art/seat3.svg');

		preload.wait( function() {
			callback();
		});
	},
	// -------------------------------------------------------------------------
	wakeUp: function() {
		this.onResize();

		$( '#imgBackground').removeClass( 'hidden');
		$( '#imgGrassBack').removeClass( 'hidden');
		$( '#divGrassMiddle').removeClass( 'hidden');
		$( '#imgGrassTop').removeClass( 'hidden');
		$( '#imgTreeleft').removeClass( 'hidden');
		$( '#imgTreeright').removeClass( 'hidden');
		$( '#imgStringearth').removeClass( 'hidden');
		$( '#imgStringlights').removeClass( 'hidden');
	},
	// -------------------------------------------------------------------------
}

// -----------------------------------------------------------------------------
