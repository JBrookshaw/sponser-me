'use strict';

// Configuring the Articles module
angular.module('search').run(['Menus',
    function(Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Project', 'project', 'project', null, true, null, 0);

    }
]);
