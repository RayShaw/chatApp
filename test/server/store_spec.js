import { fromJS } from "immutable"
import { expect } from "chai"

import { addRoom } from "../../src/server/actionCreator.js"
import { makeStore } from "../../src/server/store.js"

describe("server store", () => {
    // done 使用异步操作
    it("dispatch actions", (done) => {
        const mockState = fromJS({
            rooms: []
        })
        // 创建一个store 首先创建一个初始store
        const store = makeStore(mockState)

        // store.subscribe(listener) 监听store是否发生变化 变化调用listener
        store.subscribe(() => {
            // getState 取出状态数据
            const state = store.getState()
            expect(state.get("rooms").size).to.equal(1)
            done()
        })

        // 发射action
        store.dispatch(addRoom({
            name: "聊天室", owner: "shaw"
        }))

    })
})