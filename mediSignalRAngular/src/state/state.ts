import { CounterState } from "./reducers/counter.reducer";
import { UserState } from "./reducers/user.reducer";

export interface AppState {
  counterState: CounterState;
  userState: UserState;
}

export const initialState: AppState = {
  counterState: { counter: 0 },
  userState: {
    username: "",
    password: ""
  }
}
