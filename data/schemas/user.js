/**
 * user schema
 */

var mongoose = require('mongoose');

var emailRegex = /.+\@.+\..+/; // incomplete
var yearInSeconds = 31536000000;
var thirteenYears = yearInSeconds * 13;

function validate13YearsOldOrMore(date) {
	return (Date.now() - date.getTime()) > thirteenYears;
}

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
	},
	birthday: {
		type: Date,
		validate: [
		    validate13YearsOldOrMore,
		    'you must be 13 years old or more']
	}
});

module.exports = UserSchema;