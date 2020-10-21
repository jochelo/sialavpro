import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  faUserCircle = faUserCircle;

  constructor(public route: Router) { }

  ngOnInit(): void {
  }

}
