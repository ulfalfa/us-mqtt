function MqttMatcher(topicPattern) {

  let regexp = new RegExp('^' +
      topicPattern.replace(/\+/g, '([^\/]*)').replace(/#/g, '(.*?)') + '$');

  return {
    test: (aString=> {
      return regexp.test(aString);
    }),
    match: (aString=> {
      let matches =  regexp.exec(aString);

      if (matches) {
        var params = [];
        for (var i = 1;
             i < matches.length && typeof matches[i] === 'string';
             i++) {
          params.push(matches[i]);
        }
        return params;

      } else {
        return null;
      }
    }),
    regexp:  regexp
  };
}

module.exports = MqttMatcher;
