const axios = require('axios');
const getch = require('node-fetch');

//axios.get('https://randomuser.me/api/?results=10')
axios.get("https://api.themoviedb.org/3/movie/now_playing?api_key=10e36f8ced8690d13fa1aa62ada50076&language=en-US&page=1")
.then(data => console.log(data.data))
.catch(error => console.log(error));

