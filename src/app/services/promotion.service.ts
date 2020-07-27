import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private httpService: HttpService) { }

  get(payload: any): Observable<any> {
    return this.httpService.get(payload.url, payload.token);
  }

}
