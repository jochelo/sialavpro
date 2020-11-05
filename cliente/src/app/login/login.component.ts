import { Component, OnInit } from '@angular/core';

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

  userImage = 'assets/images/logo.png';

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    deleteWP();
    contentWayPoint();
    fullHeight();
  }

}
