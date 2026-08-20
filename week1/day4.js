// const os = require('os');
// console.log(os.freemem());
// console.log(os.cpus());
// console.log(os.platform());
// console.log(os.version());

// 2 . path module
// const path = require('path');
// console.log(path.resolve());
// console.log(path.resolve()+path.join("/photos/images/1.png"));

// 3. dns - domain name system
// const dns = require("dns");
// console.log(dns.getServers());

// 4. crypto module

// const crypto = require("crypto");
// const key = "hello";

// const hashData = crypto.createHash("sha256")
// console.log(hashData);

// const data = hashData.update(key);
// console.log(data);

// const ans = data.digest("hex");
// console.log(ans);      //2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824


// const crypto = require("crypto");
// const randomValue = crypto.randomBytes(8);
// console.log(randomValue); //<Buffer 0a 49 6e 3b a3 27 e7 d5>


//  const crypto = require("crypto");
//  const randomValue = crypto.randomBytes(8).toString("hex");
//  console.log(randomValue);  // 0a496e3ba327e7d5


// for(let i=0; i<10; i++){
//     const ans1 = crypto.randomInt(1,7);
//     console.log(ans1);
// }

// const ans2 = crypto.randomUUID();
// console.log(ans2);

