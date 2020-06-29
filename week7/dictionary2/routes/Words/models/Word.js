const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const WordSchema = new Schema({
	word: {type: String, required:true, lowercase:true, unique:true},
	meaning: {type: String, required:true, lowercase:true, trim: true},
	timestamp: {
		type: String, default: () => moment().format('dddd, MMMM Do YYYY, h:mm a')
	},
	comments: [{
		type: Schema.Types.ObjectId,
		ref: 'Comment'
	}]
});

module.exports = mongoose.model('Word', WordSchema);