'use strict';

//Setting up route
angular.module('shoppings').config(['$stateProvider',
	function($stateProvider) {
		// Shoppings state routing
		$stateProvider.
		state('listShoppings', {
			url: '/shoppings',
			templateUrl: 'modules/shoppings/views/list-shoppings.client.view.html'
		}).
		state('createShopping', {
			url: '/shoppings/create',
			templateUrl: 'modules/shoppings/views/create-shopping.client.view.html'
		}).
		state('viewShopping', {
			url: '/shoppings/:shoppingId',
			templateUrl: 'modules/shoppings/views/view-shopping.client.view.html'
		}).
		state('editShopping', {
			url: '/shoppings/:shoppingId/edit',
			templateUrl: 'modules/shoppings/views/edit-shopping.client.view.html'
		});
	}
]);