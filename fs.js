let fs = require('fs');
let data = fs.readFileSync('lorem.txt', 'utf-8', (err, info) => {
	if(err) return console.log("error");
	console.log(info);
});

console.log(data);
fs.writeFileSync('output.txt', data, 'utf-8');