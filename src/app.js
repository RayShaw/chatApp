import express from "express"
import { Server } from "http"

var app = express()
var http = Server(app)

const env = process.env.NODE_ENV;
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
// app.use(express.static(__dirname + "/public"))

var io = require('socket.io')(http);
import { makeStore } from "./server/store"
import listenWebSocket from "./server/io.js"

const store = makeStore()
listenWebSocket(io, store)


app.get("/", (req, res) => {
    res.render("index")
})

// 服务器端渲染
// import { indexCtrl } from "./controller"
// app.use(indexCtrl(store))

http.listen(3000, () => {
    console.log("listening on port 3000")
})
