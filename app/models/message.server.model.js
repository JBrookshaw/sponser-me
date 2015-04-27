'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Message Schema
 */
var MessageSchema = new Schema({
	name: {
		type: String,
		default: '',
		//required: 'Please fill Message name',
		trim: true
	},
    desuser: {
        type: String,
        default: '',
        //required: 'Please fill desuser desuser',
        trim: true
    },
    originId: {
        type: String,
        default: 'origin',
        //required: 'Please fill originId originId',
        trim: true
    },
    content: {
        type: String,
        default: '',
        required: 'Please fill message content',
        trim: true
    },
	created: {
		type: Date,
		default: Date.now
	},
    ///// eric
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Message', MessageSchema);
