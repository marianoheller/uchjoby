const express = require('express');
const router = express.Router();
const debug = require('debug')('uchjoby:api-routes');

const wiktionary = require('../modules/wiktionary');
const translate = require('../modules/translate');
const randomWord = require('../modules/randomWord');


/**
 * Gets input word info from wiktionary
 */
router.get('/word', function(req, res) {
  if( !req.query.input ) {
    debug('no input');
    return res.sendStatus(400);
  }
  wiktionary.word.request(req.query.input)
  .then(wiktionary.word.parse)
  .then(data => {
    debug('got data', data);
    res.json(data);
  })
  .catch( (err) => {
    debug('wiktionary errored');
    console.log(err.message || err);
    res.status(500).send(err.message || err);
  });
});

/**
 * Gets a random words (from the wordlists)
 */
router.get('/word/random', function(req, res) {
  randomWord({
    type: req.query.type,
    amount: Number(req.query.amount),
  })
  .then(wordsArr => {
    debug('got random words', wordsArr);
    res.json(wordsArr);
  })
  .catch( (err) => {
    debug('random word errored');
    console.log(err.message || err);
    res.status(500).send(err.message || err);
  });
});


/**
 * Translates an english word to russian
 */
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
    console.log(err.message || err);
    res.status(500).send(err.message || err);
  });
});

module.exports = router;