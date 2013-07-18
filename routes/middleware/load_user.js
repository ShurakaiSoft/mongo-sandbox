/**
 * Load fake user db
 */

var User = require('../../data/models/user');


function loadUser(req, res, next) {
	console.log("Loading user: %s", req.params.name);
	User.findOne({ username: req.params.name}, function (err, user) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.send('Not found', 404);
		}
		req.user = user;
		next();
	});
}


module.exports = loadUser;