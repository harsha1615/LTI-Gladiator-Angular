import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserLogin, AuthStatus } from './auth.service';
import { UserProfile } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  isAdminLoggedIn$: Observable<boolean>;
  private _isAdminLoggedIn: BehaviorSubject<boolean>;

  private _adminId: number;

  private _adminProfile$: Observable<AdminProfile>;
  private _adminProfile: BehaviorSubject<AdminProfile>;

  private _usersList$: Observable<Array<UserProfile>>;
  private _usersList: BehaviorSubject<Array<UserProfile>>;

  constructor(private router: Router, private http: HttpClient) {
    this._isAdminLoggedIn = new BehaviorSubject<boolean>(false);
    this.isAdminLoggedIn$ = this._isAdminLoggedIn.asObservable();
    this._adminProfile = new BehaviorSubject<AdminProfile>(null);
    this._adminProfile$ = this._adminProfile.asObservable();
    this._usersList = new BehaviorSubject<Array<UserProfile>>([]);
    this._usersList$ = this._usersList.asObservable();
    this.isAdminLoggedIn$.subscribe((loggedin) => {
      if (loggedin) {
        this.fetchProfile();
        this.fetchUsers();
      } else {
        this.removeProfile();
        this.removeUsers();
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

  private removeProfile() {
    this._adminProfile.next(null);
  }

  getUsers(): Observable<Array<UserProfile>> {
    return this._usersList$;
  }

  getUser(id: number): Observable<UserProfile> {
    return new Observable<UserProfile>((observer) => {
      this._usersList$.subscribe((users) => {
        let user = users.find((user) => user.id == id);
        observer.next(user);
      });
    });
  }

  fetchUsers() {
    let url = 'http://localhost:8080/admin/users';
    this.http.get<Array<UserProfile>>(url).subscribe((data) => {
      if (data) {
        this._usersList.next(data);
      }
    });
  }

  private removeUsers() {
    this._usersList.next([]);
  }

  activateUserCard(uid: number) {
    let url = 'http://localhost:8080/admin/users/activate-usercard';
    let data = { uid: uid, activateCard: true };
    this.http.post<UserProfile>(url, data).subscribe((res) => {
      if (res.id) {
        let users = this._usersList.value;
        users.forEach((user, i) => {
          if (user.id == res.id) {
            users[i] = res;
            return;
          }
        });
        this._usersList.next(users);
      }
    });
  }

  saveProduct(product:AdminProduct):Observable<any>{
    let url = "http://localhost:8080/admin/products";
    return this.http.post(url, product);
  }

  getProduct(pid:number):Observable<AdminProduct>{
    let url = "http://localhost:8080/admin/products?pid="+pid;
    return this.http.get<AdminProduct>(url);
  }

}

export interface AdminProfile {
  id: number;
  name: string;
  username: string;
}

export interface AdminProduct {
  id:number;
  name:string;
  image:string;
  description:string;
  originalPrice:number;
  profitPercent:number;
  cost:number;
}
