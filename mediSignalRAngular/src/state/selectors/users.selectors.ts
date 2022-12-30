import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UsersState } from "../reducers/users.reducer";
import { AppState } from "../state";


//export const selectUsers = (state: AppState) => state.usersState;

//export const getAllUsers_Selector = createSelector(
//  (state: AppState) => state.usersState,
//  (state: UsersState) => state.users
//);

export const usersFeatureKey = 'Users Feature';
export const selectUsersFeature = createFeatureSelector<UsersState>(
  usersFeatureKey
);

export const getAllUsers_Selector = createSelector(
  selectUsersFeature,
  (state: UsersState) => state.users
);

export const getSizeOfCompany_Selector = createSelector(
  selectUsersFeature,
  (state: UsersState) => state.sizeOfCompany
);
