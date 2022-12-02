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

  it('should have an immutable initial state', () => {
    // Declare a type that undo the readonly modifier
    type Writeable<T> = { -readonly [P in keyof T]: T[P] };
    // Instantiate the supposed immutable object and cast it to the type that undo the readonly modifier
    const state: Writeable<InitialCalculatorState> = new InitialCalculatorState();
    // Verify the initial state
    expect(state.firstNumber).toBe(0);
    // Try to mutate the state
    try {
      // This should throw an error
      state.firstNumber = 1;
    } catch (error) {
      // Expect a TypeError to be thrown. 
      // This is the error that is thrown when trying to mutate a readonly property. 
      // It is also the error that is thrown when trying to mutate a frozen object.
      expect(error).toBeInstanceOf(TypeError);
    }
    // Verify that the state is still the same
    expect(state.firstNumber).toBe(0);
  })
});
