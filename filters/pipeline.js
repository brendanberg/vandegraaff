module.exports = function () {
  var args = Array.prototype.slice.call(arguments);
  var ctx = this;

  return args.reduce(function(previous, current) {
    if (current.name === "join") {
      return [previous];
    } else if (previous && previous.map) {
      return previous.map(function(p) { return current.call(ctx, p); });
    } else {
      return current.call(ctx, previous);
    }
  }, true);
}

