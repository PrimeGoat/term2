//1.
// Given the promise below.
// Use async await to write a function 'getOrder'.
// It should consume the promise and return its value.
// call the function and log the value
// If orderCannotBeFullfilled is true you should see an error
// If orderCannotBeFullfilled is false you should see:
// Server says: "I'll be right back with your Slurpy"
// Server returns: "Here is your Slurpy"
const order = "Slurpy";
const drink = new Promise((resolve, reject) => {
  console.log(`Server says: "I'll be right back with your ${order}"`);
  const orderCannotBeFilled = false;
  if (orderCannotBeFilled) {
    setTimeout(() => {
      reject();
    }, 2000);
  } else {
    setTimeout(() => {
      resolve(`Server returns: "Here is your ${order}"`);
    }, 4000);
  }
});






//2.
//Use async/await
// Write a function that takes 3 promises and a subject and logs each function in the
// right order
// Function should be reusable
function needToStart(subject) {
  return new Promise((resolve) => {
    setTimeout(resolve, 3000, `I need to start ${subject}`);
  });
}
function working(subject) {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000, `I'm practicing my ${subject} now`);
  });
}
function finished(topic) {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000, `I have finished my ${topic} finally!`);
  });
}






//3.
//The problem below uses callbacks
//Refactor the functions into promises
//Create a reusable function 'listPlaces' to run the promises
//The output should be the same as you get when you run the addPlace function below
//PART TWO
//Now by creating a function listPlaces2, use aync/await to create the same output
//Create a function 'listPlaces2' that has the same outcome.
let places = [
  { name: "Joe's Pizza", address: "285 Madison" },
  { name: "Dunkin Donuts", address: "299 42nd St" },
];
const murrays = { name: "Murray's Steakhouse", address: "1222 Lexington Ave" };
function addPlace(object, array, callback) {
  setTimeout(() => {
    array.push(object);
    callback(array);
  }, 4000);
}
function httpPlaces(array) {
  setTimeout(() => {
    array.forEach((item) => {
      console.log(item);
    });
  }, 3000);
}
addPlace(murrays, places, httpPlaces);






//4.
//You will write 3 functions for this exercise getManyUsers1(){},getManyUsers2(){},getManyUsers3(){}
// Instructions for each function are below.
//Go to https://randomuser.me and check out the documentation for Seeds
//Use the seeds endpoint for this exercise.
//The seed value should not be hard coded and should be a variable each time that is concatenated to the endpoint.
// Each function will take 3 names as Parameters name1, name2, name3
// Make your api call properly to get the data
// Use axios
// Function 1: PROMISE CHAINING
// Using promise chaining, Call the first name then log the email and then pass the value of making an api call on the second name.
//Next log the second name's email then return the result of calling the third name.
//Next log the email of 3rd name.
// Second function:
// Do the same thing using async await. Instead of passing values. Create variables for each value and log the email of each value. Output should look the same. Handle errors
// Third function:
// Do the same thing using Promises.all