
abstract class CalculatorEvent { }

class FirstNumberUpdated extends CalculatorEvent {
    constructor(public firstNumber: Number) {
        super();
    }
}

class SecondNumberUpdated extends CalculatorEvent { }

class NextOperationSelected extends CalculatorEvent { }

class PreviousCalculationSelected extends CalculatorEvent { }

class SaveButtonPressed extends CalculatorEvent { }