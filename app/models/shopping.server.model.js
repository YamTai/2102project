'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Shopping Schema
 */
var ShoppingSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Shopping name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Shopping', ShoppingSchema);