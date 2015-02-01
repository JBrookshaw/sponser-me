'use strict';

angular.module('search').controller('SearchController', ['$scope','Users',
	function($scope, Users) {
        $scope.users = Users.query();
	}
]);
