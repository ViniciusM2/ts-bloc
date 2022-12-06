"use strict";
exports.__esModule = true;
exports.Transition = void 0;
/**
 * Occurs when an event is added after `mapEventToState` has been called
 * but before the bloc's state has been updated.
 * A `Transition` consists of the `currentState`, the `event` which was
 * added, and the `nextState`.
 *
 * @export
 * @class Transition
 * @template Event
 * @template State
 */
var Transition = /** @class */ (function () {
    function Transition(currentState, event, nextState) {
        this.currentState = currentState;
        this.event = event;
        this.nextState = nextState;
    }
    return Transition;
}());
exports.Transition = Transition;
