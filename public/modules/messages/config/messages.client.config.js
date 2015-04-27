'use strict';

// Configuring the Articles module
angular.module('messages').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Messages', 'messages', 'dropdown', '/messages(/create)?', false);
		Menus.addSubMenuItem('topbar', 'messages', 'Inbox / Outbox', 'messages');
		Menus.addSubMenuItem('topbar', 'messages', 'New Message', 'messages/create');
	}
]);
