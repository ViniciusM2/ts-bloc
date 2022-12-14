import { Bloc, BlocObserver, NextFunction, Transition } from '../lib/bloc'
import { Observable } from 'rxjs'
import { distinct, switchMap } from 'rxjs/operators'

export class CounterBlocError extends Error {}

export enum CounterEvent {
  increment = 'INCREMENT',
  decrement = 'DECREMENT',
  doNothing = 'DO_NOTHING',
  badEvent = 'BAD_EVENT'
}

export class CounterBloc extends Bloc<CounterEvent, number> {
  constructor(private throwOnTransition: boolean = false) {
    super(0)
  }

  async *mapEventToState(event: CounterEvent) {
    switch (event) {
      case CounterEvent.increment:
        yield this.state + 1
        break
      case CounterEvent.decrement:
        yield this.state - 1
        break
      case CounterEvent.doNothing:
        yield this.state
        break
      case CounterEvent.badEvent:
        throw new CounterBlocError()
    }
  }

  override onTransition(_: Transition<CounterEvent, number>) {
    super.onTransition(_)
    if (this.throwOnTransition) {
      throw new CounterBlocError()
    }
    return
  }
}

export class DistinctCounterBloc extends CounterBloc {
  override transformEvents(events: Observable<CounterEvent>, next: NextFunction<CounterEvent, number>) {
    return super.transformEvents(events.pipe(distinct()), next)
  }
}

export class SwitchMapCounterBloc extends CounterBloc {
  override transformEvents(events: Observable<CounterEvent>, next: NextFunction<CounterEvent, number>) {
    return events.pipe(switchMap(next))
  }
}

export class MyBlocObserver extends BlocObserver {}
