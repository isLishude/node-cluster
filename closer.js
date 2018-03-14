const proess = require("process")
const fs = require("fs")

fs.readFile("./pid/master.pid", (err, data) => {
    if (err) console.log(err.message)
    else process.kill(Number(data), "SIGKILL")
})