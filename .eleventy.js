const chalk = require("chalk");

module.exports = {
  initArguments: {},
  configFunction: function(eleventyConfig, options = {
    words: "simply,obviously,basically,of course,clearly,just,everyone knows,however,easy",
    templateFormats: ["md"]
  }) {
    eleventyConfig.addLinter("inclusive-language", function(content, inputPath, outputPath) {
      let words;
      if(Array.isArray(options.words)) {
        words = options.words;
      } else if(typeof options.words === "string") {
        words = options.words.split(",");
      } else {
        throw new Error("Invalid type for options.words (needs string or array) in eleventy-plugin-inclusive-language");
      }

      if(!Array.isArray(options.templateFormats)) {
        throw new Error("Invalid type for options.templateFormats (needs array) in eleventy-plugin-inclusive-language");
      }

      let checkThisFile = false;
      for( let format of options.templateFormats ) {
        if( inputPath.endsWith("." + format) ) {
          checkThisFile = true;
          break;
        }
      }
      if( !checkThisFile ) {
        return;
      }

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

      if(found.length) {
        console.warn(chalk.yellow(`Inclusive Language Linter (${inputPath}):`));
        console.warn("    " + found.join("\n" + "    "));
      }
    });
  }
};
