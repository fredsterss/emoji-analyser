var Emitter = require('emitter')
  , events = require('event');

/**
 * Expose Emoji Analyser
 */
module.exports = EmojiAnalyser;

function EmojiAnalyser (el) {
  if (!(this instanceof EmojiAnalyser)) return new EmojiAnalyser(el);
  this.bind(el);
}

EmojiAnalyser.prototype.bind = function (el) {
  events.bind(el, 'keypress', function (e) {
    if (e.keyCode == 13) {
      analyse(el.value);
    }
  });
}

function analyse (string) {
  var split = string.toLowerCase().split(/\s/g);
  var words = createOrderedArray(split);
}

function createOrderedArray (arr) {
  var uniqueWords = []
    , words = {};

  // add to helper array
  for (i= 0; i < arr.length; i++) {
    word = arr[i];
    if (uniqueWords.indexOf(word) !== -1) {
      words[word] = words[word] + 1;
    } else {
      words[word] = 1;
      uniqueWords.push(word);
    }
  }

  // now sory unique words by count
  

  return words;
}





