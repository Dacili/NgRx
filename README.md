# NgRx

**NgRx** (https://ngrx.io/) Store provides reactive state management for Angular apps inspired by Redux. NgRx Store is mainly for managing global state across an entire application.   
* Use selectors for getting the immutable properties from the store,   
* activate (dispatch) actions   
* to trigger some update on state (reducers),   
* or to hit the APIs to get or save the data (effects).

Note: this code use the base code from this repo https://github.com/Dacili/Nswag-client-generation-with-Swagger, with additions for NgRx  
How to run this solution:
- *apiSignalR* is the backend project (.Net Core 6) - Focus in the code was on the frontend app, so the backend is not needed
- *frontendSignalRAngular* is the frontend project (Angular 13) - run it via cmd, with ng serve  

Gif of the test app and functionlities:  
![ngrx gif medi](https://user-images.githubusercontent.com/37112852/210093937-70d5cf15-a55b-4614-a6a8-bd14c1ddea4c.gif)  

You will need these pkgs:  
```  
 "@ngrx/effects": "^13.0.0",
 "@ngrx/store": "^13.0.0",
 "@ngrx/store-devtools": "^13.0.0",
```   
> **Note:** Make sure that you have same version of these, as you have the angular app ("@angular/core": "~13.0.0"), so you don't get diff kind of errors.  
  
For **scaffolding** the code with cmd, install this pkg:   
```  
npm i @ngrx/schematics@13.0.0     
```  
and then 
```     
ng add @ngrx/schematics
```  
or with this cmd:    
```     
ng config cli.defaultCollection @ngrx/schematics
```  
Without that, you will get error like:   ![image](https://user-images.githubusercontent.com/37112852/210547326-93518860-357f-4b01-ac7d-f7f6549dae82.png)
  
If you connected well, you will be able to run:  
``` 
ng generate action state/actions/Medii 
``` 
It will generate the code for new action.   


Organization of the files for ngrx:  
![image](https://user-images.githubusercontent.com/37112852/210094362-991226c0-1594-4654-a432-8975c100c82c.png)

The UI is in *app.component.html*, and the logic is in *app.component.ts.*  
The **main state** is the AppState. 
```
export interface AppState {
  counterState: CounterState;
  userState: UserState;
  usersState: UsersState;
}
```  
The classic way for **selectors** is:  
```
export const getCount_Selector = createSelector(
  (state: AppState) => state.counterState,
  (state: CounterState) => state.counter
);
```  
The **feature** way for selectors is:  
```
export const usersFeatureKey = 'Users Feature';
export const selectUsersFeature = createFeatureSelector<UsersState>(
  usersFeatureKey
);

export const getAllUsers_Selector = createSelector(
  selectUsersFeature,
  (state: UsersState) => state.users
);
```  
Notice *createFeatureSelector<**UsersState**>* that we're providing state interface for which one is this feature   

Classic **action, with no params**: 
```  
export const increment_Action = createAction('[Counter] increment');
```   
**Action, with params, with props**: 
```  
export const loginUser_Action = createAction('[User] saveUser', props<{
  username: string;
  password: string;
}>()
);
```  
**Action, with params, without props**: 
```  
export const deleteUserById_Action = createAction(
  '[Users] delete user by id',
  (id: number) => ({ id })
);
```  

Check also different types of reducers, also without or with params.
> ***Notice that you will need ONLY ONE REDUCER per state!!!***
 So in the main AppState, you have 3 nested states, meaning that 3 reducers are optimal. But if you had AppState with no nested states, only with properties, like:   
```  
export interface AppState {
  counter: number;
  username: string;
  surname: string; 
  users: [];
}
```    
in that case you will have only 1 reducer (check for ex. the users.reducer.ts).   

In **app.module.ts** add these:   
```  
StoreModule.forRoot({
      userState: performLogin_Reducer,
      counterState: counter_Reducer,
    }),
    
// here it knows that this feature is actually for usersState, because when we were creating feature we provided that state interface  
StoreModule.forFeature(usersFeatureKey, users_Reducer), 

EffectsModule.forRoot([UsersEffects]),
```   
This userState, counterState ***MUST BE THE SAME NAME, AS WE HAVE SPECIFIED IN THE MAIN STATE***   
OTHERWISE, WILL GET ERRORS like:  
      // core.mjs:6484 ERROR TypeError: Cannot read properties of undefined (reading 'username') at index.ts: 99: 31    

***If you want to do only 1 import in app module, then create this:***  
```  
in some file do this:   
export const main_Reducer: ActionReducerMap<AppState> = {
  counterState: counter_Reducer,
  userState: performLogin_Reducer,
  usersState: users_Reducer
};

and in app.module.ts:  
StoreModule.forRoot(main_Reducer)

```    
You will not need feature for users.   

For **redux dev tools** chrome extension, import these lines in app.module.ts:  
```  
StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,// Retains last 25 states
      features: {
        pause: true, // start/pause recording of dispatched actions
        lock: true, // lock/unlock dispatching actions and side effects    
        jump: true, // jump back and forth (time travelling)
        skip: true, // skip (cancel) actions
        reorder: true, // drag and drop actions in the history list 
        dispatch: true, // dispatch custom actions or action creators
        test: true // generate tests for the selected actions
      },
    }),
```   
>  ***IF WE PUT THIS BEFORE STORE MODULE REGISTRATIONS, THEN DEV TOOLS REDUX WILL NOT WORK!!!***   
-----------------------------
### How to dispatch actions and call selectors in the component?
The logic in **app.component.ts** contains code that:  
- triggers action 
```
this.store.dispatch(increment_Action());
this.store.dispatch(loadAllUsers_Action());
...
this.store.dispatch(loginUser_Action({ username: un, password: pw }));
...
this.store.dispatch(deleteUserById_Action(user.id));
```
- **selectors**  
  a) async pipe in HTML on the subject  
```
this.count$ = this.store.select(getCount_Selector); // this is subject, we can use it in HTML such as
// HTML file
  <b>{{ count$ | async }}</b>  
 <b>{{ (count$ | async)?.someProperty }}</b>
```  
Using **async pipe** on observable<Object> in HTML and **bind it to a local variable in HTML**  
  
```
<div *ngIf="user$ | async; let user">
  <h3> {{user.name}} </h3>
</div>
```  

```
<div *ngIf="(user$ | async) || {}; let user">
  <h3> {{user?.name}} </h3>
</div>
```
If you contain *ngIf with more statements, you can omit that statement with ng-container, get a variable, and then use it below where needed (for more readability):  
```
 <ng-container *ngIf="employeesPendingCounter$ | async;let counter;">
   <span *ngIf="selectedSubjectType === subjectTypeEnum.Employee && counter != 0" fcSuffix class="badge">
     {{counter}}
   </span>
 </ng-container>

// or this works the same (less readable)
 <span *ngIf="selectedSubjectType === subjectTypeEnum.Employee && employeesPendingCounter$ | async;let counter; " fcSuffix class="badge">
   {{counter}}
 </span>
```  
b) using **subscribe** (with(out) pipe)  
```
// ts file
this.store.select(getAllUsers_Selector).subscribe((x) => console.log(x)); // this is subscription object, with real value
this.store.pipe(select(getCount_Selector)).subscribe((x) => console.log(x)); // same as previous, but a bit longer
```


*If we call selector -> value is read from state, read-only  
If we call action -> value is getting through reducer, depending on the reducer logic, it's a possible change of value in the state*

-----------------------------
### Effects
For the **effects**, we're getting the data from the online fake api:   
```   
getUsers() {
    // online json fake api 
    return this.http.get(`https://jsonplaceholder.typicode.com/users`);
  }
```     
make sure you added in app.module in imports:  
```   
EffectsModule.forRoot([UsersEffects]),
```  
Effect file:   

 
```   
 @Effect()
  loadUsers$ = this.actions$
    .pipe(
      ofType(loadAllUsers_Action),
      mergeMap(() => this.apiService.getUsers()
        .pipe(
          map((allUsers): any => loadAllUsersSuccess_Action({ users: allUsers }),
            catchError(error => EMPTY)),
          // we could also create action for failure response
            )
        ));
```
#### Effect without dispatching action
We need to use  **{ dispatch: false }** 
```
completeSignupSuccess$ = createEffect(
  () => {
    return this.actions$.pipe(
      ofType(completeSignupSuccess),
      tap(() => {
        localStorage.removeItem('account');
        localStorage.removeItem('emailToken');
        this.router.navigate(['/account/login']);
      })
    );
  },
  { dispatch: false }
);
```
#### Accessing action param in the effect
If your action looks like this (notice that parameter is called mediParam)
```
    export const getAvatars = createAction('[Dashboard API] Get Avatars',
      props<{mediParam: any;}>()
    );
```  
Then in effect, you will access it like this:  
```
 action.mediParam
```
Ngrx effect:  
```
getAvatars1$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.getAvatars),
      concatLatestFrom(() => [this.store.select(selectState)]),
      switchMap(([action, state]) => {
        let param = action.mediParam;
        return this.bgcService.getAvatars(param).pipe(
          map((data: any) => {
            let avatars = JSON.parse(JSON.stringify(data.body));
            return actions.getAvatarsSuccess({ data: avatars});
          })
        );
      }))
  });
```
#### Returning multiple actions from effect
The effect should **NOT** return multiple actions.  (https://github.com/timdeschryver/eslint-plugin-ngrx/blob/main/docs/rules/no-multiple-actions-in-effects.md)
#### Call action from effect or reducer?
You should not do that, it's an **antipattern.**   
- no-dispatch-in-effects - Effect should not call store.dispatch. (https://github.com/timdeschryver/eslint-plugin-ngrx/blob/main/docs/rules/no-dispatch-in-effects.md)
   
If you dispatch some action from effect before you return ```success action```, then the state will not be yet updated, so if you try to gather state info, it will not have the latest data in it. The same for reducers, reducers should not have side effects.

So what you should do instead?  
You will make an effect, that will be listening to success action.    
Once the effect is done, it will trigger a success action, and then we listen for that action.  
> Take a look on **getDashboardWithEmployeesSuccess**, once the effect **getDashboardWithEmployees$** is done, it triggers success action **getDashboardWithEmployeesSuccess**, and then 
we created effect **getAvatars$**, and listen for that action.  
```
 getDashboardWithEmployees$ = createEffect(() => {
   return this.actions$.pipe(
     ofType(actions.getDashboardWithEmployees),
     concatLatestFrom(() => [this.store.select(selectState)]),
     switchMap(([action, state]) => {
       return this.bgcService.getBackgroundCheckDashboard(SubjectTypeEnum.Employee).pipe(
         map((data: any) => {
           let dashboardData = JSON.parse(JSON.stringify(data.body));
           this.addInitialsAndAvatarColors(dashboardData);
           this.getColorForUserAvatar(dashboardData);
           return actions.getDashboardWithEmployeesSuccess({ data: dashboardData });
         })
       );
     })
   );
 });

  getAvatars$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.getDashboardWithEmployeesSuccess),
      concatLatestFrom(() => [this.store.select(selectState)]),
      switchMap(([action, state]) => {
        let employeeIds: number[] = state.dashboardEmployees.map((bgc) => {
          if (!!bgc.EmployeeID)
            return bgc.EmployeeID
        })
        console.log(employeeIds)
       return this.bgcService.getAvatars(employeeIds).pipe(
          map((data: any) => {
            let dataParsed = JSON.parse(JSON.stringify(data.body));
            let dashboardData = JSON.parse(JSON.stringify(state.dashboardEmployees)); // this.store.select(selectDashboardEmployees);
            dataParsed.forEach(employee => {
              debugger
              let existingUserIndex = dashboardData.findIndex(user => user.EmployeeID == employee.EmployeeID);
              if (existingUserIndex != -1) {
                dashboardData[existingUserIndex].Base64Avatar = 'data:image/png;base64, '+employee.Avatar;
              }
            })
            return actions.getAvatarsSuccess({ data: dashboardData });
          })
        );
      })
    );
  });
```

### How to make sure we trigger some code, when action is done?
If we have some **guard.ts**, and we want to check some value in the state (sapphireStatus), but probably **action is in progress**, and *we cannot know when it's done*.  
So in that case, we're setting sapphireStatus to some **initial value that cannot be returned by API**, in my case I set it as *null*. And then used the filter operator to filter all results if they are null.  


**filter((sapphireStatus) => sapphireStatus != null)**
```
canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  this.store.dispatch(getSapphireServices());
  let path = route.url[0].path;
  return this.store.select(selectSaphireStatus).pipe(
    filter((sapphireStatus) => sapphireStatus != null), //This is part where we're filtering/ignoring the initial value
    map((sapphireStatus) => {
      switch (path) {
        case 'dashboard':
          if (sapphireStatus == SapphireStatusEnum.Active) return true;
          return false;
      }
    })
  );
}
```



