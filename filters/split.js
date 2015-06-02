/*
  This implementation exists just to tag the function with the name 'split'.
  The route logic in eybeam.js includes a special case for splitting pipeline
  output from a single list to a mappable list that is activated with this
  dummy function.
*/
function split() {};
module.exports = split;
