import { createSelector } from "@ngrx/store";
import { CounterState } from "../reducers/counter.reducer";
import { AppState } from "../state";


export const getCount_Selector = createSelector(
  (state: AppState) => state.counterState,
  (state: CounterState) => state.counter
);


// If we want to extract some reducers and state for one specific
// FEATURE,
// we will need to update also app-module
// StoreModule.forFeature(mediFeatureKey, counterReducer)


//export const mediFeatureKey = 'Medi';
/*const mediFeature = createFeatureSelector('Medi');*/
//export const selectCounterFeature = createFeatureSelector<CounterState>(
//  mediFeatureKey,
//);

//export const selectCount = createSelector(
//  selectCounterFeature,
//  (state: CounterState) => state.counter
//);

