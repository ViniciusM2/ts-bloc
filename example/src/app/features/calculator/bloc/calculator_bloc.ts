import { Bloc } from 'ng-bloc/lib/bloc';
import { CalculatorState, InitialCalculatorState } from './calculator_state';
import { CalculatorEvent, FirstNumberUpdated, NextOperationSelected, PreviousCalculationSelected, SaveButtonPressed, SecondNumberUpdated } from './calculator_event';
import { Operation } from '../model/calculation';
import { Injectable } from '@angular/core';
import { CalculatorRepository } from '../repository/calculatorRepository';

@Injectable({
    providedIn: 'root'
})
export class CalculatorBloc extends Bloc<CalculatorEvent, CalculatorState> {
    // constructor(
    //     private repository: CalculatorRepository
    // ) {
    //     super(
    //         new InitialCalculatorState()
    //     );
    // }
    async *mapEventToState(event: CalculatorEvent): AsyncIterableIterator<CalculatorState> {
        switch (event) {
            case event instanceof FirstNumberUpdated:
                this.onFirstNumberUpdated(event as FirstNumberUpdated);
                break;
            case event instanceof SecondNumberUpdated:
                this.onSecondNumberUpdated(event as SecondNumberUpdated);
                break;
            case event instanceof NextOperationSelected:
                this.onNextOperationSelected(event as NextOperationSelected);
                break;
            case event instanceof PreviousCalculationSelected:
                this.onPreviousCalculationSelected(event as PreviousCalculationSelected);
                break;
            case event instanceof SaveButtonPressed:
                this.onSaveButtonPressed(event as SaveButtonPressed);
                break;
            default:
                break;
        }
    }

    private *onFirstNumberUpdated(event: FirstNumberUpdated) {
        if (event.firstNumber != this.state.firstNumber) {
            yield this.state.copyWith({ firstNumber: event.firstNumber });
        }
        switch (this.state.operation) {
            case Operation.Add:
                yield this.state.copyWith({ result: event.firstNumber + this.state.secondNumber });
                break;
            case Operation.Subtract:
                yield this.state.copyWith({ result: event.firstNumber - this.state.secondNumber });
                break;
            case Operation.Multiply:
                yield this.state.copyWith({ result: event.firstNumber * this.state.secondNumber });
                break;
            case Operation.Divide:
                yield this.state.copyWith({ result: event.firstNumber / this.state.secondNumber });
                break;
            case Operation.None:
                yield this.state.copyWith({ result: event.firstNumber });
                break;
        }
    }

    private *onSecondNumberUpdated(event: SecondNumberUpdated) {
        if (event.secondNumber != this.state.secondNumber) {
            yield this.state.copyWith({ secondNumber: event.secondNumber });
        }
        switch (this.state.operation) {
            case Operation.Add:
                yield this.state.copyWith({ result: event.secondNumber + this.state.firstNumber });
                break;
            case Operation.Subtract:
                yield this.state.copyWith({ result: event.secondNumber - this.state.firstNumber });
                break;
            case Operation.Multiply:
                yield this.state.copyWith({ result: event.secondNumber * this.state.firstNumber });
                break;
            case Operation.Divide:
                yield this.state.copyWith({ result: event.secondNumber / this.state.firstNumber });
                break;
            case Operation.None:
                yield this.state.copyWith({ result: event.secondNumber });
                break;
        }
    }

    private *onNextOperationSelected(event: NextOperationSelected) {
        switch (this.state.operation) {
            case Operation.Add:
                yield this.state.copyWith({ operation: Operation.Subtract });
                break;
            case Operation.Subtract:
                yield this.state.copyWith({ operation: Operation.Multiply });
                break;
            case Operation.Multiply:
                yield this.state.copyWith({ operation: Operation.Divide });
                break;
            case Operation.Divide:
                yield this.state.copyWith({ operation: Operation.None });
                break;
            case Operation.None:
                yield this.state.copyWith({ operation: Operation.Add });
                break;
        }
    }

    private *onPreviousCalculationSelected(event: PreviousCalculationSelected) {
        switch (this.state.operation) {
            case Operation.Add:
                yield this.state.copyWith({ operation: Operation.None });
                break;
            case Operation.Subtract:
                yield this.state.copyWith({ operation: Operation.Add });
                break;
            case Operation.Multiply:
                yield this.state.copyWith({ operation: Operation.Subtract });
                break;
            case Operation.Divide:
                yield this.state.copyWith({ operation: Operation.Multiply });
                break;
            case Operation.None:
                yield this.state.copyWith({ operation: Operation.Divide });
        }
    }

    private async *onSaveButtonPressed(event: SaveButtonPressed) {
        await this.repository.save();
    }
}

