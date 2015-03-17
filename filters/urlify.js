module.exports = function(str) {
  // Return a string that has been munged to be URL-safe.
  // This is not the same as URL encoding.
  //
  // 1. Replace spaces with hyphens
  // 2. Replace any character that is not alphanumeric or allowed punctuation
  //    with the empty string (Allowed punctuation includes hyphens, forward
  //    slashes, and periods)
  // 3. Remove periods or commas that preceed a slash or hyphen
  // 4. Transform the string to lower case
  var result = str.replace(/ /g, "-").replace(/[^A-Za-z0-9-\/\.]/g, "");
  return result.replace(/[.,]([/-])/g, "$1").toLowerCase();
}
