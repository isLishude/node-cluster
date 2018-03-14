const http = require("http")
const cluster = require("cluster")
const process = require("process")
const url = require("url")

const PORT = 3000

const server = http.createServer((req, res) => {
    console.log("Request from ", req.socket.remoteAddress, " and time is ", new Date().toLocaleString('cn'), " url is ", req.url)
    const url_obj = url.parse(req.url, true)

    res.writeHead(200, {
        "content-type": "application/json"
    })

    res.end(JSON.stringify({
        id: cluster.worker.id
    }))

    // res.end()

    if (url_obj.query["test"]) {
        process.kill(process.pid, "SIGHUP")
    }
})


server.listen(PORT, () => {
    console.log("Server start at %s on WORKER[%s]", PORT, cluster.worker.id)
})