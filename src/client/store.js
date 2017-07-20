import { Map, fromJS } from "immutable"

const STATE_KEY = "CHAT_APP_STATE"
const DEFAULT_ROOM = "0"

export function saveToStorage(state) {
    var data = JSON.stringify(state.toJS ? state.toJS() : state)
    localStorage.setItem(STATE_KEY, data)
}

export function getInitialState() {
    var stateString = localStorage.getItem(STATE_KEY)
    if (!stateString) {
        return fromJS({
            rooms: [],
            messages: {},
            username: prompt("用户名"),
            currentRoom: DEFAULT_ROOM,
        })
    }

    return fromJS(JSON.parse(stateString))
}