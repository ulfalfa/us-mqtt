const VALID_TOPIC = /^[^#\+]+$/;
const VALID_PATTERN =
  /^(([\+#]{1}|[^\+#]*)\/)?(([\+#]{1}|[^\+#]*)\/{1})*(([\+#]{1}|[^\+#]*))$/;
const MQTT_SEP = '/';

function join(...topics) {
  return topics.join(MQTT_SEP);
}

function split(topic) {
  return topic.split(MQTT_SEP);
}

function slice(topic, index, count, ...members) {
  return join(...split(topic).slice(index,count, ...members));
}

function validTopic(topic) {
  return VALID_TOPIC.test(topic);
}

function validPattern(pattern) {
  return VALID_PATTERN.test(pattern);
}

function isPattern(pattern) {
  return !validTopic(pattern) && validPattern(pattern);
}


module.exports = {
  validTopic: validTopic,
  join: join,
  split:split,
  slice:slice,
  validPattern: validPattern,
  isPattern: isPattern
};
