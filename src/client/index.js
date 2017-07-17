// console.log("it should work!!")

import React from "react"
import ReactDOM from "react-dom"
// import App from "./components/App"

import { createStore } from "redux"
import rootReducer from "./reducer2"
import { setState, newMessage } from "./actionCreators"
import { saveToStorage, getInitialState } from "./store.js"

import { Provider } from "react-redux"
import { ConnectApp } from "./components/App"

import { applyMiddleware } from "redux"
import { logger, socketMiddleware } from "./middleware.js"

import { socket } from "./io"

// const store = createStore(rootReducer, getInitialState())
const createStoreWithMiddleware = applyMiddleware(logger, socketMiddleware(socket))(createStore)
const store = createStoreWithMiddleware(rootReducer, getInitialState())


socket.on("state", state => {
    // console.log("getInitialState:", state)
    store.dispatch(setState(state))
})

socket.on("message", message => {
    console.log("get message from server")
    store.dispatch(newMessage(message, true))
})


// ---------------------------
// import { fromJS, Map, List } from "immutable"
// const fackState = {
//     rooms: fromJS([
//         { id: "0", name: "room", owner: "rayleigh" },
//         { id: "1", name: "room2", owner: "shaw" },
//     ]),
//     currentRoom: "1",
//     username: "rayleigh",
//     messages: fromJS({
//         "1": [
//             { user: "rayleigh", content: "react is cool", time: "12:12" },
//             { user: "shaw", content: "so is Redux", time: "12:15" },
//         ]
//     }),
// }

// var $app = document.getElementById("app")
// function render() {
//     ReactDOM.render(
//         <App {...fackState} />,
//         $app
//     )
// }

// render()






// var $app = document.getElementById("app")

// function render() {

//     const fackState = store.getState()

//     ReactDOM.render(
//         <App rooms={fackState.get("rooms")}
//             messages={fackState.get("messages")}
//             currentRoom={fackState.get("currentRoom")}
//             username={fackState.get("username")}
//         />,
//         $app
//     )
// }

// store.subscribe(render)






var $app = document.getElementById("app")

function render() {
    // const store = store.getState()

    ReactDOM.render(
        <Provider store={store}>
            <ConnectApp />
        </Provider>,
        $app
    )
}

render()

store.subscribe(() => {
    saveToStorage(store.getState())
})
