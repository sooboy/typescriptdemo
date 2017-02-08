import $ = require("jquery")

import msg =require("lib/msg")

export class item {
    // 构造函数

    constructor(public name: string, public price: number, public deadTime: string,public msg:msg.Msg) { 
        this.dispatch()
    }

    // 更新价格
    updatePrice(price: number) {
        this.price = price
    }

    // 更新时间
    updateDeadTime(deadTime: string) {
        this.deadTime = deadTime
    }

    // 更新名称
    updateName(name: string) {
        this.name = name
    }

    // 调度
    dispatch() {
        this.msg.subscribe("change_price",this.updatePrice)

        this.msg.subscribe("change_deadtime",this.updateDeadTime)

        this.msg.subscribe("change_name",this.updateName)
    }
}