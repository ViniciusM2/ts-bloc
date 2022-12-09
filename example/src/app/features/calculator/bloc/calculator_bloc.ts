import { Bloc } from 'ts-bloc';
import { CalculatorState, InitialCalculatorState, SuccessCalculatorState } from './calculator_state';
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
        switch (this.state.calculation.operation) {
            case Operation.Add:
                return new SuccessCalculatorState(this.state.calculation.copyWith({ result: event.firstNumber + this.state.calculation.secondNumber, firstNumber: event.firstNumber }));
            case Operation.Subtract:
                return new SuccessCalculatorState(this.state.calculation.copyWith({ result: event.firstNumber - this.state.calculation.secondNumber, firstNumber: event.firstNumber }));
            case Operation.Multiply:
                return new SuccessCalculatorState(this.state.calculation.copyWith({ result: event.firstNumber * this.state.calculation.secondNumber, firstNumber: event.firstNumber }));
            case Operation.Divide:
                return new SuccessCalculatorState(this.state.calculation.copyWith({ result: event.firstNumber / this.state.calculation.secondNumber, firstNumber: event.firstNumber }));
            case Operation.None:
                return new SuccessCalculatorState(this.state.calculation.copyWith({ result: 0, firstNumber: event.firstNumber }));
        }
    }

    private onSecondNumberUpdated(event: SecondNumberUpdated): CalculatorState {

        switch (this.state.calculation.operation) {
            case Operation.Add:
                return new SuccessCalculatorState(this.state.calculation.copyWith({ result: this.state.calculation.firstNumber + event.secondNumber, secondNumber: event.secondNumber }));
            case Operation.Subtract:
                return new SuccessCalculatorState(this.state.calculation.copyWith({ result: this.state.calculation.firstNumber - event.secondNumber, secondNumber: event.secondNumber }));
            case Operation.Multiply:
                return new SuccessCalculatorState(this.state.calculation.copyWith({ result: this.state.calculation.firstNumber * event.secondNumber, secondNumber: event.secondNumber }));
            case Operation.Divide:
                return new SuccessCalculatorState(this.state.calculation.copyWith({ result: this.state.calculation.firstNumber / event.secondNumber, secondNumber: event.secondNumber }));
            case Operation.None:
                return new SuccessCalculatorState(this.state.calculation.copyWith({ result: 0, secondNumber: event.secondNumber }));
        }
    }

    private onNextOperationSelected(event: NextOperationSelected): CalculatorState {
        switch (this.state.calculation.operation) {
            case Operation.Add:
                return this.state.copyWith(this.state.calculation.copyWith({ operation: Operation.Subtract })) as SuccessCalculatorState;
            case Operation.Subtract:
                return this.state.copyWith(this.state.calculation.copyWith({ operation: Operation.Multiply })) as SuccessCalculatorState;
            case Operation.Multiply:
                return this.state.copyWith(this.state.calculation.copyWith({ operation: Operation.Divide })) as SuccessCalculatorState;
            case Operation.Divide:
                return this.state.copyWith(this.state.calculation.copyWith({ operation: Operation.None })) as SuccessCalculatorState;
            case Operation.None:
                return this.state.copyWith(this.state.calculation.copyWith({ operation: Operation.Add })) as SuccessCalculatorState;
        }
    }

    private onPreviousOperationSelected(event: PreviousOperationSelected) {
        switch (this.state.calculation.operation) {
            case Operation.Add:
                return this.state.copyWith(this.state.calculation.copyWith({ operation: Operation.None })) as SuccessCalculatorState;
            case Operation.Subtract:
                return this.state.copyWith(this.state.calculation.copyWith({ operation: Operation.Add })) as SuccessCalculatorState;
            case Operation.Multiply:
                return this.state.copyWith(this.state.calculation.copyWith({ operation: Operation.Subtract })) as SuccessCalculatorState;
            case Operation.Divide:
                return this.state.copyWith(this.state.calculation.copyWith({ operation: Operation.Multiply })) as SuccessCalculatorState;
            case Operation.None:
                return this.state.copyWith(this.state.calculation.copyWith({ operation: Operation.Divide })) as SuccessCalculatorState;
        }
    }

    private async *onSaveButtonPressed(event: SaveButtonPressed) {
        await this.repository.save();
    }
}

