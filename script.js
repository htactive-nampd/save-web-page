let utils = require("./utils")

/* import libraries */
const fs = require("fs")

const links = JSON.parse(fs.readFileSync("./links.json"))

utils.readPage(links[1])