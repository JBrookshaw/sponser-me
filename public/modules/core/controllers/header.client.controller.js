'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

        $scope.searchBlah = function() {

            //$('#search-icon').click(function(){
            if( $('#search-bar').css("display")=="none"){
                $('#search-bar').css("display", "block");
                $('#search-query').val("");
                $scope.query = '';
            } else {
                $('#search-bar').css("display", "none");
                $('#search-query').val("");
            }

			var list = $('#search-bar img');

			for(var i =0; i < list.length; i++){
				list[i].src = "http://lorempixel.com/50/50/people/"+Math.floor((Math.random() * 10) + 1);
			}

            //});

        };
	}
]);
