const fs = require("fs");
const path = require("path");
const debug = require('debug')('uchjoby:randomWord');

const PATH_DICTS = 'dictionaries';

const getRandomWord = ({ type, amount }) => {
  if (!amount) {
    amount = 1;
  }
  return new Promise((resolve, reject) => {
    try {
      var files = fs.readdirSync(PATH_DICTS).filter(f => f.endsWith('.json'));
    } catch(err) {
      debug(err)
      reject(`Could not read directory ${PATH_DICTS}`);
    }
    if (!type) {
      type = files[Math.floor(Math.random() * files.length)];
      type = type.substring(0, type.length - 5);
    }
    // Check if type is valid
    const targetFile = files.find( file => file === `${type}.json`);
    if (!targetFile) {
      debug(`type not found, got ${type}`);
      return reject('Type not found');
    }
    debug('loading file', targetFile);
    fs.readFile(path.join(PATH_DICTS, targetFile), 'utf8', function (err, data) {
      if(err) {
        debug("cannot read the file, something goes wrong with the file", err);
        return reject('Error reading file');
      }
      const objArr = JSON.parse(data);
      resolve(Array(amount).fill(0).map(() => (
        objArr[Math.floor(Math.random() * objArr.length)]
      )));
    });
  });
}


module.exports = getRandomWord;
