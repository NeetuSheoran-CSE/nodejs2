// HTTP request module

// //step -1 import
// const http = require("http");

// // step -2 create server
// const server = http.createServer((request, response)=>
// {
//     response.end("welcome to my server");
// });

// // step -3 listen to server
// server.listen(8080)


// server by default get request leta h *****************************


const http = require("http");
const fs = require("fs");

const server = http.createServer((req,res) => {
    if (req.url == "/"){
        res.end("Home Page");
    } else if (req.url == "/about"){

        // } else if (req.url == "/about" && req.method == "POST"){

        res.end("About Page");
    } else if (req.url == "/data"){

       //} else if (req.url == "/data" && req.method == "GET"){

        const data = fs.readFileSync("./1.json","utf-8")
        res.end(data);
    } else {
        res.end("Not Found");
    }
    
});

server.listen(8080, () =>{
    console.log("Server Started")
})