import { createReducer, on } from "@ngrx/store";
import { loginUser_Action } from "../actions/user.actions";
import { initialState } from "../state";

export interface UserState {
  username: string;
  password: string;
}

// reducer to handle action with props (params/metadata)
export const performLogin_Reducer = createReducer(initialState.userState,
  on(loginUser_Action, (state, props) => {
    return {
      ...state,
      username: props.username, password: props.password
    };
  }));
