'use strict';

//Setting up route
angular.module('replies').config(['$stateProvider',
	function($stateProvider) {
		// Replies state routing
		$stateProvider.
		state('listReplies', {
			url: '/replies',
			templateUrl: 'modules/replies/views/list-replies.client.view.html'
		}).
		state('createReply', {
			url: '/replies/:replyId/create',
			templateUrl: 'modules/replies/views/create-reply.client.view.html'
		}).
		state('viewReply', {
			url: '/replies/:replyId',
			templateUrl: 'modules/replies/views/view-reply.client.view.html'
		}).
		state('editReply', {
			url: '/replies/:replyId/edit',
			templateUrl: 'modules/replies/views/edit-reply.client.view.html'
		});
	}
]);
