const express = require('express');
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');

const router = express.Router();
const jsonParser = bodyParser.json();

async function onCreateDiary(req, res)
{
  const response = await req.diaries.insertOne({});
  res.json({ id: response.insertedId });
}
router.post('/create', jsonParser, onCreateDiary);

async function onSaveDiary(req, res)
{
  const id = req.body.id;
  const date = req.body.date;
  const content = req.body.content;

  const query = { diaryID: id, date: date };
  const newEntry = { diaryID: id, date: date, content: content };
  const params = { upsert: true };
  const response = await req.entries.update(query, newEntry, params);
  const updatedId = id || response.id;

  res.json({ id: updatedId });
}
router.post('/save', jsonParser, onSaveDiary);

async function onLoadDiary(req, res)
{
  const id = req.params.id;
  const date = req.params.year + '/' + req.params.month + '/' + req.params.day;
  const query = { diaryID: id, date: date };
  const result = await req.entries.findOne(query);
  res.json(result);
}
router.get('/id/:id/:year/:month/:day', onLoadDiary);

module.exports = router;
