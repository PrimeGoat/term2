const express = require('express');
const router = express();
const Stocks = require("./models/Stocks");

router.get('/', (req, res, next) => {
	Stocks.find()
	.then(foundStocks => {
		if(!foundStocks.length) return res.status(400).send("No Stocks found");
		return res.render('stocks', {stocks: foundStocks});
	});
});

router.post('/add-stock', (req, res) => {
	let newStock = new Stocks();
	const {name, symbol, price} = req.body;

	newStock.name = name;
	newStock.symbol = symbol;
	newStock.price = price;

	newStock.save()
	.then(createdStock => {
		res.json({ stock: createdStock });
	});
});

router.get('/update-stock/:id', (req, res) => {
	Stocks.findById({_id:req.params.id})
	.then(foundStock => {
		if(foundStock) {
			res.render('update-stock', { stocks: foundStock });
		}
	});
});

router.put('/update-stock/:id', (req, res) => {
	Stocks.findById({_id: req.params.id})
	.then(foundStock => {
		if(foundStock) {
			console.log(req.body);
			const updatedStock = req.body;

			foundStock.name = updatedStock.name || foundStock.name;
			foundStock.symbol = updatedStock.symbol || foundStock.symbol;
			foundStock.price = updatedStock.price || foundStock.price;
			foundStock.save()
			.then(newStock =>
				res.json({ stock: newStock }));
		}
	});
});

module.exports = router;