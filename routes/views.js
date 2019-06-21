const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const router = express.Router();

async function onViewDiary(req, res)
{
  const id = req.params.id;
  const hex = /^[0-9a-fA-F]{24}$/g;

  if((id.length===24 || id.length===12) && hex.test(id))
  {
    const query = { _id: ObjectID(id) };
    const result = await req.diaries.findOne(query);
    if(result)
    {
      res.render('diary');
    }
    else
    {
      res.render('menu');
    }
  }
  else
  {
    res.render('menu');
  }
}
router.get('/id/:id', onViewDiary);

function onViewIndex(req, res)
{
  res.render('menu');
}
router.get('/', onViewIndex);

module.exports = router;
