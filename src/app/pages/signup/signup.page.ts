import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants } from '../../auth.constants';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import { ToastService } from './../../services/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit {
  payload = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit() { }

  validate() {    
    let username = this.payload.name.trim();
    let password = this.payload.password.trim();
    let email = this.payload.email.trim();
    return (
      this.payload.name &&
      this.payload.password &&
      this.payload.email &&
      username.length > 0 &&
      email.length > 0 &&
      password.length > 0
    );
  }

  signUp() {
    if (this.validate()) {
      this.authService.signup(this.payload).subscribe(
        (res: any) => {
          if (res.message) {            
            this.toastService.presentToast(res.message);
          }  
          this.router.navigate(['promotions']);          
        },
        (error: any) => {
          let message;
          // This is ugly, I know :( 
          if (error.error.errors && error.error.errors.email && error.error.errors.email[0]) {
            message = error.error.errors.email[0];
          } else if (error.error.message) {
            message = error.error.message;
          } else {
            message = 'Oops! Network Issue';
          }  
          this.toastService.presentToast(message);
        }
      );
    } else {
      let message = 'Please enter name and/or email and/or password'
      this.toastService.presentToast(message);
    }
  }
}