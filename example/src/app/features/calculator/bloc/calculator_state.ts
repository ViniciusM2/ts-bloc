import { Freezed } from 'src/util/freezed';
import { Operation } from '../model/calculation';

/** Represents the relevant data necessary in order to render the calculator UI in a specific moment in time */
abstract class CalculatorState {
    constructor(
        public readonly operation: Operation,
        public readonly firstNumber: number,
        public readonly secondNumber: number,
        public readonly result: number,
    ) {

    }

    copyWith(
        {
            operation,
            firstNumber,
            secondNumber,
            result
        }: {
            operation?: Operation;
            firstNumber?: number;
            secondNumber?: number;
            result?: number;
        } = {},
    ) {
        return new SuccessCalculatorState(
            operation || this.operation,
            firstNumber || this.firstNumber,
            secondNumber || this.secondNumber,
            result || this.result,
        );
    }
}

/** Represents the initially relevant data necessary in order to render the calculator UI */
@Freezed
class InitialCalculatorState extends CalculatorState {
    constructor() {
        super(Operation.None, 0, 0, 0);
    }


}

/** Represents the relevant data necessary in order to render the calculator UI after successful processing of a calculation */
@Freezed
class SuccessCalculatorState extends CalculatorState {
    constructor(
        operation: Operation,
        firstNumber: number,
        secondNumber: number,
        result: number,
    ) {
        super(operation, firstNumber, secondNumber, result);
    }


}

/** Represents the relevant data necessary in order to render the calculator UI after unsuccessful processing of a calculation */
@Freezed
class ErrorCalculatorState extends CalculatorState {
    constructor(
        operation: Operation,
        firstNumber: number,
        secondNumber: number,
        result: number,
        readonly error: Error,
    ) {
        super(operation, firstNumber, secondNumber, result);
    }
}

export { CalculatorState, InitialCalculatorState, SuccessCalculatorState, ErrorCalculatorState };
