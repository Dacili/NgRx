import { createSelector } from "@ngrx/store";
import { UserState } from "../reducers/user.reducer";
import { AppState } from "../state";


export const selectUser = (state: AppState) => state.userState;

export const selectUsername = createSelector(
  //selectUser,
  (state: AppState) => state.userState,
  (state: UserState) => state.username
);


// USER AS A FEATURE
//export const userFeatureKey = 'user';
//export const selectUserFeature = createFeatureSelector<UserState>(
//  userFeatureKey,
//);

//export const selectUsername = createSelector(
//  selectUserFeature,
//  (state: UserState) => state.username
//);

