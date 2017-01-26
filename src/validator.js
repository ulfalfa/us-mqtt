const validTopicRegexp = /^[^#\+]+$/;
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
  return validTopicRegexp.test(topic);
}


module.exports = {
  validTopic: validTopic,
  join: join,
  split:split,
  slice:slice
  /*,
  validPattern: validPattern,
  isPattern: isPattern*/
};
