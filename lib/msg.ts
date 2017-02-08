interface Fn {
    (data: Object)
}

export class Msg {
    obj: Object

    constructor() {
        this.obj = {}
    }
    publish(msg: string, data: Object) {
        console.log("publish msg", msg, data)
        if (this.obj[msg] && this.obj[msg].length) {
            for (var i = 0; i < this.obj[msg].length; i++) {
                this.obj[msg][i](data)
            }
        }
    }

    subscribe(msg: string, fn: Fn) {
        console.log("subscribe msg", msg)
        if (!this.obj[msg]) {
            this.obj[msg] = []
        }
        this.obj[msg].push(fn)
        if (arguments.length > 2) {
            for (var i = 2; i < arguments.length; i++) {
                if (typeof arguments[i]==="function") {
                      this.obj[msg].push(arguments[i])
                }
            }
        }
    }

    unsubscribe(msg: string, fn: Fn) {
        if (this.obj[msg] && this.obj[msg].length) {
            var index = this.obj[msg].indexOf(fn)
            if (index) {
                this.obj[msg].splice(index, 1)
            }
        }
    }
}