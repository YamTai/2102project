'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Shopping = mongoose.model('Shopping'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, shopping;

/**
 * Shopping routes tests
 */
describe('Shopping CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Shopping
		user.save(function() {
			shopping = {
				name: 'Shopping Name'
			};

			done();
		});
	});

	it('should be able to save Shopping instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Shopping
				agent.post('/shoppings')
					.send(shopping)
					.expect(200)
					.end(function(shoppingSaveErr, shoppingSaveRes) {
						// Handle Shopping save error
						if (shoppingSaveErr) done(shoppingSaveErr);

						// Get a list of Shoppings
						agent.get('/shoppings')
							.end(function(shoppingsGetErr, shoppingsGetRes) {
								// Handle Shopping save error
								if (shoppingsGetErr) done(shoppingsGetErr);

								// Get Shoppings list
								var shoppings = shoppingsGetRes.body;

								// Set assertions
								(shoppings[0].user._id).should.equal(userId);
								(shoppings[0].name).should.match('Shopping Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Shopping instance if not logged in', function(done) {
		agent.post('/shoppings')
			.send(shopping)
			.expect(401)
			.end(function(shoppingSaveErr, shoppingSaveRes) {
				// Call the assertion callback
				done(shoppingSaveErr);
			});
	});

	it('should not be able to save Shopping instance if no name is provided', function(done) {
		// Invalidate name field
		shopping.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Shopping
				agent.post('/shoppings')
					.send(shopping)
					.expect(400)
					.end(function(shoppingSaveErr, shoppingSaveRes) {
						// Set message assertion
						(shoppingSaveRes.body.message).should.match('Please fill Shopping name');
						
						// Handle Shopping save error
						done(shoppingSaveErr);
					});
			});
	});

	it('should be able to update Shopping instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Shopping
				agent.post('/shoppings')
					.send(shopping)
					.expect(200)
					.end(function(shoppingSaveErr, shoppingSaveRes) {
						// Handle Shopping save error
						if (shoppingSaveErr) done(shoppingSaveErr);

						// Update Shopping name
						shopping.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Shopping
						agent.put('/shoppings/' + shoppingSaveRes.body._id)
							.send(shopping)
							.expect(200)
							.end(function(shoppingUpdateErr, shoppingUpdateRes) {
								// Handle Shopping update error
								if (shoppingUpdateErr) done(shoppingUpdateErr);

								// Set assertions
								(shoppingUpdateRes.body._id).should.equal(shoppingSaveRes.body._id);
								(shoppingUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Shoppings if not signed in', function(done) {
		// Create new Shopping model instance
		var shoppingObj = new Shopping(shopping);

		// Save the Shopping
		shoppingObj.save(function() {
			// Request Shoppings
			request(app).get('/shoppings')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Shopping if not signed in', function(done) {
		// Create new Shopping model instance
		var shoppingObj = new Shopping(shopping);

		// Save the Shopping
		shoppingObj.save(function() {
			request(app).get('/shoppings/' + shoppingObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', shopping.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Shopping instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Shopping
				agent.post('/shoppings')
					.send(shopping)
					.expect(200)
					.end(function(shoppingSaveErr, shoppingSaveRes) {
						// Handle Shopping save error
						if (shoppingSaveErr) done(shoppingSaveErr);

						// Delete existing Shopping
						agent.delete('/shoppings/' + shoppingSaveRes.body._id)
							.send(shopping)
							.expect(200)
							.end(function(shoppingDeleteErr, shoppingDeleteRes) {
								// Handle Shopping error error
								if (shoppingDeleteErr) done(shoppingDeleteErr);

								// Set assertions
								(shoppingDeleteRes.body._id).should.equal(shoppingSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Shopping instance if not signed in', function(done) {
		// Set Shopping user 
		shopping.user = user;

		// Create new Shopping model instance
		var shoppingObj = new Shopping(shopping);

		// Save the Shopping
		shoppingObj.save(function() {
			// Try deleting Shopping
			request(app).delete('/shoppings/' + shoppingObj._id)
			.expect(401)
			.end(function(shoppingDeleteErr, shoppingDeleteRes) {
				// Set message assertion
				(shoppingDeleteRes.body.message).should.match('User is not logged in');

				// Handle Shopping error error
				done(shoppingDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Shopping.remove().exec();
		done();
	});
});