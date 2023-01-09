import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "../state";
import { counter_Reducer } from "./counter.reducer";
import { performLogin_Reducer } from "./user.reducer";
import { users_Reducer } from "./users.reducer";

// If we want only 1 import in ngModule like:
// StoreModule.forRoot(main_Reducer)
export const main_Reducer: ActionReducerMap<AppState> = {
  counterState: counter_Reducer,
  userState: performLogin_Reducer,
  usersState: users_Reducer
};
