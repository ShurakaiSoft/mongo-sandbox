/**
 * user schema
 */

var mongoose = require('mongoose');

var emailRegex = /.+\@.+\..+/; // incomplete



var UserSchema = new mongoose.Schema({
	username: { type: String, unique: true },
	name: String,
	password: String,
	email: {
		type: String,
		required: true,
		match: emailRegex
	},
	gender: {
		type: String,
		required: true,
		uppercase: true,
		'enum': ['M', 'F']
	}
});

module.exports = UserSchema;