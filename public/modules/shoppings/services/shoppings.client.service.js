'use strict';

//Shoppings service used to communicate Shoppings REST endpoints
angular.module('shoppings').factory('Shoppings', ['$resource',
	function($resource) {
		return $resource('shoppings/:shoppingId', { shoppingId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);