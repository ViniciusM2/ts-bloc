import { Bloc } from 'ng-bloc';

export class CalculatorBloc extends Bloc<CalculatorEvent, CalculatorState> {
    mapEventToState(event: CalculatorEvent): AsyncIterableIterator<CalculatorState> {
        throw new Error('Method not implemented.');
    } 
}

