import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Login,LoginStatus} from '../components/main/login/login.component';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(login: Login) : Observable<LoginStatus>{
    let url = "http://localhost:8080/login";
    return this.http.post<LoginStatus>(url,login);
  }
}
