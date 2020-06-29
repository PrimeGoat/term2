const express = require('express');
const router = express.Router();
const Word = require('./models/Word');

router.get('/', (req, res, next) => {
	Word.find().then(words => {
		console.log(words);
		if(!words.length) return res.status(400).send('No words found');
		//return res.status(200).json({ words });
		return res.render('words', { words });
	});
});

router.post('/add-word', (req, res) => {
	Word.findOne({word: req.body.word})
	.then(word => {
		if(word) return res.send('Word already exists');
		if(!req.body.word || !req.body.meaning) {
			return res.send('All inputs must be filled');
		}
		let newWord = new Word();
		newWord.word = req.body.word;
		newWord.meaning = req.body.meaning;

		newWord.save()
		.then(word => res.status(200).json({word}))
		.catch(err => res.status(400).json({message: 'Word not created', err}));
	})
})

// router.get('/single-word/:word', (req, res) => {
// 	Word.findOne({ word: req.params.word }).then((word) => {
// 		if(!word) return res.status(404).send('Word not found');
// 		return res.status(200).json({ word });
// 	});
// });

router.get('/single-word/:word', (req, res, next) => {
	Word.findOne({ word: req.params.word })
	.populate('comments')
	.exec((err, word) => {
		if(err) return next(err);
		//res.json({ word });
		res.render('singleWord', { word });
	});
});


module.exports = router;