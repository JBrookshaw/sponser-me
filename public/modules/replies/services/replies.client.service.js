'use strict';

//Replies service used to communicate Replies REST endpoints
angular.module('replies').factory('Replies', ['$resource',
	function($resource) {
		return $resource('replies/:replyId', { replyId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);


//Messages service used to communicate Messages REST endpoints
angular.module('replies').factory('Messages', ['$resource',
    function($resource) {
        return $resource('messages/:messageId', { messageId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
