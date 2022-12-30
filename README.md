# NgRx

**NgRx** (https://ngrx.io/) Store provides reactive state management for Angular apps inspired by Redux. NgRx Store is mainly for managing global state across an entire application.   
Use selectors for getting the immutable properties from the store, 
activate (dispatch) actions to trigger some update on state (reducers).

Note: this code use the base code from this repo https://github.com/Dacili/Nswag-client-generation-with-Swagger, with additions for NgRx  
How to run this solution:
- *apiSignalR* is the backend project (.Net Core 6) - Focus in the code was on the frontend app, so the backend is not needed
- *frontendSignalRAngular* is the frontend project (Angular 13) - run it via cmd, with ng serve

Organization of the files for ngrx:  
![image](https://user-images.githubusercontent.com/37112852/210094362-991226c0-1594-4654-a432-8975c100c82c.png)

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
**Action, with params**: 
```  
export const loginUser_Action = createAction('[User] saveUser', props<{
  username: string;
  password: string;
}>()
);
```  
Check also different types of reducers, also without or with params.   ***Notice that you will need ONLY ONE REDUCER per state!!!***  So in the main AppState, you have 3 nested states, meaning that 3 reducers are enough. But if you had AppState with no nested states, only with properties, like:   
```  
export interface AppState {
  counter: number;
  username: string;
  surname: string; 
  users: [];
}
```    
in that case you will have only 1 reducer.   

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





Gif of the test app and functionlities:  
![ngrx gif medi](https://user-images.githubusercontent.com/37112852/210093937-70d5cf15-a55b-4614-a6a8-bd14c1ddea4c.gif)

