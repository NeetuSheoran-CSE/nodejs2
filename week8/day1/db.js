const dns = require("dns");
const mongoose = require("mongoose");
require("dotenv").config();

// The local resolver on this machine refuses SRV lookups for mongodb+srv://
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connection = mongoose.connect(process.env.mongourl);

module.exports = { connection };
