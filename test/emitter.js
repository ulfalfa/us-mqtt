const MqttEmitter = require('../index').Emitter;
var chai = require('chai');
var expect    = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('Mqtt Emitter', function() {
  describe('subscriptions', function() {
    it('can be subscribed and unsubscribed', function() {
      var emitter = new MqttEmitter();
      function handler(topic, pattern, params, ...data) {

      };
      let retVal = emitter.on('foo/+/#', handler);

      emitter.removeListener('foo/+/#', retVal);

    });

    it('emits based on topic', function(done) {
      var emitter = new MqttEmitter();
      var spy = sinon.spy();
      function handler(topic, pattern, params, data) {
        expect(data).to.be.equal('hello world');
        emitter.removeListener('foo/+/#', handler);
        done();
      };
      emitter.on('foo/+/#', spy);
      emitter.on('foo/+/+/test', spy);
      emitter.on('foo/+/+/test', spy);
      emitter.emit('foo/bar/baz/test', 'hello world');
      expect(spy).to.have.been.calledThrice;
      expect(spy).to.have.been.calledWith({topic: 'foo/bar/baz/test',
        pattern: 'foo/+/#', params: ['bar','baz/test']}, 'hello world');
      expect(spy).to.have.been.calledWith({topic: 'foo/bar/baz/test',
        pattern: 'foo/+/+/test', params: ['bar','baz']}, 'hello world');
      done();

    });

  });

});
