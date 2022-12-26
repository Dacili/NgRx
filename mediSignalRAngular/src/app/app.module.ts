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
    StoreModule.forRoot({}), // this has to be set up as default
    //StoreModule.forFeature('Medi', reducers),
    StoreModule.forFeature(mediFeatureKey, counterReducer),
    StoreModule.forFeature(userFeatureKey, performLoginReducer),
    //StoreModule.forRoot({ count: counterReducer })
    //, StoreModule.forRoot(reducers, {
    //  metaReducers
    //})

  ],
  providers: [SignalRService],
  bootstrap: [AppComponent]
})
export class AppModule { }
