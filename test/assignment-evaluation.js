//Please write answer below each question

// 1. Given the objects below what is the value of a in obj1, obj2, obj3, obj4?
//    let obj1 = { a: 5 };
//    let obj2 = obj1;
//    let obj3 = obj2;
//    let obj4 = { a: 2 };
//    obj3.a = 200;
//    obj2.a = 123;

obj1.a == 123
obj2.a == 123
obj3.a == 123
obj4.a == 2

// 2. Copy this array into a new array and sort the array
//    Make sure you do not mutate the original array
//    Use spread operator if you know it
//    let arr = [1, 23, 2, 444, 3, 55, 32];
//    function sortArray() {}


function sortArray(arr) {
	let outArr = [];
	for(element of arr) {
		outArr.push(element);
	}
	return outArr.sort();
}



// 3. Copy these arrays into one new array
//    Make sure you do not mutate the original array
//    let arr = [1, 23, 2, 444, 3, 55, 32];
//    let arr2 = [4, 66, 33, 234];
//    function combineSorArrays() {}

function combineSorArrays(arr1, arr2) {
	let out = [];
	for(element of arr1) {
		out.push(element);
	}
	for(element of arr2) {
		out.push(element);
	}
	return out;
}




// 4. Using destructuring, create variables a and b out of the first two indexes in the array,
//    Add the rest of the indexes to a variable named c
//    let dArr = ['red', 'yellow', 'green', 'blue', 'orange', 'pink', 'indigo'];

[a, b, ...c] = dArr;





// 5. Declare variables from keys by destructuring this object except rename hobbies with the variable: likes
//    let obj = {
//    eyes: 'blue',
//    hair: 'green',
//    numHands: 2,
//    hobbies: [movies, reading, gaming]
//    };
// This array is for question 6, 7,8

({eyes, hair, numHands, likes} = obj)





// 6.  Write a function that lists every person's name in a string
//     function listOfNames() {}
function listOfNames(namesArr) {
	let out = [];
	for(element of namesArr) {
		out.push(element.name);
	}
	return out.join(", ");
}





// 7.  Given the same array add the total sum of years all people have worked
//     let namesArr = [
//     { name: 'Lucy', yearsWorked: 10, industry: 'law' },
//     { name: 'Jane', yearsWorked: 30, industry: 'energy' },
//     { name: 'Bill', yearsWorked: 23, industry: 'law' },
//     { name: 'John', yearsWorked: 21, industry: 'construction' }
//     ];
//     function sumYearsWorked() {}
function sumYearsWorked(namesArr) {
	let sum = 0;
	for(element of namesArr) {
		sum += element.yearsWorked;
	}
	return sum;
}

// 8.  Add the number of years only people in the law industry have worked
//     function sumLawyersWorked() {}
function sumLawyersWorked(namesArr) {
	let sum = 0;
	for(element of namesArr) {
		if(element.industry == "law") {
			sum += element.yearsWorked
		}
	}
}

// 9.  Create a class called Player that takes parameters name and yearsPlayed
//     - declare a function called describe that where if given that the name is 'Tom Brady' and yearsPlayed is 10, it should log: 'Tom Brady has played sports for 10 years'
//     - create a subclass called Football Player that inherits all functionality of Player
//     - It should also add parameters for sport and position.
//     - Create a function describePlayer that if given that name is "Tom Brady", sport is football, position is quarterback, and yearsPlayed is 10, The result should log:
//       'Tom Brady plays football and has been a quarterback for 10 years'
//     - create a new player called newPlayer that takes values: 'Eli Manning' and 10
//     - call the describe function on the new player
//     - create a new Basketball Player called newBasketballPlayer that takes values: 'Michael Jordan', 20, 'basketball', 'guard'
//     - console.log the new basketball player
//     - call the desribe function on the new basketball player
//     - call the describePlayer function on the new basketball player

class Player {
	constructor(name, yearsPlayed) {
		this.name = name;
		this.yearsPlayed = yearsPlayed;
	}
	describe() {
		if(this.name == "Tom Brady" && this.yearsPlayed == 10) {
			console.log("Tom Brady has played sports for 10 years");
		}
	}
};

class FootballPlayer extends Player {
	constructor(name, yearsPlayed, sport, position) {
		this.name = name;
		this.yearsPlayed = yearsPlayed;
		this.sport = sport;
		this.position = position;
	}
	describePlayer() {
		if(this.name == "Tom Brady" && this.yearsPlayed == 10 && this.sport == "football" && this.position == "quarterback") {
			console.log("Tom Brady plays football and has been a quarterback for 10 years");
		}
	}
}

let newPlayer = new Player("Eli Manning", 10);
newPlayer.describe();
let newBasketballPlayer = new Player("Michael Jordan", 20, "basketball", "guard");
console.log(newBasketballPlayer);
newBasketballPlayer.describe();


// 10. Using recursion given a number, add the sum of the numbers from the given number to 0
//     e.g. if given number is 3 the result should be 6, given number is 10, result should be (55)
//     If you cannot use recursion then use an iterative approach of your choosing.
function recur(num) {
	return recur((num - 1) > 0) + num;
}


// 11. given number in an array, use map to square each number arr=[2,3,4,5] should be [4,9,16,25]
//     Possible solution:
arr.map(input => input * input);


// 12. given an array of numbers, use reduce to multiply the product of the previous numbers. [1,2,3,4] should be 24
arr.reduce(function(total, currentValue) {
	return total * currentValue;
})

// 13. given an array of objects, return the objects in an array whose id is not equal to 1
//     let arr = [
//     { id: 1, name: 'joe' },
//     { id: 2, name: 'paul' },
//     { id: 3, name: 'ann' }
//     ];
//     should return [ { id: 2, name: 'paul' }, { id: 3, name: 'ann' } ]
function notOne(arr) {
	let out = [];
	for(element of arr) {
		if(element.id != "1") {
			out.push(element);
		}
	}
	return out;
}


// 14. given an array of strings, write a function that creates a new arrray that lists the strings in reverse. Use any array method use choose.
//     let arr = ['apple', 'banana', 'orange']; should return ['orange','banana','apple']
function reverse(strings) {
	let newStrings = [];
	for(str of strings) {
		newStrings.push(str);
	}

	for(let i = 0, j = newStrings.length - 1; i < Math.round(newStrings.length / 2); i++, j--) {
		let tmp = newStrings[j];
		newStrings[j] = newStrings[i];
		newStrings[i] = tmp;
	}

	return newStrings;
}