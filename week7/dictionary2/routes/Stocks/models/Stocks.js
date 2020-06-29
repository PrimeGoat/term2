const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StocksSchema = new Schema({
	name: {type: String, required:true, lowercase:true, unique:true},
	symbol: {type: String, required:true, lowercase:true, unique: true},
	price: {type: String, required:true},
});

module.exports = mongoose.model('Stocks', StocksSchema);