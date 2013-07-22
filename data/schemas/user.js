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
	name: {
		first: String,
		last: String
	},
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

UserSchema
	.virtual('fullName')
	.get(function () {
		return [this.name.first, this.name.last].join(' ');
	})
	.set(function (fullName) {
		var nameComponents = fullName.split(' ');
		this.name.last = nameComponents.pop();
		this.name.first = nameComponents.join(' ');	// incase more than one first name
	});

module.exports = UserSchema;