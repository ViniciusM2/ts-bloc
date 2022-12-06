"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.Freezed = void 0;
var Freezed = function (target) {
    // Object.freeze(target);
    return new Proxy(target, {
        construct: function (target, argumentLists, newTarget) {
            var instance = new (target.bind.apply(target, __spreadArray([void 0], argumentLists, false)))();
            Object.freeze(instance);
            return instance;
        }
    });
};
exports.Freezed = Freezed;
