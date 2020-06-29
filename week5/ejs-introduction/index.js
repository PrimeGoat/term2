const express = require('express');
const app = express();
const path = require('path');
const { Template } = require('ejs');
const e = require('express');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// For static files such as images
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.render('index', {name: 'Denis'});
})

app.get('/loop', (req, res) => {
	let places = [
		{city: "Brooklyn", state: "NY"},
		{city: "New York", state: "NY"}
	];
	res.render('index', { places });
});

app.get('/:dog/:cat', (req, res) => {
	let bear = req.query.search;
	let dog = req.params.dog;
	let cat = req.params.cat;

	res.render('index', {dog, cat, bearName: bear});
})

app.listen(3000, () => {
	console.log("Listening on port 3000");
});


// 1. <%  no output
// 2. <%= Outputs the value into the template
// 3. <%- Outputs the unescaped value into the template  (can be used for includes)
// 4. <%# Comment tag, no execution, no output
// 5. <%% Outputs a literal '<%'
// 6.  %> Plain ending tag
// 7. #%> End the comment tag