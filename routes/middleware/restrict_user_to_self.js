/**
 * Restrict user to Self
 */

function restrictUserToSelf(req, res, next) {
	if (!req.session.user || req.session.user.username !== req.user.username) {
		res.send('Unauthorised', 401);
	} else {
		next();
	}
}

module.exports = restrictUserToSelf;