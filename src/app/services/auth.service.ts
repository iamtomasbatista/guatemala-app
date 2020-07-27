import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { AuthConstants } from '../auth.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token$ = new BehaviorSubject<any>([]);

  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router
  ) { }

  getToken() {
    this.storageService.get(AuthConstants.AUTH).then(res => {
      this.token$.next(res);
    });
  }

  login(payload: any): Observable<any> {
    return this.httpService.post('login', payload);
  }

  signup(payload: any): Observable<any> {
    return this.httpService.post('signup', payload);
  }

  logout() {
    this.storageService.removeStorageItem(AuthConstants.AUTH).then(res => {
      this.token$.next('');
      this.router.navigate(['/login']);
    });
  }
}