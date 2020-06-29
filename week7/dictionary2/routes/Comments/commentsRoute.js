const express = require('express');
const router = express.Router();
const Comment = require('./models/Comment');
const Word = require('../Words/models/Word');

router.get('/', (req, res, next) => {
	Comment.find().then(comments => {
		//console.log(words);
		if(!comments.length) return res.send("No comments found");
		return res.status(200).json(({comments}));
	});
});

// router.post('/add-comment/:word', (req, res) => {
// 	Word.findOne({word: req.params.word})
// 	.then(word => {
// 		console.log(word);
// 		if(!word) return res.status(400).send('Word not found');
// 		console.log(word);
// 		const newComment = new Comment();
// 		newComment.comment = req.body.comment;
// 		newComment.save().then(showComment => {
// 			word.comments.push(showComment._id);
// 			word.save()
// 			.then(foundWord => res.json({ foundWord, showComment }));
// 		});
// 	});
// });

router.post('/add-comment/:word', (req, res, next) => {
	Word.findOne({ word: req.params.word })
	.then(foundWord => {
		console.log(foundWord);
		const newComment = new Comment();
		newComment.comment = req.body.comment;
		newComment.owner = foundWord._id;

		newComment.save().then(showComment => {
			foundWord.comments.push(showComment._id);
			foundWord.save()
			.then(word => {
				res.rendirect('/words/singleword' + word.word);
			});
		});
	});
});

router.get('/:wordId', (req, res) => {
	Comment.find({ owner: req.params.wordId})
	.populate('owner')
	.exec((err, foundComments) => {
		res.json({ foundComments });
	});
});

module.exports = router;