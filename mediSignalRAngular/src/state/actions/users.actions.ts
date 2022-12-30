import { createAction, props } from "@ngrx/store";

export const deleteLastUser_Action = createAction('[Users] delete last user');
export const loadAllUsers_Action = createAction('[Users] load all users');
export const loadAllUsersSuccess_Action = createAction('[Users] load all users success', props<{
  users: any
}>()
);
