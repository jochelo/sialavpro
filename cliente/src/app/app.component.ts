import {Component} from '@angular/core';
import {setTheme} from 'ngx-bootstrap/utils';
import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    setTheme('bs4');
  }
}
