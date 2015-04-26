'use strict';

// Replies controller
angular.module('replies').controller('RepliesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Replies', 'Messages',
	function($scope, $stateParams, $location, Authentication, Replies, Messages) {
		$scope.authentication = Authentication;

		// Create new Reply
		$scope.create = function() {
			// Create new Reply object
			var reply = new Replies ({
				name: this.name,
                content: this.content,
                originId: this.originId
			});

			// Redirect after save
			reply.$save(function(response) {
				$location.path('replies/' + response._id);

				// Clear form fields
				$scope.name = '';
                $scope.content = '';
                $scope.originId = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Reply
		$scope.remove = function(reply) {
			if ( reply ) { 
				reply.$remove();

				for (var i in $scope.replies) {
					if ($scope.replies [i] === reply) {
						$scope.replies.splice(i, 1);
					}
				}
			} else {
				$scope.reply.$remove(function() {
					$location.path('replies');
				});
			}
		};

		// Update existing Reply
		$scope.update = function() {
			var reply = $scope.reply;

			reply.$update(function() {
				$location.path('replies/' + reply._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Replies
		$scope.find = function() {
			$scope.replies = Replies.query();
		};

		// Find existing Reply
		$scope.findOne = function() {
			$scope.reply = Replies.get({ 
				replyId: $stateParams.replyId
			});
		};
        // Create new Message
        $scope.createMessage = function() {
            // Create new Message object
            var message = new Messages ({
                ///// eric
                name: this.name,
                content: this.content,
                desuser: this.desuser
            });

            // Redirect after save
            message.$save(function(response) {
                $location.path('messages/' + response._id);

                // Clear form fields

                ///////// eric
                $scope.name = '';
                $scope.content = '';
                $scope.desuser = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Message
        $scope.messageremove = function(message) {
            if ( message ) {
                message.$remove();

                for (var i in $scope.messages) {
                    if ($scope.messages [i] === message) {
                        $scope.messages.splice(i, 1);
                    }
                }
            } else {
                $scope.message.$remove(function() {
                    $location.path('messages');
                });
            }
        };

        // Update existing Message
        $scope.messageupdate = function() {
            var message = $scope.message;

            message.$update(function() {
                $location.path('messages/' + message._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Messages
        $scope.messagefind = function() {
            $scope.messages = Messages.query();
        };

        // Find existing Message
        $scope.messagefindOne = function() {
            $scope.message = Messages.get({
                messageId: $stateParams.messageId
            });
        };
	}
]);
