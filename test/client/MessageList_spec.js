import React from "react"
import { fromJS, Map, List } from "immutable"
import { expect } from "chai"
import MessageList from "../../src/client/components/MessageList"


import {
    Simulate,
    renderIntoDocument,
    findRenderedDOMComponentWithTag,
    scryRenderedDOMComponentsWithTag,
    scryRenderedDOMComponentsWithClass,
} from "react-dom/test-utils"

describe("MessageList", () => {
    it("render messages and my messages", () => {
        const messages = fromJS([
            { user: "rayleigh", content: "some message", time: "23:23", userId: "1111" },
            { user: "shaw", content: "ss message", time: "12:12", userId: "2222" },
        ])
        const component = renderIntoDocument(
            <MessageList username="rayleigh" messages={messages} userId="1111"/>
        )

        const $messages = scryRenderedDOMComponentsWithTag(component, "li")
        const $myMessages = scryRenderedDOMComponentsWithClass(component, "message-self")

        expect($messages.length).to.equal(2)
        expect($myMessages.length).to.equal(1)
    })

    it("no message", () => {
        const component = renderIntoDocument(
            <MessageList />
        )
        const $message = findRenderedDOMComponentWithTag(component, "p")

        expect($message).to.be.ok
        expect($message.textContent).to.be.equal("还没有消息")
    })
})