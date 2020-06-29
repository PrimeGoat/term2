const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv').config();

const port = process.env.PORT || 3000;

const Dog = require('./models/Dog');

// connect mongoose

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
	.then(() => {
		console.log('MongoDB connected');
	})
	.catch(err=>console.log("Mongo error: " + err));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	//res.send(name);

	//if(name != undefined) {
		Dog.find({
			dogType: req.query.search
		}).then(dogs => res.json(dogs));
	//}

	//res.send('Hello Mongoose');
});

app.post('/', (req, res) => {
	const dog = new Dog();

	dog.name = req.body.name;
	dog.dogType = req.body.dogType;
	dog.age = req.body.age;
	
	if(req.body.age > 20) {
		return res.send('Age must be less than or equal to 20');
	}

	dog.save()
	.then((val) => {
		return res.json(val);
	});
});

app.listen(port, () => {
	console.log('Listening on port ' + port);
});