'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Reply = mongoose.model('Reply'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, reply;

/**
 * Reply routes tests
 */
describe('Reply CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Reply
		user.save(function() {
			reply = {
				name: 'Reply Name'
			};

			done();
		});
	});

	it('should be able to save Reply instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Reply
				agent.post('/replies')
					.send(reply)
					.expect(200)
					.end(function(replySaveErr, replySaveRes) {
						// Handle Reply save error
						if (replySaveErr) done(replySaveErr);

						// Get a list of Replies
						agent.get('/replies')
							.end(function(repliesGetErr, repliesGetRes) {
								// Handle Reply save error
								if (repliesGetErr) done(repliesGetErr);

								// Get Replies list
								var replies = repliesGetRes.body;

								// Set assertions
								(replies[0].user._id).should.equal(userId);
								(replies[0].name).should.match('Reply Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Reply instance if not logged in', function(done) {
		agent.post('/replies')
			.send(reply)
			.expect(401)
			.end(function(replySaveErr, replySaveRes) {
				// Call the assertion callback
				done(replySaveErr);
			});
	});

	it('should not be able to save Reply instance if no name is provided', function(done) {
		// Invalidate name field
		reply.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Reply
				agent.post('/replies')
					.send(reply)
					.expect(400)
					.end(function(replySaveErr, replySaveRes) {
						// Set message assertion
						(replySaveRes.body.message).should.match('Please fill Reply name');
						
						// Handle Reply save error
						done(replySaveErr);
					});
			});
	});

	it('should be able to update Reply instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Reply
				agent.post('/replies')
					.send(reply)
					.expect(200)
					.end(function(replySaveErr, replySaveRes) {
						// Handle Reply save error
						if (replySaveErr) done(replySaveErr);

						// Update Reply name
						reply.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Reply
						agent.put('/replies/' + replySaveRes.body._id)
							.send(reply)
							.expect(200)
							.end(function(replyUpdateErr, replyUpdateRes) {
								// Handle Reply update error
								if (replyUpdateErr) done(replyUpdateErr);

								// Set assertions
								(replyUpdateRes.body._id).should.equal(replySaveRes.body._id);
								(replyUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Replies if not signed in', function(done) {
		// Create new Reply model instance
		var replyObj = new Reply(reply);

		// Save the Reply
		replyObj.save(function() {
			// Request Replies
			request(app).get('/replies')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Reply if not signed in', function(done) {
		// Create new Reply model instance
		var replyObj = new Reply(reply);

		// Save the Reply
		replyObj.save(function() {
			request(app).get('/replies/' + replyObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', reply.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Reply instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Reply
				agent.post('/replies')
					.send(reply)
					.expect(200)
					.end(function(replySaveErr, replySaveRes) {
						// Handle Reply save error
						if (replySaveErr) done(replySaveErr);

						// Delete existing Reply
						agent.delete('/replies/' + replySaveRes.body._id)
							.send(reply)
							.expect(200)
							.end(function(replyDeleteErr, replyDeleteRes) {
								// Handle Reply error error
								if (replyDeleteErr) done(replyDeleteErr);

								// Set assertions
								(replyDeleteRes.body._id).should.equal(replySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Reply instance if not signed in', function(done) {
		// Set Reply user 
		reply.user = user;

		// Create new Reply model instance
		var replyObj = new Reply(reply);

		// Save the Reply
		replyObj.save(function() {
			// Try deleting Reply
			request(app).delete('/replies/' + replyObj._id)
			.expect(401)
			.end(function(replyDeleteErr, replyDeleteRes) {
				// Set message assertion
				(replyDeleteRes.body.message).should.match('User is not logged in');

				// Handle Reply error error
				done(replyDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Reply.remove().exec();
		done();
	});
});