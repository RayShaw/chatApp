import React from "react"
import ReactDOM from "react-dom"
import { fromJS } from "immutable"
import { expect } from "chai"
import Message from "../../src/client/components/Message"

import {
    Simulate,
    renderIntoDocument,
    findRenderedDOMComponentWithClass,
    scryRenderedDOMComponentsWithTag,
} from "react-dom/test-utils"

describe("Message", () => {
    it("render message", () => {
        var message = fromJS({ user: "rayleigh", content: "some message", time: "23:23" })
        const instance = renderIntoDocument(
            <Message message={message} isSelf={true} />
        )

        const $li = findRenderedDOMComponentWithClass(instance, "message-self clearfix")
        expect($li).to.be.ok
        const $message = scryRenderedDOMComponentsWithTag(instance, "p")
        expect($message[0].textContent).to.equal("rayleigh" + "23:23")
        expect($message[1].textContent).to.equal(message.get("content"))
    })
})