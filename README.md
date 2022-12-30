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

The main state is the AppState. 
```
export interface AppState {
  counterState: CounterState;
  userState: UserState;
  usersState: UsersState;
}
```  
The classic way for selectors is:  
```
export const getCount_Selector = createSelector(
  (state: AppState) => state.counterState,
  (state: CounterState) => state.counter
);
```  
The feature way for selectors is:  
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
Classic action, with no params: 
```  
export const increment_Action = createAction('[Counter] increment');
```   
Action, with params: 
```  
export const loginUser_Action = createAction('[User] saveUser', props<{
  username: string;
  password: string;
}>()
);
```  
Check also different types of reducers, also without or with params.  
In app.module.ts:   
```  
StoreModule.forRoot({
      userState: performLogin_Reducer,
      counterState: counter_Reducer,
    }),
StoreModule.forFeature(usersFeatureKey, users_Reducer),
EffectsModule.forRoot([UsersEffects]),
```  








Gif of the test app and functionlities:  
![ngrx gif medi](https://user-images.githubusercontent.com/37112852/210093937-70d5cf15-a55b-4614-a6a8-bd14c1ddea4c.gif)

