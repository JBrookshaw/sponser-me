'use strict';

// Setting up route
angular.module('search').config(['$stateProvider',
	function($stateProvider) {
		// project state routing
		$stateProvider.
		state('project', {
			url: '/project',
			templateUrl: 'modules/search/views/search.client.view.html'
		}).
            state('sidesearch', {
                url: '/sidesearch',
                templateUrl: 'modules/search/views/searchside.client.view.html'
            });

	}
]);
