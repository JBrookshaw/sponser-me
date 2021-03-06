'use strict';

// Messages controller
angular.module('messages').controller('MessagesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Messages',
	function($scope, $stateParams, $location, Authentication, Messages) {
		$scope.authentication = Authentication;

		// Create new Message
		$scope.create = function() {
			// Create new Message object
			var message = new Messages ({
                ///// eric
				name: this.name,
                content: this.content,
                //desuser: $("#desuser").html(),
                desuser: this.desuser,
                originId: $("#originId").html()
			});

			// Redirect after save
			message.$save(function(response) {
				$location.path('messages/' + response._id);

				// Clear form fields

                ///////// eric
				$scope.name = '';
                $scope.content = '';
                $scope.desuser = '';
                $scope.originId = '';


			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Message
		$scope.remove = function(message) {
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
		$scope.update = function() {
			var message = $scope.message;

			message.$update(function() {
				$location.path('messages/' + message._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Messages
			$scope.messages = Messages.query();

		// Find existing Message
		$scope.findOne = function() {
			$scope.message = Messages.get({ 
				messageId: $stateParams.messageId
			});
		};
	}
]);
