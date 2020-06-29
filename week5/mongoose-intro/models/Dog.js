const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

const DogSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		default: 'Denis',
		trim: true
	},
	doggyType: String,
	dogType: {
		type: String,
		lowercase: true
	},
	age: {
		type: Number,
		min: 1,
		max: 20
	},
	timestamp: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('dog', DogSchema);