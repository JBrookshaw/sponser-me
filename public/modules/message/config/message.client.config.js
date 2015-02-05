'use strict';

// Configuring the Articles module
angular.module('message').run(['Menus',
    function(Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Favorites', 'message', 'message', null, true, null, 1);

    }
]);
