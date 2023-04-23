const express = require('express');
const app = express();
const { Joke } = require('./db');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/jokes', async (req, res, next) => {
  try {
    // TODO - filter the jokes by tags and content
    const { id, joke } = req.query;
    let arr;
    
    if(id){
      arr = await Joke.findByPk(id)
    } else if (joke){
      const array = await Joke.findAll()
      arr = array.filter(obj => obj.joke.includes(joke))
    } else {
      arr = await Joke.findAll()
    }
    
    
    res.send(arr);
  } catch (error) {
    console.error(error);
    next(error)
  }
});

// we export the app, not listening in here, so that we can run tests
module.exports = app;
