import { Component, OnInit } from '@angular/core';
import {faFacebook, faWhatsapp} from '@fortawesome/free-brands-svg-icons';
import {faPhone} from '@fortawesome/free-solid-svg-icons';

declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.scss']
})
export class ContactosComponent implements OnInit {

  lat = -17.985170;
  lng = -67.099693;
  zoom = 18;

  faWhatsapp = faWhatsapp;
  faPhone = faPhone;
  faFacebook = faFacebook;

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    contentWayPoint();
    mobileMenuOutsideClick();
  }

}
