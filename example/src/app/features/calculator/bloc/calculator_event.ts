import { Freezed } from "ts-bloc";

abstract class CalculatorEvent { }

@Freezed
class FirstNumberUpdated extends CalculatorEvent {
    constructor(public readonly firstNumber: number) {
        super();
    }
}

@Freezed
class SecondNumberUpdated extends CalculatorEvent { 
    constructor(public readonly secondNumber: number) {
        super();
    }
}

@Freezed
class NextOperationSelected extends CalculatorEvent { }

@Freezed
class PreviousOperationSelected extends CalculatorEvent { }

@Freezed
class SaveButtonPressed extends CalculatorEvent { }

export { CalculatorEvent, FirstNumberUpdated, SecondNumberUpdated, NextOperationSelected, PreviousOperationSelected, SaveButtonPressed };