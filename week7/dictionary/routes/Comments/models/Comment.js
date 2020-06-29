const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	comment: {
		type: String,
		required:true,
		lowercase:true,
		trim: true
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Word'
	},
	timestamp: {
		type: String, default: () => moment().format('dddd, MMMM Do YYYY, h:mm a')
	}
});

module.exports = mongoose.model('Comment', CommentSchema);