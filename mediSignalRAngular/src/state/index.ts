import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';


//export const reducers: ActionReducerMap<any> = {
//  counterReducer: counterReducer,
//  performLogin: performLoginReducer
//};


export const metaReducers: MetaReducer<any>[] = isDevMode() ? [] : [];
