const express = require('express');
const app = express();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const url = 'mongodb://localhost/firstdb';

MongoClient.connect(url, {
	useNewUrlParser:true,
	useUnifiedTopology: true
}).then((client) => {
	const db = client.db('firstdb');
	const jobsCollection = db.collection('jobs');

	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));

	// all routes go here

	app.get('/', (req, res) => {
		jobsCollection
			.find()
			.toArray()
			.then(val=>console.log(val));
	})

	
})

app.listen(3000, () => {
	console.log("listening on port 3000");
})

