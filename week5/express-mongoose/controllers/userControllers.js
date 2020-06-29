const User = require('../models/users');

module.exports = {
	//getAllUsers
	getAllUsers: (req, res) => {
		console.log('hello');
		User.find().then((users) => {
			return res.json(users);
			//return res.status('Hello');
			//return res.status(200).json(users);
		}).catch(err=>err);
	}
/*
	//getSingleUser
	getSingleUser

	//register
	register

	//login
	login

	//updateUser
	updateUser

	//deleteUser
	deleteUser
*/
};