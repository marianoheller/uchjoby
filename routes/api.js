const express = require('express');
const router = express.Router();
const debug = require('debug')('uchjoby:api-routes');

const translate = require('../modules/translate');
const randomWord = require('../modules/randomWord');
const wiktionary = require('../modules/wiktionary');


router.get('/word', function(req, res) {
  if( !req.query.input ) {
    debug('no input for wiktionary');
    return res.sendStatus(400);
  }
  wiktionary.word.request(req.query.input)
  .then(wiktionary.word.parse)
  .then(data => res.send(data))
  .catch( (err) => {
    debug('wiktionary errored', err.message || err);
    console.log(err.message || err);
    res.status(500).send(err.message || err);
  });
});

router.get('/word/random', function(req, res) {
  randomWord(req.query.input)
  .then(text => {
    debug('got random word', text);
    res.json({ output: text });
  })
  .catch( (err) => {
    debug('random word errored');
    console.log(err);
    res.status(500).send(err.message || err);
  });
});

router.get('/translate', function(req, res) {
  if( !req.query.input ) {
    debug('no input to translate');
    return res.sendStatus(400);
  }
  translate(req.query.input)
  .then(text => {
    debug('translation succeded', text);
    res.json({ output: text });
  })
  .catch( (err) => {
    debug('translation errored');
    console.log(err);
    res.status(500).send(err.message || err);
  });
});


module.exports = router;
