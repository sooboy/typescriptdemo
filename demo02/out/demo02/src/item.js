define(["require", "exports"], function (require, exports) {
    "use strict";
    var item = (function () {
        // 构造函数
        function item(name, price, deadTime, msg) {
            this.name = name;
            this.price = price;
            this.deadTime = deadTime;
            this.msg = msg;
            this.dispatch();
        }
        // 更新价格
        item.prototype.updatePrice = function (price) {
            this.price = price;
        };
        // 更新时间
        item.prototype.updateDeadTime = function (deadTime) {
            this.deadTime = deadTime;
        };
        // 更新名称
        item.prototype.updateName = function (name) {
            this.name = name;
        };
        // 调度
        item.prototype.dispatch = function () {
            this.msg.subscribe("change_price", this.updatePrice);
            this.msg.subscribe("change_deadtime", this.updateDeadTime);
            this.msg.subscribe("change_name", this.updateName);
        };
        return item;
    }());
    exports.item = item;
});
