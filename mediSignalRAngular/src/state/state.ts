import { CounterState } from "./reducers/counter.reducer";
import { UserState } from "./reducers/user.reducer";
import { UsersState } from "./reducers/users.reducer";

export interface AppState {
  counterState: CounterState;
  userState: UserState;
  usersState: UsersState;
}

export interface User {
  id: number | undefined;
  name: string | undefined;
  surname: string | undefined;
}

let Users
  : Array<User>
  = [];
//  {
//  'id': 1, 'name': 'medina', 'surname': 'daciii'
//}
  //,
  Users.push({
    id: 1, name: 'helloo', surname: 'world'
  }
)


export const initialState: AppState = {
  counterState: { counter: 0 },
  userState: {
    username: "",
    password: ""
  },
  usersState: {
    users: Users,
    sizeOfCompany: "small"
  }
}
