var express = require('express');
const { fstat } = require('fs');
const { default: Axios } = require('axios');
var router = express.Router();
const fs = require('fs');
const axios = require('axios');
const redis = require('redis');
const myData = require('../data/myData.json');

const REDIS_PORT = 6379;
const client = redis.createClient(REDIS_PORT);

const seconds = 5;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const storeData = async (data, jsonPath) => {
  try {
    await fs.createWriteStream(jsonPath).write(JSON.stringify(data));
  } catch(error) {
    console.log(err);
  }
}

router.get('/random', async (req, res, next) => {
  try {
    const url = 'https://randomuser.me/api/?results=50';
    const currentDate = await Date.now();
    const jsonDate = Object.values(myData)[0];
    if (!myData.data || +currentDate > +jsonDate + 5000) {
      const result = await axios.get(url);
      const webData = result.data;
      let storeIt = {};
      storeIt.date = currentDate;
      storeIt.data = webData;
      await storeData(storeIt, './data/myData.json');
      res.json({ message: 'from db', data: webData });
    } else {
      res.json({ message: 'from cache', data: myData });
    }
  } catch (error) {
    next(error);
  }
});


const checkForData = async (req, res, next) => {
  try {
    await client.get('redisData', async (err, info) => {
      if(err) {
        return next(err);
      }

      if(info == null) {
        console.log("null call");
        return next();
      }



      const currentDate = await Date.now();
      const parsedData = await JSON.parse(info);
      const redisDate = parsedData.date;
  
      if(+currentDate < +redisDate + seconds * 1000) {
        return res.json({message: 'from cache', data: parsedData});
      }
  
      next();
    });  
  } catch(error) {
    next(error);
  }  
}

router.get('/random-redis', checkForData, async (req, res, next) => {
  try {
    const url = 'https://randomuser.me/api/?results=10';
    const currentDate = await Date.now();
    const result = await axios.get(url);
    const webData = result.data;
  
    let newData = {};
    newData.date = currentDate;
    newData.data = webData;
  
    await client.setex('redisData', seconds, JSON.stringify(newData));
    res.json({message: 'from db', newData});  
  } catch(err) {
    next(err);
  }
});

module.exports = router;
