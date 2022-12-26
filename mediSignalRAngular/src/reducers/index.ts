import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { decrement, increment, reset } from '../actions/counter.actions';
import { loginUser } from '../actions/user.actions';

export const mediFeatureKey = 'Medi';
export const userFeatureKey = 'user';

export interface UserState {
  username: string;
  password: string;
}

export interface CounterState {
  counter: number;
}

export interface AppState {
  counterState: CounterState;
  userState: UserState;
}

export const initialState: AppState = {
  counterState : { counter: 0 },
userState : {
  username: "",
  password: ""
  }
}

//export const initialState: AppState = {
//   counter: 0,
//  username: "",
//  password: ""
//  }

export const counterReducer = createReducer(initialState.counterState,
  on(increment, state => ({ ...state, counter: state.counter + 1 })),
  on(decrement, state => ({ ...state, counter: state.counter - 1 })),
  on(reset, state => ({ ...state, counter: 0 }))
);

// reducer to handle action with props (params/metadata)
export const performLoginReducer = createReducer(initialState.userState,
  on(loginUser, (state, props) => ({
    ...state,
   username: props.username, password: props.password
  })));

export const reducers: ActionReducerMap<any> = {
  counterReducer: counterReducer,
  performLogin: performLoginReducer

};

/*const mediFeature = createFeatureSelector('Medi');*/
export const selectCounterFeature = createFeatureSelector<CounterState>(
  mediFeatureKey,
);

export const selectCount = createSelector(
  selectCounterFeature,
  (state: CounterState) => state.counter
);

export const selectUserFeature = createFeatureSelector<UserState>(
  userFeatureKey,
);

export const selectUsername = createSelector(
  selectUserFeature,
  (state: UserState) => state.username
);

export const metaReducers: MetaReducer<any>[] = isDevMode() ? [] : [];
