var fs = require("fs"),
    http = require("http"),
    request = require("request"),
    url = require("url"),
    md5 = require("MD5"),
    helpers = require("./helpers"),
    Firebase = require("firebase");

http.createServer(responseHandler).listen(8888);

var fbRef = new Firebase("https://collin-node-test.firebaseio.com/");

function responseHandler(req, res){
  if (req.url === "/"){
    res.end("type gravatarUrl/your@email.com, Calc/2+3 or Counts/sentence");
  } else {
    fbRef.push(req.url);
    var operand = helpers.grab(req.url);
    if (req.url.match(/\/gravatarUrl.+/i)){
      res.end("www.gravatar.com/avatar/" + md5(operand));
    } else if (req.url.match(/\/Calc.+/i)){
      var string = JSON.stringify(helpers.doMath(operand));
      res.end(string);
    } else if (req.url.match(/\/Counts.+/i)){
      var counts = JSON.stringify(helpers.counter(operand));
      res.end(counts);
    }
  }
}
