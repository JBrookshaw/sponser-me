'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Reply Schema
 */
var ReplySchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Reply name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
    originId: {
        type: String,
        default: '',
        required: 'Please fill Reply name',
        trim: true
    },
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Reply', ReplySchema);
