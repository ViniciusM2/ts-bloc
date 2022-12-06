import { Component } from '@angular/core';
import { CalculatorBloc } from '../bloc/calculator_bloc';
import { NextOperationSelected, PreviousOperationSelected } from '../bloc/calculator_event';
import { Operation } from '../model/calculation';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  constructor(private calculatorBloc: CalculatorBloc) {
    this.currentOperation = calculatorBloc.state.operation;
    this.title = this.getTitleStringFromOperation(calculatorBloc.state.operation);
    calculatorBloc.listen((state) => {
      console.log(state);
      this.currentOperation = state.operation;
      this.title = this.getTitleStringFromOperation(state.operation);
    });
  }

  currentOperation: Operation = Operation.None;
  title = 'None';

  public onNext(){
    // console.log('next');
    this.calculatorBloc.add(new NextOperationSelected());
  }

  public onPrevious(){
    // console.log('previous');
    this.calculatorBloc.add(new PreviousOperationSelected());
  }


  private getTitleStringFromOperation(operation: Operation): string {
    switch (operation) {
      case Operation.Add:
        return 'Add';
      case Operation.Subtract:
        return 'Subtract';
      case Operation.Multiply:
        return 'Multiply';
      case Operation.Divide:
        return 'Divide';
      case Operation.None:
        return 'None';
      default:
        return 'None';
    }
  }
}
