import { Freezed } from 'ng-bloc';
import { Operation } from '../model/calculation';
/** Represents the relevant data necessary in order to render the calculator UI in a specific moment in time */
abstract class CalculatorState {
    constructor(
        public readonly operation: Operation,
        public readonly firstNumber: Number,
        public readonly secondNumber: Number,
        public readonly result: Number,
    ) {

    }
}

/** Represents the initially relevant data necessary in order to render the calculator UI */
@Freezed
class InitialCalculatorState extends CalculatorState {
    constructor() {
        super(Operation.None, 0, 0, 0);
        Object.freeze(this);
    }
}

/** Represents the relevant data necessary in order to render the calculator UI after successful processing of a calculation */
@Freezed
class SuccessCalculatorState extends CalculatorState {
    constructor(
        operation: Operation,
        firstNumber: Number,
        secondNumber: Number,
        result: Number,
    ) {
        super(operation, firstNumber, secondNumber, result);
    }
}

/** Represents the relevant data necessary in order to render the calculator UI after unsuccessful processing of a calculation */
@Freezed
class ErrorCalculatorState extends CalculatorState {
    constructor(
        operation: Operation,
        firstNumber: Number,
        secondNumber: Number,
        result: Number,
        readonly error: Error,
    ) {
        super(operation, firstNumber, secondNumber, result);
    }
}

export { CalculatorState, InitialCalculatorState, SuccessCalculatorState, ErrorCalculatorState };
