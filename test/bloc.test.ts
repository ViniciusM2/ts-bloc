import { BlocObserver, Transition, EventStreamClosedError, Bloc } from '../lib/bloc'
import {
  CounterBloc,
  CounterEvent,
  CounterBlocError,
  DistinctCounterBloc,
  SwitchMapCounterBloc
} from './test-helpers'

describe('CounterBloc', () => {
  let counterBloc: CounterBloc
  let blocObserver: BlocObserver

  beforeEach(() => {
    counterBloc = new CounterBloc()
    blocObserver = Bloc.observer
    jest.spyOn(blocObserver, 'onEvent').mockReturnValue(undefined)
    jest.spyOn(blocObserver, 'onTransition').mockReturnValue (undefined)
    jest.spyOn(blocObserver, 'onError').mockReturnValue (undefined)
  })

  afterEach(() => {
    counterBloc.close()
    jest.restoreAllMocks()
  })

  it('is instantiable', () => {
    expect(counterBloc).toBeInstanceOf(CounterBloc)
  })

  it('has correct initial state', () => {
    expect(counterBloc.state).toEqual(0)
  })

  it('has correct state stream before events are added', done => {
    const emittedStates: number[] = []
    counterBloc.listen(
      state => {
        emittedStates.push(state)
      },
      undefined,
      () => {
        expect(emittedStates).toEqual([])
        done()
      }
    )
    setTimeout(() => {
      counterBloc.close()
    }, 0)
  })

  it('has correct state after a single event is added', done => {
    const emittedStates: number[] = []
    counterBloc.listen(
      state => {
        emittedStates.push(state)
      },
      undefined,
      () => {
        expect(emittedStates).toEqual([1])
        expect(blocObserver.onEvent).toBeCalledWith(counterBloc, CounterEvent.increment)
        expect(blocObserver.onTransition).toBeCalledWith(
          counterBloc,
          new Transition(0, CounterEvent.increment, 1)
        )
        expect(blocObserver.onError).not.toBeCalled()
        done()
      }
    )
    counterBloc.add(CounterEvent.increment)
    setTimeout(() => {
      counterBloc.close()
    }, 0)
  })

  it('has correct state after a multiple events are added', done => {
    const emittedStates: number[] = []
    counterBloc.listen(
      state => {
        emittedStates.push(state)
      },
      undefined,
      () => {
        expect(emittedStates).toEqual([1, 2, 3])
        expect(blocObserver.onEvent).toBeCalledWith(counterBloc, CounterEvent.increment)
        expect(blocObserver.onEvent).toBeCalledTimes(3)
        expect(blocObserver.onTransition).toBeCalledWith(
          counterBloc,
          new Transition(0, CounterEvent.increment, 1)
        )
        expect(blocObserver.onTransition).toBeCalledWith(
          counterBloc,
          new Transition(1, CounterEvent.increment, 2)
        )
        expect(blocObserver.onTransition).toBeCalledWith(
          counterBloc,
          new Transition(2, CounterEvent.increment, 3)
        )
        expect(blocObserver.onTransition).toBeCalledTimes(3)
        expect(blocObserver.onError).not.toBeCalled()
        done()
      }
    )
    counterBloc.add(CounterEvent.increment)
    counterBloc.add(CounterEvent.increment)
    counterBloc.add(CounterEvent.increment)
    setTimeout(() => {
      counterBloc.close()
    }, 0)
  })

  it('has correct state when mapEventToState yields the same state', done => {
    const emittedStates: number[] = []
    counterBloc.listen(
      state => {
        emittedStates.push(state)
      },
      undefined,
      () => {
        expect(emittedStates).toEqual([0])
        expect(blocObserver.onEvent).toBeCalledWith(counterBloc, CounterEvent.doNothing)
        expect(blocObserver.onTransition).toBeCalledWith(
          counterBloc,
          new Transition(0, CounterEvent.doNothing, 0)
        )
        expect(blocObserver.onError).not.toBeCalled()
        done()
      }
    )
    counterBloc.add(CounterEvent.doNothing)
    setTimeout(() => {
      counterBloc.close()
    }, 0)
  })

  it('has correct state when mapEventToState yields the same state multiple times', done => {
    const emittedStates: number[] = []
    counterBloc.listen(
      state => {
        emittedStates.push(state)
      },
      undefined,
      () => {
        expect(emittedStates).toEqual([0])
        expect(blocObserver.onEvent).toBeCalledWith(counterBloc, CounterEvent.doNothing)
        expect(blocObserver.onTransition).toBeCalledWith(
          counterBloc,
          new Transition(0, CounterEvent.doNothing, 0)
        )
        expect(blocObserver.onError).not.toBeCalled()
        done()
      }
    )
    counterBloc.add(CounterEvent.doNothing)
    counterBloc.add(CounterEvent.doNothing)
    setTimeout(() => {
      counterBloc.close()
    }, 0)
  })

  it('has correct state when transform used to filter distinct events', done => {
    counterBloc = new DistinctCounterBloc()
    const emittedStates: number[] = []
    counterBloc.listen(
      state => {
        emittedStates.push(state)
      },
      undefined,
      () => {
        expect(emittedStates).toEqual([1])
        expect(blocObserver.onEvent).toBeCalledWith(counterBloc, CounterEvent.increment)
        expect(blocObserver.onTransition).toBeCalledWith(
          counterBloc,
          new Transition(0, CounterEvent.increment, 1)
        )
        expect(blocObserver.onError).not.toBeCalled()
        done()
      }
    )
    counterBloc.add(CounterEvent.increment)
    counterBloc.add(CounterEvent.increment)
    setTimeout(() => {
      counterBloc.close()
    }, 0)
  })

  it('has correct state when transform used to switchMap events', done => {
    counterBloc = new SwitchMapCounterBloc()
    const emittedStates: number[] = []
    counterBloc.listen(
      state => {
        emittedStates.push(state)
      },
      undefined,
      () => {
        expect(emittedStates).toEqual([-1])
        expect(blocObserver.onEvent).toBeCalledWith(counterBloc, CounterEvent.decrement)
        expect(blocObserver.onTransition).toBeCalledWith(
          counterBloc,
          new Transition(0, CounterEvent.decrement, -1)
        )
        expect(blocObserver.onError).not.toBeCalled()
        done()
      }
    )
    counterBloc.add(CounterEvent.increment)
    counterBloc.add(CounterEvent.decrement)
    setTimeout(() => {
      counterBloc.close()
    }, 0)
  })

  it('has correct state when mapEventToState throws exception', done => {
    const emittedStates: number[] = []
    counterBloc.listen(
      state => {
        emittedStates.push(state)
      },
      undefined,
      () => {
        expect(emittedStates).toEqual([])
        expect(blocObserver.onEvent).toBeCalledWith(counterBloc, CounterEvent.badEvent)
        expect(blocObserver.onTransition).not.toBeCalled()
        expect(blocObserver.onError).toBeCalledWith(counterBloc, new CounterBlocError())
        expect(blocObserver.onError).toBeCalledTimes(1)
        done()
      }
    )
    counterBloc.add(CounterEvent.badEvent)
    setTimeout(() => {
      counterBloc.close()
    }, 0)
  })

  it('calls onError when onTransition throws', done => {
    counterBloc = new CounterBloc(true)
    const emittedStates: number[] = []
    counterBloc.listen(
      state => {
        emittedStates.push(state)
      },
      undefined,
      () => {
        expect(emittedStates).toEqual([])
        expect(blocObserver.onError).toBeCalledWith(counterBloc, new CounterBlocError())
        expect(blocObserver.onError).toBeCalledTimes(1)
        done()
      }
    )
    counterBloc.add(CounterEvent.increment)
    setTimeout(() => {
      counterBloc.close()
    }, 0)
  })

  it('cannot add after close called', () => {
    counterBloc.close()
    counterBloc.add(CounterEvent.increment)

    expect(blocObserver.onError).toBeCalledWith(counterBloc, new EventStreamClosedError())
    expect(blocObserver.onError).toBeCalledTimes(1)
  })
})
