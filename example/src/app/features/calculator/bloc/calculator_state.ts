
/** Represents the relevant data necessary in order to render the calculator UI in a specific moment in time */
class CalculatorState {
    constructor(
        public readonly operation: Operation,
        public readonly firstNumber: Number,
        public readonly secondNumber: Number,
        public readonly result: Number,
    ) {
        Object.freeze(this);
     }
}
