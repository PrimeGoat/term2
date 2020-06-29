const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

const url = 'mongodb://localhost:27017'

const client = new MongoClient(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});


client.connect().then((client) => {
	const db = client.db('firstdb');

	// Comparison operators:
	// $gt $lt $ne $gte $and $or

	//let check = {name: 'Volkswagen'};
	//let check = {price: {$gt: 40000}};

	// let check = {
	// 	$and: [
	// 		{
	// 			price: {
	// 				$gt: 50000
	// 			}
	// 		},
	// 		{
	// 			price: {
	// 				$lt: 360000
	// 			}
	// 		}
	// 	]
	// };

	//let agg = [{$group: {_id:'1', sumCars: {$sum: "$price"}}},];
	let agg = [
		{ $match: { $or: [{name: 'Volkswagen'}, {name: 'Volvo'}]}},
		{ $group: {_id: 1, sumCars: { $sum: '$price'}}}
	]

	db.collection('cars')
		.aggregate(agg)
		//.find(check)
		//.find(agg)
		// .find().project({ // projects certain properties
		// 	_id: 0
		// }).skip(2).limit(3)
		.toArray()
		.then(val => console.log(val))
	//db.collection('cars').findOne(check).then(val=>console.log(val))

	/*
	db.collection('cars').find({}).toArray().then(val=>console.log(val));*/

	/*
	db.stats((err, stats) => {
		if(err) throw err;
		console.log(stats);
	})*/

/*	db.listCollections()
		.toArray()
		.then((docs) => {
		docs.forEach((doc) => console.log(doc));
		})*/
		.catch((err) => console.log(err))
		.finally(() => {
		client.close();
	});
});