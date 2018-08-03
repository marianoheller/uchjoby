const express = require('express');
const router = express.Router();
const debug = require('debug')('uchjoby:api-routes');

const wiktionary = require('../modules/wiktionary');
const translate = require('../modules/translate');
const randomWord = require('../modules/randomWord');



/**
 * Gets random words (from the wordlists) IN ENGLISH
 */
router.get('/word/random', function(req, res) {
  randomWord({
    type: req.query.type,
    qty: Number(req.query.qty) || 1,
  })
  .then(words => {
    res.json(words)
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
  if( !req.query.words || !Array.isArray(req.query.words) ) {
    debug('no words to translate or wrong format');
    return res.sendStatus(400);
  }
  Promise.all(req.query.words.map(w => translate(w)))
  .then(translations => {
    debug("GOT TRANSLATIONS", translations);
    res.json(translations);
  })
  .catch( (err) => {
    debug('translation errored');
    console.log(err.message || err);
    res.status(500).send(err.message || err);
  });
});


/**
 * Gets inputs word-info from wiktionary
 * req.query.words is an array of words
 */
router.get('/word', function(req, res) {
  if( !req.query.words || !Array.isArray(req.query.words) ) {
    debug('no words or wrong type');
    return res.sendStatus(400);
  }
  Promise.all(req.query.words.map(w => (
    wiktionary.word.request(w)
    .then(wiktionary.word.parse)
  )))
  .then(infos => res.json(infos)) // return infos array
  .catch( (err) => {
    debug('wiktionary errored');
    console.log(err.message || err);
    res.status(500).send(err.message || err);
  });
});


module.exports = router;