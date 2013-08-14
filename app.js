;(function ($, undefined) {

	var $grid = $('#GridView1');

	_getData = function () {
		return $.ajax({
			url: 'http://dv.njtransit.com/mobile/tid-mobile.aspx?sid=NP',
			dataType: 'html'
		});
	};
	
	_processData = function (html) {
		var $grid = $(html).find('#GridView1'),
			cols  = ['', 'depart', 'to', 'track', 'line', 'train', 'status'],
			data  = {};
		
		$grid.find('tr').each( function (index, element) {
			var train = {};
			
			if ( index === 1 ) return; // skip the header
			
			$(this).find('td').each( function (index, element) {
				train[ cols[index] ] = $(element).text();
			});
			
			data.push( train );
		});
		
		console.log( data );
	};




})( jQuery );