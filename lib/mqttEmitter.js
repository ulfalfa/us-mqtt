'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Matcher = require('./mqttMatcher');

var MqttEmitter = function () {
  function MqttEmitter() {
    _classCallCheck(this, MqttEmitter);

    this._handlers = new Map();
  }

  _createClass(MqttEmitter, [{
    key: 'on',
    value: function on(topicPattern, listener) {

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
  }, {
    key: 'once',
    value: function once(topicPattern, callback) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var emitter = void 0;
        function handler(match) {
          emitter.removeListener(topicPattern, handler);

          for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            values[_key - 1] = arguments[_key];
          }

          if (callback) {
            callback.apply(undefined, [match].concat(values));
          } else {
            resolve([match].concat(values));
          }
        }
        emitter = _this.on(topicPattern, handler);
      });
    }
  }, {
    key: 'removeListener',
    value: function removeListener(topicPattern, aListener) {
      var handler = this._handlers.get(topicPattern);
      handler.listeners = handler.listeners.filter(function (listener) {
        return aListener !== listener;
      });

      return this;
    }
  }, {
    key: 'emit',
    value: function emit(topic) {
      for (var _len2 = arguments.length, data = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        data[_key2 - 1] = arguments[_key2];
      }

      this._handlers.forEach(function (handler, pattern) {
        var params = handler.matcher.match(topic);
        if (params) {
          handler.listeners.forEach(function (listener) {

            listener.apply(undefined, [{ topic: topic, pattern: pattern, params: params }].concat(data));
          });
        }
      });

      return this;
    }
  }]);

  return MqttEmitter;
}();

module.exports = MqttEmitter;