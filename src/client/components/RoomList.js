import React, { Component } from "react"

if (!process.env.NODE_ENV || !process.env.NODE_ENV === "test") 
require("../css/style.css")

class RoomList extends Component {

    isActive(room, currentRoom) {
        return room.get("id") === currentRoom
    }
    switchRoom(room, currentRoom) {
        if (room.get("id") !== currentRoom) this.props.switchRoom(room.get("id"))
    }
    render() {
        const { rooms, currentRoom } = this.props

        return (
            <div className="chat-room-list">
                {
                    rooms.map((room, index) => {
                        return (
                            <a className={this.isActive(room, currentRoom) ? "active" : ""}
                                onClick={e => this.switchRoom(room, currentRoom)}
                                key={index} href="#">
                                {room.get("name")}
                            </a>
                        )
                    })
                }
            </div>
        )
    }
}
import PureRenderMixin from 'react-addons-pure-render-mixin'
import reactMixin from "react-mixin"
reactMixin.onClass(RoomList, PureRenderMixin)

export default RoomList