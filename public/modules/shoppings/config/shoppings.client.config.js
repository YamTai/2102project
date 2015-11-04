'use strict';

// Configuring the Articles module
angular.module('shoppings').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Shoppings', 'shoppings', 'dropdown', '/shoppings(/create)?');
		Menus.addSubMenuItem('topbar', 'shoppings', 'List Shoppings', 'shoppings');
		Menus.addSubMenuItem('topbar', 'shoppings', 'New Shopping', 'shoppings/create');
	}
]);