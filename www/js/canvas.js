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
			$( '#imgFlagleft').css({
				top: parseInt( centerY - imgHeight / 2) + 'px',
				left: parseInt( centerX - imgWidth / 2 - shift) + 'px',
				width: parseInt( imgWidth) + 'px',
				height: parseInt( imgHeight) + 'px',
			});
			$( '#imgFlagright').css({
				top: parseInt( centerY - imgHeight / 2) + 'px',
				left: parseInt( centerX - imgWidth / 2 + shift) + 'px',
				width: parseInt( imgWidth) + 'px',
				height: parseInt( imgHeight) + 'px',
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

		preload.addCSS( '#imgTreeleft', 'position:absolute;z-index:1;width:0;height:0;');
		preload.addCSS( '#imgTreeright', 'position:absolute;z-index:1;width:0;height:0;');
		preload.addImage( 'imgTreeleft', 'art/treeleft.svg');
		preload.addImage( 'imgTreeright', 'art/treeright.svg');

		preload.addCSS( '#imgFlagleft', 'position:absolute;z-index:3;width:0;height:0;');
		preload.addCSS( '#imgFlagright', 'position:absolute;z-index:3;width:0;height:0;');
		preload.addImage( 'imgFlagleft', 'art/flagleft.svg');
		preload.addImage( 'imgFlagright', 'art/flagright.svg');

		preload.wait( function() {
			callback();
		});
	},
	// -------------------------------------------------------------------------
	wakeUp: function() {
		this.onResize();

		$( '#imgBackground').removeClass( 'hidden');
		$( '#imgTreeleft').removeClass( 'hidden');
		$( '#imgTreeright').removeClass( 'hidden');
		$( '#imgFlagleft').removeClass( 'hidden');
		$( '#imgFlagright').removeClass( 'hidden');
	},
	// -------------------------------------------------------------------------
}

// -----------------------------------------------------------------------------
