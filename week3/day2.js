// step 1 npm init -y [setup node js app]
// step 2 npm i is-even [installing is-even external module]
// step 3 import is-even module for usecases

// const isEven = require("is-even");

// // step 4 use

// console.loog(isEven(1))
// console.log(isEven(2))



require("dotenv").config();

const a = process.env.url;

const b = process.env.passkey;

console.log(a,b);