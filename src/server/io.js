const DEFAULT_ROOM = "0"

export default function listenWebSocket(io, store) {
    io.on('connection', socket => {
        console.log('one client connected')
        socket.emit("state", store.getState())

        // join this to the default room
        socket.join(DEFAULT_ROOM)

        // add/remove room logic goes here
        socket.on("action", action => {
            // console.log("get client action:", action)

            console.log("client action:", action)
            switch (action.type) {
                case "SWITCH_ROOM":
                    return switchRoom(socket, action.roomId || DEFAULT_ROOM)

                // send this message back
                case "NEW_MESSAGE":
                    if (Object.keys(socket.rooms) && Object.keys(socket.rooms).length > 0) {
                        Object.keys(socket.rooms).forEach(id => {
                            socket.to(id).emit("message", action.message)
                        })
                    } else {
                        socket.emit("message", action.message)
                    }
                    return
            }

            // 服务器处理 addRoom removeRoom
            store.dispatch(action)

            // now send back new state
            socket.emit("state", store.getState())

            // 同步addRoom removeRoom操作
            if (["ADD_ROOM", "REMOVE_ROOM"].indexOf(action.type) > -1) {
                // broadcast 发布消息 向除自己以外所有人
                socket.broadcast.emit("state", store.getState())
            }
        })

        socket.on('disconnect', () => {
            console.log('user disconnected')
        })
    })

}

function switchRoom(socket, roomId) {

    // Object.keys(socket.rooms).forEach((room, index) => {
    //     console.log("should leave room, skip first one")
    //     if (index > 0) {
    //         socket.leave(room)
    //     }
    // })

    // setTimeout(() => {
    //     socket.join(roomId)
    //     console.log("roomId:", roomId, "socket.rooms:", socket.rooms)
    // }, 100)


    // leave 是异步的 应该定义一个数组[] 将leave()做成一个promise
    // 再Promise.all() 将数组进行执行 执行完后 再join到新的roomId
    var rooms = Object.keys(socket.rooms)
    console.log("rooms", rooms)
    var promises = rooms.map((room, index) => {
        return new Promise((resolve, reject) => {
            socket.leave(room)
        })
    })
    Promise.all(promises).then(socket.join(roomId, () => {
        console.log("roomId:", roomId, "socket.rooms:", socket.rooms)
    }))
}