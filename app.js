;(function ($, undefined) {

	var $grid = $('#GridView1'),
		data  = [];

	_getData = function (url) {
		return $.ajax({
			url: url,
			dataType: 'html'
		});
	};
	
	_processTrainData = function (html) {
		var $grid    = $(html).find('#GridView1'),
			cols     = ['depart', 'to', 'track', 'line', 'train', 'status'],
			deferred = [];
			
		$grid.find('tr[style]').each( function (index, element) {
			var $row = $(this),
				obj  = {};
						
			obj['stopsUrl'] = '' + $row.closest('a').attr('href');
			
			
			$row.find('td').each( function (index, element) {
				obj[ cols[index] ] = $.trim( $(element).text() );
			});
			
			obj['stopsUrl'] = 'http://dv.njtransit.com/mobile/train_stops.aspx?sid=NP&train=' + obj['train'];
			
			deferred.push( _getData( obj['stopsUrl'] ).then( _processStopsData( obj, data ) ) );
		});		
		
		return $.when.apply( $, deferred );
		
	};
	
	_processStopsData = function (obj, data) {
	
		var defer = $.Deferred();
		
		return function (html) {
			var $grid = $(html).find('#table_stops');
				stops = [];
				
			$grid.find('td').each( function (index, element) {
				var text  = $.trim( $(this).find('p').text() ),
					parts = $.map( text.split(/\bat\b/), function (val) { return $.trim( val ); } );
					
				stops.push({ location: parts[0], time: parts[1] });
			});
			
			obj['stops'] = stops;
			data.push( obj );
			
			return defer.resolve();
		};
	};
	
	_display = function () {
		console.log( data );
	};

	_getData('http://dv.njtransit.com/mobile/tid-mobile.aspx?sid=NP').then( _processTrainData ).then( _display );


})( window.jQuery );