import { v1 } from "uuid"
import { fromJS, Map, List } from "immutable"

export const INITIAL_STATE = fromJS({
    rooms: [],
})

export function addRoom(state = INITIAL_STATE, room) {
    if (!room || !room.owner) return state

    return state.update("rooms", rooms => rooms.push(Map({
        id: room.id || v1(),
        name: room.name || "no name",
        owner: room.owner
    })))
}


export function removeRoom(state, { id, userId }) {
    const rooms = state.get("rooms")
    var index = rooms.findIndex(r => r.get("id") === id)
    if (index == -1 || rooms.getIn([index, "owner"]) !== userId) {
        console.log("非房间创建者，不能删除该房间")
        return state
    }
    return state.update("rooms", rooms => rooms.splice(index, 1))
}