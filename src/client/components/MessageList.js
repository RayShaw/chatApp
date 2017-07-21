import React, { Component } from "react"
import Message from "./Message"
import ReactDOM from "react-dom"

class MessageList extends Component {

    componentDidMount() {
        // Scroll to the bottom on initialization
        if (!process.env.NODE_ENV === "test") {
            const node = ReactDOM.findDOMNode(this.messagesEnd)
            if (node) node.scrollIntoView({ behavior: "smooth" })
        }
    }

    componentDidUpdate() {
        // Scroll to the bottom on initialization
        if (!process.env.NODE_ENV === "test") {
            const node = ReactDOM.findDOMNode(this.messagesEnd)
            if (node) node.scrollIntoView({ behavior: "smooth" })
        }
    }
    isSelf(message) {
        return this.props.username === message.get("user")
    }
    $getMessages(messages) {
        if (!messages || messages.size == 0) {
            return <p>还没有消息</p>
        }
        return messages.map((message, index) => {
            if (index + 1 === messages.size) {
                return <Message key={index}
                    isSelf={this.isSelf(message)}
                    message={message}
                    ref={el => this.messagesEnd = el}
                />
            }
            return <Message key={index}
                isSelf={this.isSelf(message)}
                message={message}
            />
        })

    }
    render() {
        return (
            <ul className="chat-messages">
                {
                    this.$getMessages(this.props.messages)
                }
            </ul>
        )
    }
}

import PureRenderMixin from 'react-addons-pure-render-mixin'
import reactMixin from "react-mixin"
reactMixin.onClass(MessageList, PureRenderMixin)

export default MessageList