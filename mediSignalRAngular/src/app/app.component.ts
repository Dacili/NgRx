import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { decrement, increment, reset } from '../actions/counter.actions';
import { loginUser } from '../actions/user.actions';
import { AppState, CounterState, selectCount, selectUsername } from '../reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  count$: Observable<any>;
  loginForm = new FormGroup({
    username: new FormControl(''),
    pw: new FormControl('')
  });
  

  ngOnInit(): void {
  }

  constructor(private store: Store<AppState>) {
    this.count$ = this.store.pipe(select(selectCount));
    this.store.pipe(select(selectCount)).subscribe(x => console.log(x));
    this.store.pipe(select(selectUsername)).subscribe(x => console.log(x));
    //  this.store.select(state => state.counterState.counter)
    //this.store.select(x => x.userState.username).subscribe(x => console.log(x));
    console.log(this.store)
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }

  login() {
    if (this.loginForm) { 
      let un = this.loginForm.get('username')!.value;
      // this ! sign, is so it's not bothering with possible null value error
      let pw = this.loginForm.get('pw')!.value;
      // dispatching action with params/metadata
      this.store.dispatch(loginUser({ username: un, password: pw }));
    }
  }
}
