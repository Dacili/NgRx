import { createAction } from "@ngrx/store";

export const increment_Action = createAction('[Counter] increment');
export const decrement_Action = createAction('[Counter] decrement');
export const reset_Action = createAction('[Counter] reset');
