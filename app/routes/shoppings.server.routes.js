'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var shoppings = require('../../app/controllers/shoppings.server.controller');

	// Shoppings Routes
	app.route('/shoppings')
		.get(shoppings.list)
		.post(shoppings.create);
		//.post(users.requiresLogin, shoppings.create);

	app.route('/shoppings/:shoppingId')
		.get(shoppings.read)
		//.put(shoppings.update)
		.put(users.requiresLogin, shoppings.hasAuthorization, shoppings.update)
		.delete(users.requiresLogin, shoppings.hasAuthorization, shoppings.delete);

	// Finish by binding the Shopping middleware
	app.param('shoppingId', shoppings.shoppingByID);
};
