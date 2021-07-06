import { Component, OnInit } from '@angular/core';
import {faWhatsapp} from '@fortawesome/free-brands-svg-icons';
import {faLaughWink, faSmileBeam} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.component.html',
  styles: [
  ]
})
export class WhatsappComponent implements OnInit {

  faWhatsapp = faWhatsapp;
  faSmileBeam = faSmileBeam;
  faLaughWink = faLaughWink;

  constructor() { }

  ngOnInit(): void {
  }

}
