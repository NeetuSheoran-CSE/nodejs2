const EventEmitter = require('events');

var ee = new EventEmitter();

// handling/reciving
//on=> method,message=>event name
ee.on('message', function(text) {
    ee.emit("chintu","welcome to the class");
    console.log(text);
});

//emit=>trigger/sending
ee.emit('message', 'Hello World');