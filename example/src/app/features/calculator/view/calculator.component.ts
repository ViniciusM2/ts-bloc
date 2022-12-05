import { Component } from '@angular/core';
import { CalculatorBloc } from '../bloc/calculator_bloc';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  constructor(private calculatorBloc: CalculatorBloc) {

  }
}
