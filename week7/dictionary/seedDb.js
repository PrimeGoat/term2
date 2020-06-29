const mongoose = require('mongoose');
const Words = require('./routes/Words/models/Word');
const wordSeed = require('./wordSeed.json');
const moment = require('moment');
require('dotenv').config();

const seedFunc = async() => {
	try {
		const data = await Words.create(wordSeed);
		console.log(`${data.length} record(s) created`);
		await mongoose.disconnect();
		console.log('MongoDB Disconnected');
		process.exit(0);
	} catch(error) {
		console.error(error);
		process.exit(1);
	}
};

mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
}, () => {
	mongoose.connection.db.dropDatabase();
})
.then(() => {
	console.log('MongoDB Connected');
	seedFunc();
})
.catch(err => console.log(`MongoDB error: ${err}`));
