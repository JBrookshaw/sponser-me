'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
	function(Menus) {
		// Uncomment to add articles example
		Menus.addMenuItem('topbar', 'Forums', 'articles', 'dropdown', '/articles(/create)?', false);
		Menus.addSubMenuItem('topbar', 'articles', 'List Forums', 'articles');
		Menus.addSubMenuItem('topbar', 'articles', 'New Forum', 'articles/create');
	}
]);
