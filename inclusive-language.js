const chalk = require("chalk");

module.exports = function(content, words) {
  let found = [];
  for( let word of words) {
    word = word.trim();
    let regexp = new RegExp("\\b(" + word + ")\\b", "gi");
    if(!!content.match(regexp)) {
      let split = content.split(regexp);
      for(let j = 0, k = split.length; j + 1 < k; j+=2) {
        found.push( split[j].substr(-30) + chalk.underline(split[j+1]) + split[j+2].substr(0, 30));
      }
    }
  }

  return found;
};