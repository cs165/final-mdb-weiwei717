const express = require('express');
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');

const api = require('./routes/api.js');
const views = require('./routes/views.js');

const app = express();
const jsonParser = bodyParser.json();
const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

async function main()
{
  const DATABASE_NAME = 'cs193x-db';
  //const MONGO_URL = `mongodb://localhost:27017/${DATABASE_NAME}`;
  const MONGO_URL = 'mongodb+srv://wei71717:wei71717@cluster0-vgnav.mongodb.net/test?retryWrites=true&w=majority';
  // The "process.env.MONGODB_URI" is needed to work with Heroku.
  const cli = await MongoClient.connect(process.env.MONGODB_URI || MONGO_URL);
  const db = cli.database('cs193x-db');
  const diaries = db.collection('diaries');
  const entries = db.collection('entries');

  function setCollection(req, res, next)
  {
    req.diaries = diaries;
    req.entries = entries;
    next();
  }
  app.use(setCollection);
  app.use(api);
  app.use(views);

  // The "process.env.PORT" is needed to work with Heroku.
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Server listening on port ${port}!`);
};

main();
