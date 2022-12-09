import { Freezed } from 'ts-bloc';
import { Calculation, Operation } from '../model/calculation';

/** Represents the relevant data necessary in order to render the calculator UI in a specific moment in time */
class CalculatorState {
    constructor(
        public readonly calculation: Calculation,
    ) {

    }

    copyWith(calculation: Calculation): CalculatorState {
        return new CalculatorState(calculation);
    }

}

/** Represents the initially relevant data necessary in order to render the calculator UI */
@Freezed
class InitialCalculatorState extends CalculatorState {
    constructor() {
        super(new Calculation(0, 0, Operation.None, 0));
    }
}

/** Represents the relevant data necessary in order to render the calculator UI after successful processing of a calculation */
@Freezed
class SuccessCalculatorState extends CalculatorState {
    constructor(
        calculation: Calculation,
    ) {
        super(calculation);
    }



}

/** Represents the relevant data necessary in order to render the calculator UI after unsuccessful processing of a calculation */
@Freezed
class ErrorCalculatorState extends CalculatorState {

}

export { CalculatorState, InitialCalculatorState, SuccessCalculatorState, ErrorCalculatorState };
