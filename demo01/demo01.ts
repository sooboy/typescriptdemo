class parents {
    val: string
    dom: any
    msg: any;

    children: any[];

    addChildren(child: children) {
        child.msg = this.msg
        this.children.push(child)
    }
    removeChildren(child: children) {
        child.msg = this.msg
        var index = this.children.indexOf(child)
        if (index) {
            this.children.splice(index, 1)
        }
    }
    constructor(dom) {
        this.val = "parents"
        this.dom = dom
        this.children = []
        this.msg = new Msg()

        this.dispatch()
    }

    dispatch() {
        var self = this
        self.dom.click(function () {
            console.log($(this), "click")
        })
        self.msg.subscribe("children_click",
            function (data) {
                console.log(data)
            },
            function (data) { console.log("I am function2") }
        )
    }
}

class children {
    id: number
    val: string
    dom: any;
    msg: any;

    constructor(id: number, val: string, dom: any) {
        this.id = id
        this.val = val
        this.dom = dom

        this.dispatch()
    }

    dispatch() {
        var self = this
        self.dom.click(function () {
            console.log("chilrend no.", self.id, "Send Msg to parents")
            self.msg.publish("children_click", {
                id: self.id,
                val: self.val
            })
        })
    }

}

var parentsdemo01 = new parents($(".parents"))

var children01 = new children(1, "the id is  one", $(".children01"))

var children02 = new children(2, "the id is  two", $(".children02"))

parentsdemo01.addChildren(children01)
parentsdemo01.addChildren(children02)