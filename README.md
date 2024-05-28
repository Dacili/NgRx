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
**Note:** Make sure that you have same version of these, as you have the angular app ("@angular/core": "~13.0.0"), so you don't get diff kind of errors.  
  
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

Check also different types of reducers, also without or with params.   ***Notice that you will need ONLY ONE REDUCER per state!!!***  So in the main AppState, you have 3 nested states, meaning that 3 reducers are optimal. But if you had AppState with no nested states, only with properties, like:   
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
***IF WE PUT THIS BEFORE STORE MODULE REGISTRATIONS, THEN DEV TOOLS REDUX WILL NOT WORK!!!***   
For the **effects**, we're getting the data from the online fake api:   
```   
getUsers() {
    // online json fake api 
    return this.http.get(`https://jsonplaceholder.typicode.com/users`);
  }
```     
Effect:   
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
- selectors  
```
this.count$ = this.store.select(getCount_Selector); // this is subject, we can use it in HTML such as  <b>{{ (user$ | async)?.name }}</b>
this.store.select(getAllUsers_Selector).subscribe((x) => console.log(x)); // this is subscription object, with real value
this.store.pipe(select(getCount_Selector)).subscribe((x) => console.log(x)); // same as previous, but a bit longer
```
*If we call selector -> value is read from state, read-only  
If we call action -> value is getting through reducer, depending on the reducer logic, it's a possible change of value in the state*





