import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApisService } from '../services/apis.service';
import {
  decrement_Action,
  increment_Action,
  reset_Action,
} from '../state/actions/counter.actions';
import { loginUser_Action } from '../state/actions/user.actions';
import {
  deleteLastUser_Action,
  deleteUserById_Action,
  loadAllUsers_Action,
} from '../state/actions/users.actions';
import { getCount_Selector } from '../state/selectors/counter.selectors';
import { getUsername_Selector } from '../state/selectors/user.selectors';
import {
  getAllUsers_Selector,
  getSizeOfCompany_Selector,
} from '../state/selectors/users.selectors';
import { AppState, User } from '../state/state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  count$: Observable<any>;
  mediUsers$: Observable<Array<User>>;
  sizeOfCompany$: Observable<any>;
  loginForm = new FormGroup({
    username: new FormControl(''),
    pw: new FormControl(''),
  });

  ngOnInit(): void {}

  constructor(private store: Store<AppState>, private apiService: ApisService) {
    this.store.dispatch(loadAllUsers_Action());
    this.apiService.getUsers().subscribe((x) => {
      console.log('medi response');
      console.log(x);
    });
    this.count$ = this.store.select(getCount_Selector); // this.store.pipe(select(selectCount));
    this.mediUsers$ = this.store.select(getAllUsers_Selector); //.subscribe(x => console.log(x));
    this.sizeOfCompany$ = this.store.select(getSizeOfCompany_Selector); //.subscribe(x => console.log(x));
    this.store.select(getAllUsers_Selector).subscribe((x) => console.log(x));
    console.log(this.mediUsers$);
    this.store.pipe(select(getCount_Selector)).subscribe((x) => console.log(x));
    this.store
      .pipe(select(getUsername_Selector))
      .subscribe((x) => console.log(x));
    //  this.store.select(state => state.counterState.counter)
    //this.store.select(x => x.userState.username).subscribe(x => console.log(x));
    console.log(this.store);
  }

  increment() {
    this.store.dispatch(increment_Action());
  }

  decrement() {
    this.store.dispatch(decrement_Action());
  }

  reset() {
    this.store.dispatch(reset_Action());
  }

  login() {
    if (this.loginForm) {
      let un = this.loginForm.get('username')!.value;
      // this ! sign, is so it's not bothering with possible null value error
      let pw = this.loginForm.get('pw')!.value;
      // dispatching action with params/metadata
      this.store.dispatch(loginUser_Action({ username: un, password: pw }));
    }
  }

  delete(user: any) {
    // if we're not using props in action, then we're not sending param in {} curly brackets
    this.store.dispatch(deleteUserById_Action(user.id));
  }

  deleteLastUser() {
    this.store.dispatch(deleteLastUser_Action());
  }
}
