const Matcher = require('./mqttMatcher');

class MqttEmitter  {
  constructor () {
    this._handlers = new Map();
  }

  on (topicPattern, listener) {

    var handler = this._handlers.get(topicPattern);
    if (!handler) {
      handler = {
        matcher: Matcher(topicPattern),
        listeners: []
      };
      this._handlers.set(topicPattern, handler);
    }
    handler.listeners.push(listener);

    return this;
  }

  removeListener(topicPattern, aListener) {
    var handler = this._handlers.get(topicPattern);
    handler.listeners = handler.listeners
      .filter(listener=>(aListener !== listener));
  }

  emit (topic, ...data) {
    this._handlers.forEach((handler,pattern)=> {
        let params = handler.matcher.match(topic);
        if (params) {
          handler.listeners.forEach(listener=> {

            listener(topic, pattern, params, ...data);
          });
        }
      });

  }
}

module.exports = MqttEmitter;
