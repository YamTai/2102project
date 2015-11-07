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
	description: {
		type: String,
		default: '',
		required: 'Please fill Shopping description',
		trim: true
	},
	image: {
		type: String,
		default: '',
		required: 'Please fill Shopping image',
		trim: true
	},
	price: {
		type: String,
		default: '',
		required: 'Please fill Shopping item price',
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