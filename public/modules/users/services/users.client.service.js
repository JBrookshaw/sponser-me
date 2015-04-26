'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users/:userId', {userId: '@_id'}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
////Articles service used for communicating with the articles REST endpoints
//angular.module('articles').factory('Articles', ['$resource',
//	function($resource) {
//		return $resource('articles/:articleId', {
//			articleId: '@_id'
//		}, {
//			update: {
//				method: 'PUT'
//			}
//		});
//	}
//]);
//angular.module('users').factory('ListUser', ['$resource',
//    function($resource) {
//        return $resource('users', {}, {
//            update: {
//                method: 'PUT'
//            }
//        });
//    }
//]);
