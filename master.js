#!/usr/bin/env node
const cluster = require("cluster")
const fs = require("fs")

const cpuNums = require("os").cpus().length

const logfile = fs.openSync("./log/stdout.log", "a")
const errfile = fs.openSync("./log/stderr.log", "a")

cluster.setupMaster({
    stdio: ["ignore", logfile, errfile, "ipc"],
    exec: "./child.js"
})

for (let i = 0; i < cpuNums; i++) {
    cluster.fork()
}

cluster.on("online", (worker) => {
    console.log("The Worker ", worker.id, " started!")
})

cluster.on("exit", (worker, code, signal) => {
    console.log(worker.id)
    cluster.fork()
})