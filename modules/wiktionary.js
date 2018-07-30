const axios = require('axios');
const cheerio = require('cheerio');
const wiktionary = require('wiktionary');
const cheerioTableparser = require('cheerio-tableparser');
const debug = require('debug')('uchjoby:wiktionary');

// const REPEATER_URL = 'http://unique-shoe.glitch.me/';
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
    const $ = cheerio.load(res.html);
    const ret = {};
    ret.pronunciation = $('#Pronunciation').parent().next().children().first().text();
    ret.pronunciation = ret.pronunciation.replace('(key)', '');
    // res.meaning = $('#Verb').parent().next();
    debug("RET", ret)
    return res.html;
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
