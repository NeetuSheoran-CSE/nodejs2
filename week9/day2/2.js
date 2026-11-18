const EventEmitter = require('events');
var ee = new EventEmitter();

ee.on("chintu",()=>{
    console.log("hii")
});

ee.on('message', function(text) {
    ee.emit("chintu","welcome to the class");
    console.log(text);
});

ee.emit("message","hello World");
ee.emit("chintu");