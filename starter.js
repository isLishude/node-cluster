const child_process = require("child_process")

const fs = require("fs")

const logfile = fs.openSync("./log/stdout.log", "a")
const errfile = fs.openSync("./log/stderr.log", "a")

const master = child_process.spawn("./master.js", {
    stdio: ["ignore", logfile, errfile],
    detached: true
})

master.unref();

fs.writeFile("./pid/master.pid", master.pid, err => {
    if (err) console.log(err.message)
    else console.log("Start master successful [pid] s%", master.pid)
})