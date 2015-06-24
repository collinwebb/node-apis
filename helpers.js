var helpers = {};

helpers.grab = function(suffix){
  return suffix.match(/\/[^\/]+\/(.+)/)[1];
};

helpers.doMath = function(numbers){
  var equation = numbers.match(/(\d+)([*\+\-\/]+)(\d+)/);
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

module.exports = helpers;
