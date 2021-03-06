const translate = require('translate');
const debug = require('debug')('uchjoby:translate');


module.exports = wordInput => {
  debug('translating word', wordInput);
  return translate(wordInput, {
      from: 'en',
      to: 'ru',
      engine: 'yandex',
      key: process.env.YANDEX_KEY  
  });
}
