import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

    @ViewChild('cuenta', {static: false} ) cuenta: ElementRef;
    @ViewChild('password', {static: false} ) password: ElementRef;

    userImage = 'assets/images/user.png';
    message = '';
    loading: any;
    error: any = null;

    loginGroup: FormGroup;

    constructor(private fb: FormBuilder,
                private loadingController: LoadingController,
                private router: Router,
                private authService: AuthService) {
    }

    async mensajeLoading() {
        this.loading = await this.loadingController.create({
            cssClass: 'my-custom-class',
            duration: 600,
            message: 'Ingresando...'
        });
        await this.loading.present();
    }

    ngOnInit() {

        this.loginGroup = this.fb.group({
            cuenta: new FormControl(null, [Validators.required]),
            password: new FormControl(null, [Validators.required])
        });
    }

    onLogin() {
        this.error = null;
        this.mensajeLoading();
        this.authService.login(this.loginGroup.value).subscribe( (success: any) => {
            this.loginGroup.patchValue({
                cuenta: null,
                password: null
            });
            this.router.navigate(['/admin']);
        }, (err) => {
            console.log(err);
            this.error = 'Credenciales Incorrectas';
        });
    }
}
