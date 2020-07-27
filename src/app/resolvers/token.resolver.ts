import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class TokenResolver {
    constructor(private authService: AuthService) { }

    resolve() {
        return this.authService.getToken();
    }
}