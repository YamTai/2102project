'use strict';

// Books controller
angular.module('books').controller('BooksController',['$scope', '$stateParams', '$location', 'Authentication', 'Books',
	function($scope, $stateParams, $location, Authentication, Books) {
		$scope.authentication = Authentication;

		// Create new Book
		$scope.create = function() {
			// Create new Book object
			var book = new Books ({
				current_location: this.current_location,
				destination: this.destination
			});

			// Redirect after save
			book.$save(function(response) {
				$location.path('books/confirm/' + response._id);

				// Clear form fields
				$scope.current_location = '';
				$scope.destination = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Book
		$scope.remove = function(book) {
			if ( book ) { 
				book.$remove();

				for (var i in $scope.books) {
					if ($scope.books [i] === book) {
						$scope.books.splice(i, 1);
					}
				}
			} else {
				$scope.book.$remove(function() {
					$location.path('books');
				});
			}
		};

		// Update existing Book
		$scope.update = function() {
			var book = $scope.book;

			book.$update(function() {
				$location.path('books/' + book._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Books
		$scope.find = function() {
			$scope.books = Books.query();
		};

		// Find existing Book
		$scope.findOne = function() {
			$scope.book = Books.get({ 
				bookId: $stateParams.bookId
			});
		};

		/*google maps*/
		var map;
		var geocoder = new google.maps.Geocoder();
		var infowindow = new google.maps.InfoWindow();

		$scope.$on('mapInitialized', function(evt, evtMap) {
			map = evtMap;
			$scope.placeMarker = function(e) {
				var latlng = e.latLng;
				var marker = new google.maps.Marker({position: latlng, map: map});
				map.panTo(latlng);
				var lat = latlng.lat();
				var lng = latlng.lng();
				var latlngStr = {lat: parseFloat(lat), lng: parseFloat(lng)};
				console.log(latlngStr);
				geocoder.geocode({'location': latlngStr}, function(results, status) {
	    			if (status === google.maps.GeocoderStatus.OK) {
						if (results[1]) {
							console.log(results[1].formatted_address);
							infowindow.setContent(results[1].formatted_address);
							infowindow.open(map, marker);
						}
	      			}
				});
				angular.element('des').value = results[1].formatted_address;
			}
		});

		$scope.showLocation = function (location) {
			geocoder.geocode( {'address':location}, function(results, status){
				if (status == google.maps.GeocoderStatus.OK){
		            var value = results[0].geometry.location;
		            $scope.map.setCenter(value);
		            var marker = new google.maps.Marker({position: value, map: map});
					map.panTo(value);
					map.setZoom(15);
		        }
		    })
		};
	/*end of google maps*/
	}
]);