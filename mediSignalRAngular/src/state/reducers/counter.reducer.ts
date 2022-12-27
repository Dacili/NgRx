import { createReducer, on } from "@ngrx/store";
import { decrement, increment, reset } from "../actions/counter.actions";
import { initialState } from "../state";

export interface CounterState {
  counter: number;
}

export const counterReducer = createReducer(initialState.counterState,
  on(increment, state => ({ ...state, counter: state.counter + 1 })),
  on(decrement, state => ({ ...state, counter: state.counter - 1 })),
  on(reset, state => ({ ...state, counter: 0 })),

  // possible also to use return but without ()
  //on(increment, state => { return { ...state, counter: state.counter + 1 } }),
  //on(decrement, state => { return { ...state, counter: state.counter - 1 } }),
  //on(reset, state => {
  //  return { ...state, counter: 0 }
  //})
);
