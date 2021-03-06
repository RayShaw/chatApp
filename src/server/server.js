import express from "express"
import { Server } from "http"

const env = process.env.NODE_ENV;

var app = express()
var http = Server(app)

// configs
if (env != 'production') {
  var rootPath = require('path').normalize(__dirname + '/../..');
}
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use(express.static(rootPath + "/public"))

var io = require('socket.io')(http);
import { makeStore } from "./store"
import listenWebSocket from "./io.js"

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
