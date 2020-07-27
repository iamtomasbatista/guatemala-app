import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  post(serviceName: string, data: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    const options = { headers: headers };
    const url = environment.apiUrl + serviceName;

    return this.http.post(url, JSON.stringify(data), options);
  }

  get(serviceName: string, data: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${data}`);
    const options = { headers: headers };
    const url = environment.apiUrl + serviceName;

    return this.http.get(url, options);
  }
}
