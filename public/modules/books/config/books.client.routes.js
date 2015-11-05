'use strict';

//Setting up route
angular.module('books').config(['$stateProvider',
	function($stateProvider) {
		// Books state routing
		$stateProvider.
		state('listBooks', {
			url: '/books',
			templateUrl: 'modules/books/views/list-books.client.view.html'
		}).
		state('createBook', {
			url: '/books/confirm/:bookId',
			templateUrl: 'modules/books/views/confirm-book.client.view.html'
		}).
		state('viewBook', {
			url: '/books/TaxiType',
			templateUrl: 'modules/books/views/type-book.client.view.html'
		// }).
		// state('editBook', {
		// 	url: '/books/:bookId',
		// 	templateUrl: 'modules/books/views/edit-book.client.view.html'
		});
	}
]);