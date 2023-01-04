import {
  ActionReducerMap,
  combineReducers,
  createReducer,
  on,
} from '@ngrx/store';
import { loginUser_Action } from '../actions/user.actions';
import {
  deleteLastUser_Action,
  deleteUserById_Action,
  loadAllUsersSuccess_Action,
} from '../actions/users.actions';
import { AppState, initialState, User } from '../state';

export interface UsersState {
  users: any;
  sizeOfCompany: any;
}

export const users_Reducer = createReducer(
  initialState.usersState,
  // adding new user
  on(loginUser_Action, (state, props): UsersState => {
    return {
      ...state,
      users: [
        ...state.users,
        {
          id:
            state.users.length == 0
              ? 1
              : state.users[state.users.length - 1].id + 1,
          name: props.username,
          surname: props.password,
        },
      ],
      sizeOfCompany: state.users.length + 1 >= 3 ? 'medium' : 'small',
      // length of state.users, is not yet update, so we have to add +1,
      // to count also newly added
    };
  }),
  // deletes last user
  on(deleteLastUser_Action, (state): UsersState => {
    return {
      ...state,
      users: [...state.users.slice(0, state.users.length - 1)],
      sizeOfCompany: state.users.length - 1 >= 3 ? 'medium' : 'small',
      // same here, -1 for delete
    };
  }),
  // deletes user by id
  on(deleteUserById_Action,
    // param without props
    (state, { id }) => ({
    //(state, props): UsersState
      ...state,
      users: state.users.filter((user: User): any => user.id != id),
      sizeOfCompany: state.users.length - 1 >= 3 ? 'medium' : 'small',
      // same here, -1 for delete
  })),
  on(loadAllUsersSuccess_Action, (state, props): UsersState => {
    return {
      ...state,
      users: props.users,
      sizeOfCompany: props.users.length >= 3 ? 'medium' : 'small',
      // same here, -1 for delete
    };
  })
);

// AKO OBRAĐUJEM PROPERTYE IZ STATE-A, ONDA SVE STRPATI U 1 REDUCEER!!!!
// ISTO K'O ZA COUNTER ŠTO SAM!!!!
// NEMA SMISLA PRAVITI 2 ODVOJENA REDUCERA ZA 1 PROPERTY, ZATO TEHNIČKI NIJE NI
// MOGLO!!

//export const deleteLastUserReducer = createReducer(initialState.usersState,
//  on(deleteLastUser_Action, (state, props): UsersState => {
//    return {
//      ...state, users: [...state.users.slice(0, state.users.length-1)]
//    }
//  })
//);
//export const users_Reducers = combineReducers({
//  "users": users_Reducer,
//  "sizeOfCompany": updateSizeOfCompany_Reducer
//})
//export const users_Reducers = combineReducers({
//  users_Reducer,updateSizeOfCompany_Reducer
//})

//export const users_Reducers: ActionReducerMap<UsersState> = {
//  users: users_Reducer,
//  sizeOfCompany: updateSizeOfCompany_Reducer
//  //, deleteLastUserReducer
//  //users: addUserReducer
//  //,
//  //addUserReducer: addUserReducer
//};
