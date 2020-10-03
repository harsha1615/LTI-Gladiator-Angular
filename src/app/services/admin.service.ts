import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserLogin, AuthStatus } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  isAdminLoggedIn$: Observable<boolean>;
  private _isAdminLoggedIn: BehaviorSubject<boolean>;

  private _adminId: number;

  private _adminProfile$: Observable<AdminProfile>;
  private _adminProfile: BehaviorSubject<AdminProfile>;

  constructor(private router: Router, private http: HttpClient) {
    this._isAdminLoggedIn = new BehaviorSubject<boolean>(false);
    this.isAdminLoggedIn$ = this._isAdminLoggedIn.asObservable();
    this._adminProfile = new BehaviorSubject<AdminProfile>(null);
    this._adminProfile$ = this._adminProfile.asObservable();
    this.isAdminLoggedIn$.subscribe((loggedin) => {
      if (loggedin) {
        this.fetchProfile();
      } else {
        this.removeProfile();
      }
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (this._adminId != null) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

  login(login: UserLogin): Observable<AuthStatus> {
    let url = 'http://localhost:8080/admin/login';
    return this.http.post<AuthStatus>(url, login);
  }

  doLogin(status: AuthStatus) {
    if (status.success) {
      this._adminId = +status.message;
      this._isAdminLoggedIn.next(true);
    }
  }

  doLogout() {
    this._adminId = null;
    this._isAdminLoggedIn.next(false);
  }

  getProfile(): Observable<AdminProfile> {
    return this._adminProfile$;
  }

  fetchProfile() {
    let id = this._adminId;
    let url = 'http://localhost:8080/admin/profile/?id=' + id;
    this.http.get<AdminProfile>(url).subscribe((data) => {
      if (data.id) {
        this._adminProfile.next(data);
      } else {
        console.log(data);
      }
    });
  }

  removeProfile() {
    this._adminProfile.next(null);
  }
}

export interface AdminProfile {
  id: number;
  name: string;
  username: string;
}
