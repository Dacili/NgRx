import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SignalRService } from '../services/signal-r.service';

import { AppComponent } from './app.component';
import { FeedComponent } from './feed/feed.component';
import { GroupFeedComponent } from './group-feed/group-feed.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers, counterReducer, mediFeatureKey, userFeatureKey, performLoginReducer } from '../reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    GroupFeedComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  /*  StoreDevtoolsModule,*/
  
    StoreModule.forRoot({}), // this has to be set up as default
    //StoreModule.forFeature('Medi', reducers),
    //StoreModule.forFeature(mediFeatureKey, counterReducer),
    //StoreModule.forRoot({ counter: counterReducer }),
    //StoreModule.forFeature(userFeatureKey, performLoginReducer),
    StoreModule.forRoot({
      userState: performLoginReducer,
      // This userState, MUST BE THE SAME NAME, AS WE HAVE SPECIFIED IN THE STATE
      //
      // export interface AppState {
      //  counterState: CounterState;
      //  userState: UserState;
      //}
      // OTHERWISE, WILL GET ERRORS like:
      // core.mjs:6484 ERROR TypeError: Cannot read properties of undefined (reading 'username')
      // at index.ts: 99: 31
      counterState: counterReducer
      // Same for counterState
    }),
    
    // IF WE PUT THIS BEFORE STORE MODULE REGISTRATIONS, THEN
    // DEV TOOLS REDUX WILL NOT WORK!!!
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,// Retains last 25 states
      features: {
        pause: true, // start/pause recording of dispatched actions
        lock: true, // lock/unlock dispatching actions and side effects    
        //persist: true, // persist states on page reloading
        //export: true, // export history of actions in a file
        //import: 'custom', // import history of actions from a file
        jump: true, // jump back and forth (time travelling)
        skip: true, // skip (cancel) actions
        reorder: true, // drag and drop actions in the history list 
        dispatch: true, // dispatch custom actions or action creators
        test: true // generate tests for the selected actions
      },
    }),
    //StoreModule.forRoot({ count: counterReducer })
    //, StoreModule.forRoot(reducers, {
    //  metaReducers
    //})

  ],
  providers: [SignalRService],
  bootstrap: [AppComponent]
})
export class AppModule { }
