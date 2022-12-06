"use strict";
exports.__esModule = true;
exports.BlocObserver = void 0;
/**
 * An interface for observing the behavior of all `Bloc` instances.
 *
 * @export
 * @class BlocObserver
 */
var BlocObserver = /** @class */ (function () {
    function BlocObserver() {
    }
    /**
     * Called whenever an `event` is added to any `bloc`.
     *
     * @param {Bloc<any, any>} _bloc
     * @param {*} _event
     * @memberof BlocObserver
     */
    BlocObserver.prototype.onEvent = function (_bloc, _event) {
        return;
    };
    /**
     * Called whenever a `transition` occurs in any `bloc`.
     *
     * @param {Bloc<any, any>} _bloc
     * @param {Transition<any, any>} _transition
     * @memberof BlocObserver
     */
    BlocObserver.prototype.onTransition = function (_bloc, _transition) {
        return;
    };
    /**
     * Called whenever an `error` occurs in any `bloc`.
     *
     * @param {Bloc<any, any>} _bloc
     * @param {*} _error
     * @memberof BlocObserver
     */
    BlocObserver.prototype.onError = function (_bloc, _error) {
        return;
    };
    return BlocObserver;
}());
exports.BlocObserver = BlocObserver;
