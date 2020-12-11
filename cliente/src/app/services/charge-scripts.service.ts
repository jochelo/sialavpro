import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChargeScriptsService {

  constructor() { }
  
  charge(javaScripts: string[]): void {
    for (let javaScript of javaScripts) {
      const script = document.createElement('script');
      script.src = `./assets/${javaScript}`;
      const body = document.getElementsByTagName('body')[0];
      body.appendChild(script);
    }
  }
}
