const validTopicRegexp = /^[^#\+]+$/;
function validTopic(topic) {
  return validTopicRegexp.test(topic);
}

function isPattern(pattern) {
  console.log('isPattern', pattern);
  var tokens = pattern.split('/');
  let retVal =  (tokens.find(token=> {
      return ((token !== '+' ||
        token !== '#') &&
        (token.indexOf('#') !== -1 ||
        token.indexOf('+') !== -1)
      );

    }));
  console.log('*' + retVal + '*');
  return retVal === undefined;
};
function validPattern(pattern) {
  return validTopic(pattern) || isPattern(pattern);
}

module.exports = {
  validTopic: validTopic
  /*,
  validPattern: validPattern,
  isPattern: isPattern*/
};
