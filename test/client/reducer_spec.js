import { fromJS } from "immutable"
import { expect } from "chai"
import rootReducer from "../../src/client/reducer2"

import {
    newMessage, setState, switchRoom, setUsername
} from "../../src/client/actionCreators"

const fakeState = fromJS({
    rooms: [
        { id: "0", name: "room", owner: "rayleigh" },
        { id: "1", name: "room2", owner: "shaw" },
    ],
    currentRoom: "1",
    username: "rayleigh",
    messages: {
        "1": [
            { user: "rayleigh", content: "some message", time: "12:12" },
            { user: "shaw", content: "ss message", time: "12:13" },
        ]
    }
})

describe("client Root reducer", () => {
    it("set state", () => {
        const nextState = rootReducer(fakeState,
            setState(fromJS({ username: "Jerry", currentRoom: "0" }))
        )
        expect(nextState.get("username")).to.equal("Jerry")
        expect(nextState.get("rooms").size).to.equal(2)
    })

    it("set username", () => {
        const nextState = rootReducer(fakeState, setUsername("Shaw"))
        expect(nextState.get("username")).to.equal("Shaw")
    })

    it("switch chat room", () => {
        const nextState = rootReducer(fakeState, switchRoom("0"))
        expect(nextState.get("currentRoom")).to.equal("0")
    })

    it("send new message", () => {
        const action = newMessage({
            roomId: "0", user: "rayleigh", content: "some message"
        })
        expect(action.message.time).to.be.ok
        const nextState = rootReducer(fakeState, action)

        expect(nextState.getIn(["messages", "0"]).size).to.equal(1)
        const nextNextState = rootReducer(fakeState, {
            type: "NEW_MESSAGE", message: {
                roomId: "1", user: "shaw", time: "12:00", content: "some message"
            }
        })
        expect(nextNextState.getIn(["messages", "1"]).size).to.equal(3)
    })

})