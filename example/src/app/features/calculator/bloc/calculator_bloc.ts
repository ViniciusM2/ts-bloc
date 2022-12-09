import { Bloc } from 'ts-bloc';
import { CalculatorState, InitialCalculatorState } from './calculator_state';
import { CalculatorEvent, FirstNumberUpdated, NextOperationSelected, PreviousOperationSelected, SaveButtonPressed, SecondNumberUpdated } from './calculator_event';
import { Operation } from '../model/calculation';
import { Injectable } from '@angular/core';
import { CalculatorRepository } from '../repository/calculatorRepository';

@Injectable({
    providedIn: 'root'
})
export class CalculatorBloc extends Bloc<CalculatorEvent, CalculatorState> {
    constructor(
        private repository: CalculatorRepository
    ) {
        super(
            new InitialCalculatorState()
        );
    }
    async *mapEventToState(event: CalculatorEvent): AsyncIterableIterator<CalculatorState> {
        switch (event.constructor.prototype) {
            case FirstNumberUpdated.prototype:
                yield this.onFirstNumberUpdated(event as FirstNumberUpdated);
                break;
            case SecondNumberUpdated.prototype:
                yield this.onSecondNumberUpdated(event as SecondNumberUpdated);
                break;
            case NextOperationSelected.prototype:
                yield this.onNextOperationSelected(event as NextOperationSelected);
                break;
            case PreviousOperationSelected.prototype:
                yield this.onPreviousOperationSelected(event as PreviousOperationSelected);
                break;
            case SaveButtonPressed.prototype:
                this.onSaveButtonPressed(event as SaveButtonPressed);
                break;
            default:
                console.log('Unknown event');
                break;
        }
    }

    private onFirstNumberUpdated(event: FirstNumberUpdated) {
        switch (this.state.operation) {
            case Operation.Add:
                return this.state.copyWith({ result: event.firstNumber + this.state.secondNumber });
            case Operation.Subtract:
                return this.state.copyWith({ result: event.firstNumber - this.state.secondNumber });
            case Operation.Multiply:
                return this.state.copyWith({ result: event.firstNumber * this.state.secondNumber });
            case Operation.Divide:
                return this.state.copyWith({ result: event.firstNumber / this.state.secondNumber });
            case Operation.None:
                return this.state.copyWith({ result: event.firstNumber });
        }
    }

    private onSecondNumberUpdated(event: SecondNumberUpdated) {
        switch (this.state.operation) {
            case Operation.Add:
                return this.state.copyWith({ result: event.secondNumber + this.state.firstNumber });
            case Operation.Subtract:
                return this.state.copyWith({ result: event.secondNumber - this.state.firstNumber });
            case Operation.Multiply:
                return this.state.copyWith({ result: event.secondNumber * this.state.firstNumber });
            case Operation.Divide:
                return this.state.copyWith({ result: event.secondNumber / this.state.firstNumber });
            case Operation.None:
                return this.state.copyWith({ result: event.secondNumber });
        }
    }

    private onNextOperationSelected(event: NextOperationSelected) {
        console.log(this.state.operation)
        switch (this.state.operation) {
            case Operation.Add:
                return this.state.copyWith({ operation: Operation.Subtract });
            case Operation.Subtract:
                return this.state.copyWith({ operation: Operation.Multiply });
            case Operation.Multiply:
                return this.state.copyWith({ operation: Operation.Divide });
            case Operation.Divide:
                return this.state.copyWith({ operation: Operation.None });
            case Operation.None:
                return this.state.copyWith({ operation: Operation.Add });
        }
    }

    private onPreviousOperationSelected(event: PreviousOperationSelected) {
        switch (this.state.operation) {
            case Operation.Add:
                return this.state.copyWith({ operation: Operation.None });
            case Operation.Subtract:
                return this.state.copyWith({ operation: Operation.Add });
            case Operation.Multiply:
                return this.state.copyWith({ operation: Operation.Subtract });
            case Operation.Divide:
                return this.state.copyWith({ operation: Operation.Multiply });
            case Operation.None:
                return this.state.copyWith({ operation: Operation.Divide });
        }
    }

    private async *onSaveButtonPressed(event: SaveButtonPressed) {
        await this.repository.save();
    }
}

