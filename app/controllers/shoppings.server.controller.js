'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Shopping = mongoose.model('Shopping'),
	_ = require('lodash');

/**
 * Create a Shopping
 */
exports.create = function(req, res) {
	var shopping = new Shopping(req.body);
	shopping.user = req.user;

	shopping.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(shopping);
		}
	});
};

/**
 * Show the current Shopping
 */
exports.read = function(req, res) {
	res.jsonp(req.shopping);
};

/**
 * Update a Shopping
 */
exports.update = function(req, res) {
	var shopping = req.shopping ;

	shopping = _.extend(shopping , req.body);

	shopping.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(shopping);
		}
	});
};

/**
 * Delete an Shopping
 */
exports.delete = function(req, res) {
	var shopping = req.shopping ;

	shopping.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(shopping);
		}
	});
};

/**
 * List of Shoppings
 */
exports.list = function(req, res) { 
	Shopping.find().sort('-created').populate('user', 'displayName').exec(function(err, shoppings) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(shoppings);
		}
	});
};

/**
 * Shopping middleware
 */
exports.shoppingByID = function(req, res, next, id) { 
	Shopping.findById(id).populate('user', 'displayName').exec(function(err, shopping) {
		if (err) return next(err);
		if (! shopping) return next(new Error('Failed to load Shopping ' + id));
		req.shopping = shopping ;
		next();
	});
};

/**
 * Shopping authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.shopping.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
