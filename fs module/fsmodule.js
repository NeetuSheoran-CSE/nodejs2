// 5. fs(file system) module ****************************5 marks**************
// *******************************************************


// fs.writeFileSync(): Writes data to a file. If the file does not exist,
// it will be created. If the file exists, it overwrites the content of the file.
// syntax: fs.writeFileSync(fileOath, Data, options);
// filePath: the file path to write to
// data: the data to write to the file
// options: optional parameters such as encoding, mode, and flag



// const fs = require("fs");
// fs.readFile("1.txt", "utf-8", (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// });

// const data = fs.readFileSync("1.txt", "utf-8");
// console.log(data);


// //write operation*****************************

// const fs = require("fs");
// fs.writeFile("1.txt", "Hello, World!", (err) => {
//     if (err) {
//         console.log("Something went wrong");
//     } else {
//         console.log("File written successfully");
//     }
// });

// const fs = require("fs");
// fs.writeFileSync("1.txt", "all is well");
// console.log("File written successfully");


// //update operation*********************
// // const fs = require("fs");
// fs.appendFile("1.txt","\nkese ho app",(err) => {
//     if (err) {
//         console.log("Something went wrong");
//     } else {
//         console.log("File updated successfully");
//     }
// });

// fs.access("1.txt", "\npadlo abhi bhi");
// console.log("File updated successfully");



// //rename operation *********************************
// fs.rename("1.txt", "2.txt", (err) => {
//     if (err) {
//         console.log("Something went wrong");    
//     }else{
//         console.log("File renamed successfully");
//     }
// });

// //delete operation *****************************************
// fs.unlink("1.txt", (err) => {
//     if (err) {
//         console.log("Something went wrong");
//     }else{
//         console.log("File deleted successfully");
//     }
// });