const express = require('express');
const app = express();
const morgan = require('morgan');
const port = process.env.PORT || 3000;
require('dotenv').config();
const cookieParser = require('cookie-parser');
const uuid = require('uuid4');
const mongoose = require('mongoose');
const session = require('express-session')
let MongoStore = require('connect-mongo')(session)

app.use(morgan('dev'));
app.use(cookieParser('process.env.SECRET'));
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: process.env.SESSION_SECRET,
	store: new MongoStore({
		url: process.env.MONGODB_URI,
		mongooseConnection: mongoose.connection,
		autoReconnect: true
	}),
	cookie: {
		secure: false,
		maxAge: 1000 * 60 * 25
	}
}))

mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
})
.then(() => console.log('MongoDB connected'))
.catch(err=> console.log('MongoDB Error: ', err))


// app.use((req, res, next) => {
// 	let myCookie = req.cookies.cookieName; // View cookie
// 	if(myCookie == undefined) {
// 		let randomId = uuid();
// 		// Set cookie
// 		res.cookie('cookieName', randomId, {maxAge: 5000, httpOnly: true})
// 		console.log("Cookie created");
// 	} else {
// 		console.log("Cookie already exists", myCookie);
// 	}

// 	next();
// })

app.get('/', (req, res) => {
	req.session.name = 'DVS';
	if(req.session.numViews) {
		req.session.numViews++;
	} else {
		req.session.numViews = 1;
	}

	return res.send('Hi ' + req.session.name + ', You have viewed this page ' + req.session.numViews + ' times.');
});


// app.get('/cookie', (req, res) => {
// 	console.log(req.cookies);

// 	let options = {
// 		maxAge: 1000 * 60 * 15,
// 		httpOnly: true,
// 		signed: true
// 	}

// 	res.cookie('cookieName', 'violatorTech', options);
// 	res.send('Cookies and Sessions');
// });

app.listen(port, () => console.log('Listening on port ' + port));

// mongoose, dotenv, express, cookie-parser morgan