'use strict';

(function() {
	// Shoppings Controller Spec
	describe('Shoppings Controller Tests', function() {
		// Initialize global variables
		var ShoppingsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Shoppings controller.
			ShoppingsController = $controller('ShoppingsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Shopping object fetched from XHR', inject(function(Shoppings) {
			// Create sample Shopping using the Shoppings service
			var sampleShopping = new Shoppings({
				name: 'New Shopping'
			});

			// Create a sample Shoppings array that includes the new Shopping
			var sampleShoppings = [sampleShopping];

			// Set GET response
			$httpBackend.expectGET('shoppings').respond(sampleShoppings);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.shoppings).toEqualData(sampleShoppings);
		}));

		it('$scope.findOne() should create an array with one Shopping object fetched from XHR using a shoppingId URL parameter', inject(function(Shoppings) {
			// Define a sample Shopping object
			var sampleShopping = new Shoppings({
				name: 'New Shopping'
			});

			// Set the URL parameter
			$stateParams.shoppingId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/shoppings\/([0-9a-fA-F]{24})$/).respond(sampleShopping);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.shopping).toEqualData(sampleShopping);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Shoppings) {
			// Create a sample Shopping object
			var sampleShoppingPostData = new Shoppings({
				name: 'New Shopping'
			});

			// Create a sample Shopping response
			var sampleShoppingResponse = new Shoppings({
				_id: '525cf20451979dea2c000001',
				name: 'New Shopping'
			});

			// Fixture mock form input values
			scope.name = 'New Shopping';

			// Set POST response
			$httpBackend.expectPOST('shoppings', sampleShoppingPostData).respond(sampleShoppingResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Shopping was created
			expect($location.path()).toBe('/shoppings/' + sampleShoppingResponse._id);
		}));

		it('$scope.update() should update a valid Shopping', inject(function(Shoppings) {
			// Define a sample Shopping put data
			var sampleShoppingPutData = new Shoppings({
				_id: '525cf20451979dea2c000001',
				name: 'New Shopping'
			});

			// Mock Shopping in scope
			scope.shopping = sampleShoppingPutData;

			// Set PUT response
			$httpBackend.expectPUT(/shoppings\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/shoppings/' + sampleShoppingPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid shoppingId and remove the Shopping from the scope', inject(function(Shoppings) {
			// Create new Shopping object
			var sampleShopping = new Shoppings({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Shoppings array and include the Shopping
			scope.shoppings = [sampleShopping];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/shoppings\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleShopping);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.shoppings.length).toBe(0);
		}));
	});
}());