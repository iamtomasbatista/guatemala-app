import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import { AuthConstants } from '../../auth.constants';
import { ToastService } from './../../services/toast.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  payload = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private toastService: ToastService
  ) { }

  ngOnInit() { }

  validate() {
    let username = this.payload.email.trim();
    let password = this.payload.password.trim();
    return (
      this.payload.email &&
      this.payload.password &&
      username.length > 0 &&
      password.length > 0
    );
  }

  login() {
    if (this.validate()) {
      this.authService.login(this.payload).subscribe(
        (res: any) => {
          if (res.access_token) {            
            this.storageService.store(AuthConstants.AUTH, res.access_token);
            this.router.navigate(['/promotions']);
          }
        },
        (error: any) => {
          let message = error.error.message || 'Oops! Network Issue';
          this.toastService.presentToast(message);
        }
      );
    } else {
      let message = 'Please enter email and/or password'
      this.toastService.presentToast(message);
    }
  }
}