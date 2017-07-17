import { expect } from "chai"
import { v1 } from "uuid"
import { fromJS, Map, List } from "immutable"

import coreReducer from "../../src/server/reducer"
import { addRoom, removeRoom } from "../../src/server/actionCreator.js"

describe("server端核心Reducer", () => {
    it("可以当作一个reducer", () => {
        var id = v1()
        var actions = [
            { type: "ADD_ROOM", room: { id, name: "1", owner: "rayleigh" } },
            { type: "ADD_ROOM", room: { name: "2", owner: "shaw" } },
            { type: "ADD_ROOM", room: { name: "3", owner: "rayleigh" } },
            { type: "REMOVE_ROOM", payload: { id: id, user: "rayleigh" } },
        ]

        const finalState = actions.reduce(coreReducer, undefined)
        console.log(finalState)
        expect(finalState.get("rooms").size).to.equal(2)
        expect(finalState.getIn(["rooms", 0, "owner"])).to.equal("shaw")
    })


    it("使用actionCreator", () => {
        var id = v1()
        var actions = [
            addRoom({ id, name: "1", owner: "rayleigh" }),
            addRoom({ name: "2", owner: "shaw" }),
            addRoom({ name: "3", owner: "rayleigh" }),
            removeRoom({ id: id, user: "rayleigh" }),
        ]
        const finalState = actions.reduce(coreReducer, undefined)
        console.log(finalState)
        expect(finalState.get("rooms").size).to.equal(2)
        expect(finalState.getIn(["rooms", 0, "owner"])).to.equal("shaw")


    })

})