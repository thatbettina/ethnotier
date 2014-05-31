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

			imgWidth *= factor;
			imgHeight *= factor;

			$( '#imgBackground').css({
				top: parseInt( centerY - imgHeight / 2) + 'px',
				left: parseInt( centerX - imgWidth / 2) + 'px',
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

		preload.wait( function() {
			callback();
		});
	},
	// -------------------------------------------------------------------------
	wakeUp: function() {
		this.onResize();
		$( '#imgBackground').removeClass( 'hidden');
	},
	// -------------------------------------------------------------------------
}

// -----------------------------------------------------------------------------
