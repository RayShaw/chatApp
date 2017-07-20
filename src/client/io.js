import IO from "socket.io-client"

export const socket = IO("http://localhost:3000")
// export const socket = IO("http://192.168.88.101:3000")

socket.on("disconnetc", () => {
    console.log("user disconnected")
})