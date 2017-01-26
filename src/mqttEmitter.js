const Matcher = require('./mqttMatcher');

class MqttEmitter  {
  constructor () {
    this._handlers = new Map();
  }

  get handlers () {
    let retVal = [];
    this._handlers.forEach((value,key)=>{

      retVal.push(key+':'+value.listeners.length);
    });
    return retVal;
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

  once(topicPattern, callback) {
    return new Promise((resolve,reject)=> {
      let emitter;
      function handler(match, ...values) {
        emitter.removeListener(topicPattern, handler);
        if (callback) {
          callback(match, ...values);
        } else {
          resolve([match, ...values]);
        }
      }
      emitter = this.on(topicPattern, handler);
    });
  }

  removeListener(topicPattern, aListener) {
    var handler = this._handlers.get(topicPattern);
    handler.listeners = handler.listeners
      .filter(listener=>(aListener !== listener));

    return this;
  }

  emit (topic, ...data) {
    this._handlers.forEach((handler,pattern)=> {
        let params = handler.matcher.match(topic);
        if (params) {
          handler.listeners.forEach(listener=> {

            listener({topic: topic, pattern: pattern, params: params}, ...data);
          });
        }
      });

    return this;
  }


}

module.exports = MqttEmitter;
