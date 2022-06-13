"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pickle {
    constructor() {
        this.MARK = "(";
        this.STOP = ".";
        this.INT = "I";
        this.FLOAT = "F";
        this.NONE = "N";
        this.STRING = "S";
        this.APPEND = "a";
        this.DICT = "d";
        this.GET = "g";
        this.LIST = "l";
        this.PUT = "p";
        this.SETITEM = "s";
        this.TRUE = "I01\n";
        this.FALSE = "I00\n";
        this.NEWLINE = "\n";
        this.SQUO = "'";
    }
    loads(pickle) {
        let stack = [];
        let memo = [];
        const ops = pickle.split(this.NEWLINE);
        let op;
        for (let i = 0; i < ops.length; i++) {
            op = ops[i];
            this.process_op(op, memo, stack);
        }
        return stack.pop();
    }
    process_op(op, memo, stack) {
        if (op.length === 0)
            return;
        switch (op[0]) {
            case this.MARK:
                this.process_op(op.slice(1), memo, stack);
                break;
            case this.STOP:
                break;
            case this.INT:
                if (op[1] === "0") {
                    this.arg0 = (op[2] === "1");
                    stack.push(this.arg0);
                    break;
                }
                this.arg0 = parseInt(op.slice(1));
                stack.push(this.arg0);
                break;
            case this.FLOAT:
                this.arg0 = parseFloat(op.slice(1));
                stack.push(this.arg0);
                break;
            case this.STRING:
                this.arg0 = eval(op.slice(1));
                stack.push(this.arg0);
                break;
            case this.NONE:
                stack.push(null);
                this.process_op(op.slice(1), memo, stack);
                break;
            case this.APPEND:
                this.arg0 = stack.pop();
                stack[stack.length - 1].push(this.arg0);
                this.process_op(op.slice(1), memo, stack);
                break;
            case this.DICT:
                stack.push({});
                this.process_op(op.slice(1), memo, stack);
                break;
            case this.GET:
                this.arg0 = parseInt(op.slice(-1));
                this.arg1 = memo[this.arg0];
                stack.push(this.arg1);
                break;
            case this.LIST:
                stack.push([]);
                this.process_op(op.slice(1), memo, stack);
                break;
            case this.PUT:
                this.arg0 = parseInt(op.slice(-1));
                this.arg1 = stack[stack.length - 1];
                memo[this.arg0] = this.arg1;
                break;
            case this.SETITEM:
                this.arg1 = stack.pop();
                this.arg0 = stack.pop();
                stack[stack.length - 1][this.arg0] = [this.arg1];
                this.process_op(op.slice(1), memo, stack);
                break;
            default:
                throw new Error("unknown opcode " + op[0]);
        }
    }
    dumps(obj) {
        return this._dumps(obj, []) + this.STOP;
    }
    _check_memo(obj, memo) {
        for (let i = 0; i < memo.length; i++) {
            if (memo[i] === obj) {
                return i;
            }
        }
        return -1;
    }
    _dumps(obj, memo) {
        memo = memo || [];
        if (obj === null) {
            return this.NONE;
        }
        if (typeof (obj) === "object") {
            const p = this._check_memo(obj, memo);
            if (p !== -1) {
                return this.GET + p + this.NEWLINE;
            }
            const t = obj.constructor.name;
            switch (t) {
                case Array().constructor.name:
                    let sAux = this.MARK + this.LIST + this.PUT + memo.length + this.NEWLINE;
                    memo.push(obj);
                    for (let i = 0; i < obj.length; i++) {
                        sAux += this._dumps(obj[i], memo) + this.APPEND;
                    }
                    return sAux;
                case Object().constructor.name:
                    let sAux2 = this.MARK + this.DICT + this.PUT + memo.length + this.NEWLINE;
                    memo.push(obj);
                    for (const key in obj) {
                        sAux2 += this._dumps(obj[key], memo);
                        sAux2 += this._dumps(key, memo);
                        sAux2 += this.SETITEM;
                    }
                    return sAux2;
                default:
                    throw new Error("Cannot pickle this object: " + t);
            }
        }
        else if (typeof (obj) === "string") {
            const p = this._check_memo(obj, memo);
            if (p !== -1) {
                return this.GET + p + this.NEWLINE;
            }
            const escaped = obj.replace("\\", "\\\\").replace("'", "\\'").replace("\n", "\\n");
            const s = this.STRING + this.SQUO + escaped + this.SQUO + this.NEWLINE + this.PUT + memo.length + this.NEWLINE;
            memo.push(obj);
            return s;
        }
        else if (typeof (obj) === "number") {
            return this.FLOAT + obj + this.NEWLINE;
        }
        else if (typeof (obj) === "boolean") {
            return obj ? this.TRUE : this.FALSE;
        }
        else {
            throw new Error("Cannot pickle this type: " + typeof (obj));
        }
    }
}
exports.pickle = new Pickle();
