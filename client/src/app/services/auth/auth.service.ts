import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const API = 'http://127.0.0.1:3000/';
const LOGIN_PATH = 'login';
const REGISTER_PATH = 'register';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(credentials: { email: string; password: string; }): Observable<any> {
    return this.http.post(API + LOGIN_PATH, credentials, httpOptions);
  }

  register(credentials: { name: string; email: string; password: string; }): Observable<any> {
    return this.http.post(API + REGISTER_PATH, credentials, httpOptions);
  }
}
