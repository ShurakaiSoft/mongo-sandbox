/**
 * article schema
 */

var Schema = require('mongoose').schema;

var ArticleSchema = new Schema({
	title : {
		type: String,
		unique: true
	},
	body: String,
	author: {
		type: Schema.ObjectId,
		ref: 'User',
		required: true
	},
	createdAt: {
		type: Date,
		'default': Date.now
	}
});

module.exports = ArticleSchema;

