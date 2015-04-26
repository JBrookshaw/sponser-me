'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Reply = mongoose.model('Reply'),
	_ = require('lodash');

/**
 * Create a Reply
 */
exports.create = function(req, res) {
	var reply = new Reply(req.body);
	reply.user = req.user;

	reply.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(reply);
		}
	});
};

/**
 * Show the current Reply
 */
exports.read = function(req, res) {
	res.jsonp(req.reply);
};

/**
 * Update a Reply
 */
exports.update = function(req, res) {
	var reply = req.reply ;

	reply = _.extend(reply , req.body);

	reply.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(reply);
		}
	});
};

/**
 * Delete an Reply
 */
exports.delete = function(req, res) {
	var reply = req.reply ;

	reply.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(reply);
		}
	});
};

/**
 * List of Replies
 */
exports.list = function(req, res) { 
	Reply.find().sort('-created').populate('user', 'displayName').exec(function(err, replies) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(replies);
		}
	});
};

/**
 * Reply middleware
 */
exports.replyByID = function(req, res, next, id) { 
	Reply.findById(id).populate('user', 'displayName').exec(function(err, reply) {
		if (err) return next(err);
		if (! reply) return next(new Error('Failed to load Reply ' + id));
		req.reply = reply ;
		next();
	});
};

/**
 * Reply authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.reply.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
