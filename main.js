var helpers = {};

helpers.grab = function(suffix){
  return suffix.match(/\/[^\/]+\/(.+)/)[1];
};

helpers.doMath = function(numbers){
  var equation = numbers.match(/(\d+)(\D+)(\d+)/);
  var num1 = Number(equation[1]);
  var num2 = Number(equation[3]);
  var operator = equation[2];
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
    case "**":
      return Math.pow(num1, num2);
  }
};

helpers.counter = function(sentence){
  var counts = {};
  var words = sentence.split("%20");
  counts.spaces = words.length - 1;
  counts.words = words.length;
  counts.letters = sentence.split(/[^a-z]+/i).join("").length;
  return counts;
};

var fs = require("fs"),
    http = require("http"),
    request = require("request"),
    url = require("url"),
    md5 = require("MD5");

http.createServer(responseHandler).listen(8888);

function responseHandler(req, res){
  if (req.url === "/"){
    res.end("type gravatarUrl/your@email.com, Calc/2+3 or Counts/sentence");
  } else if (req.url.match(/\/gravatarUrl.+/i)){
    var email = helpers.grab(req.url);
    res.end("www.gravatar.com/avatar/" + md5(email));
  } else if (req.url.match(/\/Calc.+/i)){
    var numbers = helpers.grab(req.url);
    var string = JSON.stringify(helpers.doMath(numbers));
    res.end(string);
  } else if (req.url.match(/\/Counts.+/i)){
    var sentence = helpers.grab(req.url);
    var counts = JSON.stringify(helpers.counter(sentence));
    res.end(counts);
  }
}
