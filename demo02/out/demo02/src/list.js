define(["require", "exports"], function (require, exports) {
    "use strict";
    var List = (function () {
        function List(websocketURL) {
            this.websocketURL = websocketURL;
            this.dispatch();
        }
        // 添加
        List.prototype.addItem = function (item) {
            this.items.push(item);
        };
        // 删除
        List.prototype.removeItem = function (name) {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].name == name) {
                    this.items.splice(i, 1);
                    break;
                }
            }
        };
        // 处理websock
        List.prototype.dealWebsocket = function () {
            this.websocket = new WebSocket(this.websocketURL);
        };
        List.prototype.dispatch = function () {
            var self = this;
            this.websocket.onerror = function () {
                console.log("%c message:", "background: #efefef; color: red", "通信失败!");
                self.dealWebsocket();
                console.log("%c message:", "background: #efefef; color: green", "重新建立建立连接!");
            };
            this.websocket.onopen = function () {
                console.log("%c message:", "background: #efefef; color: green", "成功建立连接!");
            };
            this.websocket.onclose = function () {
                console.log("%c message:", "background: #efefef; color: red", "连接关闭!");
                self.dealWebsocket();
                console.log("%c message:", "background: #efefef; color: green", "重新建立建立连接!");
            };
            this.websocket.onmessage = function (e) {
                console.log("%c message:", "background: #efefef; color: green", e.data);
            };
        };
        return List;
    }());
    exports.List = List;
});
