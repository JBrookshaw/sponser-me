'use strict';

// Setting up route
angular.module('message').config(['$stateProvider',
	function($stateProvider) {
		// project state routing
		$stateProvider.
		state('message', {
			url: '/message',
			templateUrl: 'modules/message/views/message.client.view.html'
		})
	}
]);
