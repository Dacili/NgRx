import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ApisService } from '../../services/apis.service';
import {
  loadAllUsersSuccess_Action,
  loadAllUsers_Action,
} from '../actions/users.actions';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private apiService: ApisService) {}

  @Effect()
  loadUsers$ = this.actions$.pipe(
    ofType(loadAllUsers_Action),
    mergeMap(() =>
      this.apiService.getUsers().pipe(
        map(
          (allUsers): any => loadAllUsersSuccess_Action({ users: allUsers }),
          catchError((error) => EMPTY)
        )
        // we could also create action for failure response
      )
    )
  );
}
