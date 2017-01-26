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
        emitter.on('foo/bar/baz/test', spy)
        emitter.emit('foo/bar/baz/test', 'hello world');
        expect(spy).to.have.callCount(4);
        expect(spy).to.have.been.calledWith({topic: 'foo/bar/baz/test',
          pattern: 'foo/+/#', params: ['bar','baz/test']}, 'hello world');
        expect(spy).to.have.been.calledWith({topic: 'foo/bar/baz/test',
          pattern: 'foo/+/+/test', params: ['bar','baz']}, 'hello world');
          expect(spy).to.have.been.calledWith({topic: 'foo/bar/baz/test',
            pattern: 'foo/bar/baz/test', params: []}, 'hello world');
        done();

      });

      it('can listen once with callback', function(done) {
          var emitter = new MqttEmitter();
          emitter.once('test/#', function(match, command1, command2) {
                //let [match, command1, command2] = result;
                expect(match.pattern).to.be.equal('test/#');
                expect(match.topic).to.be.equal('test/foo/bar/baz');
                expect(match.params[0]).to.be.equal('foo/bar/baz');
                expect(command1).to.be.equal('Hello');
                expect(command2).to.be.equal('World');
                done();

              });
          emitter.emit('test/foo/bar/baz', 'Hello', 'World');
        });

      it('can listen once with promise', function(done) {
          var emitter = new MqttEmitter();
          emitter.once('test/#').then(result=> {
                let [match, command1, command2] = result;
                expect(match.pattern).to.be.equal('test/#');
                expect(command1).to.be.equal('Hello');
                expect(command2).to.be.equal('World');
                done();

              });
          emitter.emit('test/foo/bar/baz', 'Hello', 'World');
        });

    });

});
