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
	name: mongoose.Schema.Types.Mixed,
	password: String,
	email: {
		type: String,
		sparse: true,
		unique: true,
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
	},
	meta: {
		createdAt: {
			type: Date,
			'default': Date.now,
			set: function (val) {
				return undefined;
			}
		},
		updatedAt: {
			type: Date,
			'default': Date.now
		}
	}
});

UserSchema
	.virtual('fullName')
	.get(function () {
		if (typeof this.name === 'string') {
			return this.name;
		}
		return [this.name.first, this.name.last].join(' ');
	})
	.set(function (fullName) {
		var nameComponents = fullName.split(' ');
		this.name = {
				last: nameComponents.pop(),
				first: nameComponents.join(' ')	// incase more than one first name
		};
	});


UserSchema.pre('save', function (next) {
	if (this.isNew) {
		this.meta.createdAt = undefined;
	}
	this.meta.updatedAt = undefined;
	next();
});

UserSchema.index({
	username: 1,
	'meta.createdAt': -1
});

module.exports = UserSchema;