/*
  This implementation exists just to tag the function with the name 'join'.
  The route logic in eybeam.js includes a special case for joining pipeline
  output into a single list that is activated with this dummy function.
*/
function join() {};
module.exports = join;
