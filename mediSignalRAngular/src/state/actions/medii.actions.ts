import { createAction, props } from '@ngrx/store';

// testing @ngrx/schematics, for scaffolding
export const loadMediis = createAction(
  '[Medii] Load Mediis'
);

export const loadMediisSuccess = createAction(
  '[Medii] Load Mediis Success',
  props<{ data: any }>()
);

export const loadMediisFailure = createAction(
  '[Medii] Load Mediis Failure',
  props<{ error: any }>()
);
