import { createReducer, on } from "@ngrx/store";
import { loginUser } from "../actions/user.actions";
import { initialState } from "../state";

export interface UserState {
  username: string;
  password: string;
}

// reducer to handle action with props (params/metadata)
export const performLoginReducer = createReducer(initialState.userState,
  on(loginUser, (state, props) => {
    return {
      ...state,
      username: props.username, password: props.password
    };
  }));
