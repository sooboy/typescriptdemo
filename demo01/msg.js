var Msg = (function () {
    function Msg() {
        this.obj = {};
    }
    Msg.prototype.publish = function (msg, data) {
        if (this.obj[msg] && this.obj[msg].length) {
            for (var i = 0; i < this.obj[msg].length; i++) {
                this.obj[msg][i](data);
            }
        }
    };
    Msg.prototype.subscribe = function (msg, fn) {
        if (!this.obj[msg]) {
            this.obj[msg] = [];
        }
        this.obj[msg].push(fn);
        if (arguments.length > 2) {
            for (var i = 2; i < arguments.length; i++) {
                if (typeof arguments[i] === "function") {
                    this.obj[msg].push(arguments[i]);
                }
            }
        }
    };
    Msg.prototype.unsubscribe = function (msg, fn) {
        if (this.obj[msg] && this.obj[msg].length) {
            var index = this.obj[msg].indexOf(fn);
            if (index) {
                this.obj[msg].splice(index, 1);
            }
        }
    };
    return Msg;
}());
