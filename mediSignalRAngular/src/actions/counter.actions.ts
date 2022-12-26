import { createAction } from "@ngrx/store";

export const increment = createAction('increment counter');
export const decrement = createAction('decrement counter');

export const reset = createAction('reset counter');
