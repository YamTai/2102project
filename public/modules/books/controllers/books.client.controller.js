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

		//function MapController($scope) {
		// $scope.loadMap = function(){
  //   		$scope.message = 'Displaying a Google Map';
  //   		console.log('running...');

  //   		var mapOptions = {
  //                 zoom: 10,
  //                 center: new google.maps.LatLng(1.3,103.8),
  //                 mapTypeId: google.maps.MapTypeId.ROADMAP
  //             };

		// 	$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

		// 	var geocoder = new google.maps.Geocoder();
		// 	$scope.markers = [];
		// 	$scope.routes = [];

		// 	$scope.search = function (address1,address2) {
		// 		codeAddress(address1);
  // 				codeAddress(address2);
  // 			};

  // 			var codeAddress = 
  // 							function (info){
		// 			  			geocoder.geocode( {'address': info},
		// 						function(results, status){
		// 							if (status === google.maps.GeocoderStatus.OK){
		// 					            $scope.coordinate = results[0].geometry.location;
		// 					            $scope.map.setCenter(results[0].geometry.location);

		// 					            var marker = new google.maps.Marker(
		// 					            	{map: $scope.map, position: results[0].geometry.location});

		// 					            $scope.markers.push(marker);

  //         								var route = new google.maps.LatLng(         
		// 					            	results[0].geometry.location.lat(),
		// 					            	results[0].geometry.location.lng());

  //         								$scope.routes.push(route);
  //         							}
  //         						});
		// 			  		};

		// 	$scope.showLine = function (){
		// 		$scope.path1 = new google.maps.Polyline(
  //   			{
		// 			path: $scope.routes,
		// 			strokeColor: '#FF0000',
		// 			strokeOpacity: 1.0,
		// 			strokeWeight: 2
  //   			});

  //   			$scope.path1.setMap($scope.map);
  //   		};		  
		// };/*end of google maps*/
	}
]);