var Emitter = require('emitter')
  , events = require('event')
  , Rickshaw = require('rickshaw');

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
  var w = createOrderedArray(split);
  
  var uniqueWords = w[0];
  var words = w[1];

  var graph = new Rickshaw.Graph({
    element: document.querySelector("#chart"),
    renderer: 'bar',
    series: [{
      data: prepareData(words, uniqueWords),
      color: 'steelblue'
    }]
  });
   
  graph.render();

  var hoverDetail = new Rickshaw.Graph.HoverDetail( {
    graph: graph
  });

  var xAxisQPerDay = new Rickshaw.Graph.Axis.X({
    graph: graph,
    tickFormat: function(x) {
      return uniqueWords[x];
    }
  });
  xAxisQPerDay.render();
  graph.update();

  prettyOutput(uniqueWords, words);
}

function prepareData (words, uniqueWords) {
  arr = [];
  for (i = 0; i < uniqueWords.length; i++) {
    arr.push({
      name: uniqueWords[i],
      x: i,
      y: words[uniqueWords[i]]
    });
  }
  return arr;
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

  // now sort unique words by count
  uniqueWords.sort(function(a, b){
    return words[b] - words[a]; // ASC -> a - b; DESC -> b - a
  });

  return [uniqueWords, words];
}

function prettyOutput (uniqueWords, words) {
  // output
  for (i = 0; i < uniqueWords.length; i++) {
    console.log(uniqueWords[i], words[uniqueWords[i]]);
  }
}




