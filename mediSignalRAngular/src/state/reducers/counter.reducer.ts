import { createReducer, on } from '@ngrx/store';
import {
  decrement_Action,
  increment_Action,
  reset_Action,
} from '../actions/counter.actions';
import { initialState } from '../state';

export interface CounterState {
  counter: number;
}

export const counter_Reducer = createReducer(
  initialState.counterState,
  on(increment_Action, (state) => ({ ...state, counter: state.counter + 1 })),
  on(decrement_Action, (state) => ({ ...state, counter: state.counter - 1 })),
  on(reset_Action, (state) => ({ ...state, counter: 0 }))

  // possible also to use return but without ()
  //on(increment, state => { return { ...state, counter: state.counter + 1 } }),
  //on(decrement, state => { return { ...state, counter: state.counter - 1 } }),
  //on(reset, state => {
  //  return { ...state, counter: 0 }
  //})
);
