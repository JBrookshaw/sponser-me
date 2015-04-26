'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var replies = require('../../app/controllers/replies.server.controller');

	// Replies Routes
	app.route('/replies')
		.get(replies.list)
		.post(users.requiresLogin, replies.create);

	app.route('/replies/:replyId')
		.get(replies.read)
		.put(users.requiresLogin, replies.hasAuthorization, replies.update)
		.delete(users.requiresLogin, replies.hasAuthorization, replies.delete);

	// Finish by binding the Reply middleware
	app.param('replyId', replies.replyByID);
};
