const axios = require('axios');
const cheerio = require('cheerio');
const wiktionary = require('wiktionary');
const cheerioTableparser = require('cheerio-tableparser');
const debug = require('debug')('uchjoby:wiktionary');

/**
 * URLS NEEDED FOR TABLE REQUEST
 */
const REPEATER_URL = 'http://0.0.0.0:8080/';
const BASE_URL = 'https://en.wiktionary.org/wiki/';


const word = {
  request: word => {
    debug('Requesting word', word);
    return wiktionary(word);
  },
  parse: res => {
    if (!res || !res.html) return null;
    debug('parsing response');
    const $ = cheerio.load(`<body>${res.html}</body>`);
    const ret = {};

    // Separte russian section
    const rusInit = $('body').children().index($('h2 > #Russian').parent());
    const rusLen = $('body').children().slice(rusInit).index(
      // +1 to skip first h2
      $('body').children().slice(rusInit + 1).find('h2 > span').first().parent()
    );
    const rusSection = $('body').children().slice(rusInit, rusLen === -1 ? undefined : rusInit + rusLen);

    // Get Pronunciation
    try {
      ret.pronunciation = rusSection.find('#Pronunciation').parent().next().children().first().text().replace(/\n/g, '').replace('(key)', '');
    } catch(err) {
      console.log('pronunciation field error');
      debug(err.message || err);
    }

    // Get main
    try {
      ret.main = rusSection.filter('p').first().text().replace(/\n/g, '');
    } catch(err) {
      console.log('main field error');
      debug(err.message || err);
    }

    // Get extra
    try {
      // TODO: remove('dl') isn't working for some reason
      ret.extra = rusSection.remove('dl').filter('ol').first().children().map(function (i, e) {
        return $(this).text();
      }).get().map(s => s.replace(/\n/g, ''));
      // debug(rusSection.remove('dl').filter('ol').first().children())
    } catch(err) {
      console.log('extra field error');
      debug(err.message || err);
    }
    debug('returning', ret);
    return ret;
  },
}


const table = {
  request: word => {
    const target = REPEATER_URL + BASE_URL + word.toLowerCase();
    debug('requesting', target);
    return axios.get(target);
  },
  scrape: response => {
    debug('scraping data');
    let $ = cheerio.load(response.data);
    // Single out ande wrap target in table tag
    debug('scraping data', $(".inflection-table").html());
    $ = cheerio.load('<table id="target-table">' + $(".inflection-table").html() + '</table>')
    cheerioTableparser($);
    return $("#target-table").parsetable(true, true, true);
  },
  parse: inflectionTable => {
    debug('parsing data', inflectionTable);
    //Transpose table
    inflectionTable = inflectionTable[0].map((row, i) => inflectionTable.map(col => col[i]));
  
    //Filter out pronunciation stuff
    inflectionTable = inflectionTable.map( (row) => row.map( (cell) => {
        const cellChars = cell.trim().split('');
        if( !cellChars.length || !/[а-яА-ЯЁёа́е́и́о́у́ы́э́ю́я́]/.test(cellChars[0]) ) return cell;
        
        return cellChars.filter( (c) =>  /[а-яА-ЯЁёа́е́и́о́у́ы́э́ю́я́,-\s]/.test(c)).join('')
    }));
  
    return inflectionTable;
  },
}


module.exports = {
  table,
  word,
};
