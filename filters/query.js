module.exports = function(q) {
  return function(d) {
    d['query'] = q;
    return d;
  }
}