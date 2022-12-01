import { Bloc } from 'ng-bloc';
import { CalculatorState } from './calculator_state';
import { CalculatorEvent } from './calculator_event';

export class CalculatorBloc extends Bloc<CalculatorEvent, CalculatorState> {
    mapEventToState(event: CalculatorEvent): AsyncIterableIterator<CalculatorState> {
        throw new Error('Method not implemented.');
    } 
}

