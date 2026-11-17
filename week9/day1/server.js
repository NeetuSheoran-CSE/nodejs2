const {WebSocketServer} = require('ws');
const wss = new WebSocketServer({port:8080});
WebSocketServer.on("connection", function connsction (ws){
    ws.on("error",console.error);

    ws.on("message",function message(data){
        console.log("received:%s",data)
    });

    ws.send("something")
})