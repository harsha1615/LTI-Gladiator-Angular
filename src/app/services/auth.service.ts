import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn$: Observable<boolean>;
  private _isLoggedIn: BehaviorSubject<boolean>;

  private _userId: number;

  constructor(private http: HttpClient) {
    this._isLoggedIn = new BehaviorSubject<boolean>(false);
    this.isLoggedIn$ = this._isLoggedIn.asObservable();
  }

  register(user: UserSignup): Observable<AuthStatus> {
    let url = 'http://localhost:8080/register';
    return this.http.post<AuthStatus>(url, user);
  }

  login(login: UserLogin): Observable<AuthStatus> {
    let url = 'http://localhost:8080/login';
    return this.http.post<AuthStatus>(url, login);
  }

  doLogin(status: AuthStatus) {
    if (status.success) {
      this._userId = +status.message;
      this._isLoggedIn.next(status.success);
    }
  }

  doLogout() {
    this._isLoggedIn.next(false);
    this._userId = null;
  }

  getUserId(): number {
    return this._userId;
  }
}

export interface UserSignup {
  name: string;
  username: string;
  phoneNo: string;
  address: string;
  email: string;
  password: string;
  emiCard: {
    cardType: string;
  };
  bank: {
    name: string;
    ifsc: string;
    accountNo: string;
  };
}

export interface UserLogin {
  email: String;
  password: String;
}

export interface AuthStatus {
  success: boolean;
  message: string;
}
