// -----------------------------------------------------------------------------
/* custom.js */
// -----------------------------------------------------------------------------

$( document).on( "pagecreate", "#pageMap", function()
{
});

// -----------------------------------------------------------------------------

$( document).on( "pageshow", "#pageMap", function()
{
	var sound = new Sound;
	var globe = new Globe;
	var orchestra = new Orchestra( sound);
	var instrument = new Instrument;
});

// -----------------------------------------------------------------------------
