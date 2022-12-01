import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InitialCalculatorState } from '../bloc/calculator_state';

import { CalculatorComponent } from './calculator.component';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalculatorComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('InitialCalculatorState should be immutable', () => {
    // Declare a type that undo the 
    type Writeable<T> = { -readonly [P in keyof T]: T[P] };
    const state: Writeable<InitialCalculatorState> = new InitialCalculatorState();
    expect(state.firstNumber).toBe(0);
    try {
      state.firstNumber = 1;
    } catch (error) {
      // Expect a TypeError to be thrown
      expect(error).toBeInstanceOf(TypeError);
    }
    expect(state.firstNumber).toBe(0);
  })
});
