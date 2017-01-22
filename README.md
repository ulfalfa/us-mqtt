# us-mqtt

This library is helping with handling mqtt topics. It was inspired by mqtt-regex and mqtt-emitter.

It supports wildcards (+ and #) - additionally you can use multiple #
and the last is greedy.

## Getting Started

Just install via npm and use it in your project.

### Prerequisites

I'm using es6 features of node.js, so it will only work with >= Node.js 7.x


### Installing

Install the package via npm

```
npm install us-mqtt
```

Then you can use it in your project.

### Usage

#### Matcher

The matcher can test (true/false) or match a topic against a pattern.

```javascript
const Mqtt = require('us-mqtt').Matcher;

var mqtt = Mqtt('#/+/#');
let test = mqtt.test ('foo/bar/baz/test');
//test is true;
let result = mqtt.match('foo/bar/baz/test');
//result is an array containing the matched wildcards:
//   #     +         #
// ['foo','bar','baz/test']
```

#### Emitter

```javascript
const MqttEmitter = require('us-mqtt').Emitter;

var emitter = new MqttEmitter();

emitter.on ('foo/+/#', function (match, value1, value2){
    console.log ('I was called for topic %s that was matching %s', match.topic, match.pattern);
    console.log ('The wildcards were', match.params);
    console.log ('First value', value1);
    console.log ('Second value', value2);    
});

emitter.emit('foo/bar/baz/test', 'Hello', 'World');

```






## Running the tests

Test a coded with mocha. So just run ```mocha```.


## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thanks rangermauve for inspiration.
