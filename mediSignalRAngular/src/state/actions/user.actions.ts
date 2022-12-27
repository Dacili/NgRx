import { createAction, props } from "@ngrx/store";


// action with params, metadata
export const loginUser = createAction('[User] saveUser', props<{
  username: string;
  password: string;
}>() // this () is important, it behaves like a function
);
