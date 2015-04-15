'use strict';

// Configuring the Articles module
angular.module('message').run(['Menus',
    function(Menus) {
        // Set top bar menu items

        Menus.addMenuItem('topbar', 'Messages', 'message', 'message', null, false, null, 1);

    }
]);
