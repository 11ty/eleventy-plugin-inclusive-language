const pkg = require("./package.json");
const chalk = require("chalk");
const inclusiveLanguage = require("./inclusive-language");

module.exports = {
  initArguments: {},
  configFunction: function(eleventyConfig, options = {}) {
    try {
      eleventyConfig.versionCheck(pkg["11ty"].compatibility);
    } catch(e) {
      console.log( `WARN: Eleventy Plugin (${pkg.name}) Compatibility: ${e.message}` );
    }

    // TODO move this into default argument when 0.5.5 or newer is released
    /* {
      words: "simply,obviously,basically,of course,clearly,just,everyone knows,however,easy",
      templateFormats: ["md"]
    } */
    if(!options.words) {
      options.words = "simply,obviously,basically,of course,clearly,just,everyone knows,however,easy";
    }
    if(!options.templateFormats) {
      options.templateFormats = ["md"];
    }

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

      let found = inclusiveLanguage(content, words);

      if(found.length) {
        console.warn(chalk.yellow(`Inclusive Language Linter (${inputPath}):`));
        console.warn("    " + found.join("\n" + "    "));
      }
    });
  }
};
