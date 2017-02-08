import item = require("./item")
import msg = require("lib/msg")

export class List {
    //  列表子项
    items: item.item[]
    // 消息
    msg: msg.Msg
    // 与外部通信的websocket
    websocket: WebSocket
    websocketURL:string
    // 添加
    addItem(item: item.item) {
        this.items.push(item)
    }
    // 删除
    removeItem(name: string) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].name==name){
                this.items.splice(i,1)
                break
            }
        }
    }
    // 处理websock
    dealWebsocket(){
      this.websocket=  new WebSocket(this.websocketURL)
    }

    constructor(websocketURL:string) {
        this.websocketURL =websocketURL
        this.dispatch()
    }

    dispatch() {
        var self =this
        this.websocket.onerror=function(){
            console.log("%c message:","background: #efefef; color: red","通信失败!") 
            self.dealWebsocket()
            console.log("%c message:","background: #efefef; color: green","重新建立建立连接!")  
        }
        this.websocket.onopen =function(){
            console.log("%c message:","background: #efefef; color: green","成功建立连接!")
        }
        this.websocket.onclose =function(){
            console.log("%c message:","background: #efefef; color: red","连接关闭!") 
            self.dealWebsocket()
            console.log("%c message:","background: #efefef; color: green","重新建立建立连接!")             
        }
        this.websocket.onmessage =function(e){
            console.log("%c message:","background: #efefef; color: green",e.data)       
        }


    }
}