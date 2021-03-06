
import { fromJS, Map } from "immutable"
import { yymmddhhmm } from "./shared/utils/dateTime"

export function setState(state) {
    return {
        type: "SET_STATE",
        state: Map.isMap(state) ? state : fromJS(state)
    }
}

export function setUsername(username, userId) {
    return {
        type: "SET_USERNAME",
        username: username,
        userId: userId,
    }
}

export function switchRoom(roomId) {
    return {
        type: "SWITCH_ROOM", roomId,
        // API请求 需要通过socketIO请求服务器 把action传给服务器操作
        meta: { remote: true },
    }
}

export function newMessage({ roomId, content, user, time, userId }, isFromServer) {
    return {
        type: "NEW_MESSAGE",
        meta: { remote: !isFromServer },
        message: {
            roomId, content: content || "", user,
            time: yymmddhhmm(),
            userId,
        }
    }
}

export function addRoom(room) {
    if (!room || !room.owner) throw new Error("addRoom() room.owner is required")

    return {
        type: "ADD_ROOM", room,
        meta: { remote: true },
    }
}

export function removeRoom(id, userId) {
    return {
        type: "REMOVE_ROOM",
        payload: { id, userId },
        meta: { remote: true },
    }
}
