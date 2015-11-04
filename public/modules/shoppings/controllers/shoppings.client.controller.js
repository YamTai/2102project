'use strict';

// Shoppings controller
angular.module('shoppings').controller('ShoppingsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Shoppings',
	function($scope, $stateParams, $location, Authentication, Shoppings) {
		$scope.authentication = Authentication;

		// Create new Shopping
		$scope.create = function() {
			// Create new Shopping object
			var shopping = new Shoppings ({
				name: this.name,
				description: this.description,
				image: this.image
			});

			// Redirect after save
			shopping.$save(function(response) {
				$location.path('shoppings/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Shopping
		$scope.remove = function(shopping) {
			if ( shopping ) { 
				shopping.$remove();

				for (var i in $scope.shoppings) {
					if ($scope.shoppings [i] === shopping) {
						$scope.shoppings.splice(i, 1);
					}
				}
			} else {
				$scope.shopping.$remove(function() {
					$location.path('shoppings');
				});
			}
		};

		// Update existing Shopping
		$scope.update = function() {
			var shopping = $scope.shopping;

			shopping.$update(function() {
				$location.path('shoppings/' + shopping._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Shoppings
		$scope.find = function() {
			$scope.shoppings = Shoppings.query();
		};

		// Find existing Shopping
		$scope.findOne = function() {
			$scope.shopping = Shoppings.get({ 
				shoppingId: $stateParams.shoppingId
			});
		};
	}
]);