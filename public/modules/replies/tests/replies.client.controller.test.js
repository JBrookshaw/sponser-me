'use strict';

(function() {
	// Replies Controller Spec
	describe('Replies Controller Tests', function() {
		// Initialize global variables
		var RepliesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Replies controller.
			RepliesController = $controller('RepliesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Reply object fetched from XHR', inject(function(Replies) {
			// Create sample Reply using the Replies service
			var sampleReply = new Replies({
				name: 'New Reply'
			});

			// Create a sample Replies array that includes the new Reply
			var sampleReplies = [sampleReply];

			// Set GET response
			$httpBackend.expectGET('replies').respond(sampleReplies);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.replies).toEqualData(sampleReplies);
		}));

		it('$scope.findOne() should create an array with one Reply object fetched from XHR using a replyId URL parameter', inject(function(Replies) {
			// Define a sample Reply object
			var sampleReply = new Replies({
				name: 'New Reply'
			});

			// Set the URL parameter
			$stateParams.replyId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/replies\/([0-9a-fA-F]{24})$/).respond(sampleReply);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.reply).toEqualData(sampleReply);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Replies) {
			// Create a sample Reply object
			var sampleReplyPostData = new Replies({
				name: 'New Reply'
			});

			// Create a sample Reply response
			var sampleReplyResponse = new Replies({
				_id: '525cf20451979dea2c000001',
				name: 'New Reply'
			});

			// Fixture mock form input values
			scope.name = 'New Reply';

			// Set POST response
			$httpBackend.expectPOST('replies', sampleReplyPostData).respond(sampleReplyResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Reply was created
			expect($location.path()).toBe('/replies/' + sampleReplyResponse._id);
		}));

		it('$scope.update() should update a valid Reply', inject(function(Replies) {
			// Define a sample Reply put data
			var sampleReplyPutData = new Replies({
				_id: '525cf20451979dea2c000001',
				name: 'New Reply'
			});

			// Mock Reply in scope
			scope.reply = sampleReplyPutData;

			// Set PUT response
			$httpBackend.expectPUT(/replies\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/replies/' + sampleReplyPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid replyId and remove the Reply from the scope', inject(function(Replies) {
			// Create new Reply object
			var sampleReply = new Replies({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Replies array and include the Reply
			scope.replies = [sampleReply];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/replies\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleReply);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.replies.length).toBe(0);
		}));
	});
}());