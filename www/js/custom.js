// -----------------------------------------------------------------------------
/* custom.js */
// -----------------------------------------------------------------------------

$( document).on( "pagecreate", "#pageMain", function()
{
	$( document).bind( 'touchmove', false);
});

// -----------------------------------------------------------------------------

$( document).on( "pageshow", "#pageMain", function()
{
	setTimeout( function(){
		var globe = new Globe;
	}, 50);
});

// -----------------------------------------------------------------------------
