;(function () {
	'use strict';

// //start slider
	$(window).on('load', function() {
		$('.ba-slider').slick({
			dots: true,
			centerMode: true,
			
		});

	});
// 	//end slider


// 	// start HAMBURGER
	$(".menu-collapsed").click(function() {
	    $(this).toggleClass("menu-expanded");
	});
// 	// end HAMBURGER

	smoothScroll.init();


	

// 	//start MAP
		var map = null;

		function createMap() {

			var $markers = $('.ba-marker');

			map = new google.maps.Map( $('.ba-map')[0], {
				zoom: 14,
				center: new google.maps.LatLng(0,0)
			});

			addMarkers($markers, map);
			centerMap($markers, map);

		}

		function addMarkers( $markers, map ) {
			$markers.each( function() {
				var lat = $(this).data('lat');
				var lng = $(this).data('lng');
				var icon = $(this).data('icon');
				var marker = new google.maps.Marker({
					position: { lat: lat, lng: lng },
					map: map,
					icon: icon,
				});

				var content = $(this).find('.description').html();

				var infoWindow = new google.maps.InfoWindow({
					content: content,
				});

				marker.addListener('click', function() {
					infoWindow.open(map, marker);
				});

			});
		}

		function centerMap($markers, map) {

			if ($markers.length == 1) {

				var lat = $markers.data('lat');
				var lng = $markers.data('lng');
				var latLng = new google.maps.LatLng( lat, lng );
				map.setCenter(latLng);
				
			} else { 

				var bounds = new google.maps.LatLngBounds();

				$markers.each( function() {
					var lat = $(this).data('lat');
					var lng = $(this).data('lng');
					var latLng = new google.maps.LatLng( lat, lng );
					bounds.extend(latLng);
				});

				map.fitBounds(bounds);

			}

		}

		createMap();

	});

// 	//end MAP

})(jQuery);