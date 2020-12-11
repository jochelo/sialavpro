import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import {AuthState} from '../store/reducers/auth.reducer';
import {login} from '../store/actions/auth.actions';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';

declare const deleteWP: any;
declare const contentWayPoint: any;
declare const fullHeight: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  @ViewChild('cuenta', {static: false} ) cuenta: ElementRef;
  @ViewChild('password', {static: false} ) password: ElementRef;

  faSpinner = faSpinner;

  userImage = 'assets/images/user.png';

  loginGroup: FormGroup;

  authState: AuthState;

  constructor(private fb: FormBuilder,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    deleteWP();
    contentWayPoint();
    fullHeight();

    setTimeout( () => {
      this.cuenta.nativeElement.focus();
    }, 200);

    if (localStorage.getItem('token-prodag') !== null) {
      localStorage.removeItem('token-prodag');
    }

    this.store.subscribe( (response: AppState) => {
      this.authState = response.auth;
    });

    this.loginGroup = this.fb.group({
      cuenta: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  onLogin(): void {
    this.store.dispatch(login(this.loginGroup.value));
  }

}
