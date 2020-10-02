import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface UserProfile {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  paidForCard: boolean;
  emiCard: UserEmiCard;
}

export interface UserEmiCard {
  id: number;
  cardType: string;
  cardNo: string;
  activated: boolean;
  validity: string;
  balance: number;
  limit: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _userId: number;

  userProfile$: Observable<UserProfile>;
  private _userProfile: BehaviorSubject<UserProfile>;

  constructor(private router: Router, private http: HttpClient) {
    this._userId = 1;

    this._userProfile = new BehaviorSubject<UserProfile>(null);
    this.userProfile$ = this._userProfile.asObservable();

    if(this._userId != null){
      this.fetchProfile();
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (this._userId != null) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

  getProfile(): Observable<UserProfile> {
    return this.userProfile$;
  }

  fetchProfile() {
    let id = this._userId;
    let url = 'http://localhost:8080/user/profile/?id=' + id;
    this.http.get<UserProfile>(url).subscribe((data) => this.setUserProfile(data));
  }

  payForCard() {
    let id = this._userId;
    let url = 'http://localhost:8080/user/pay-for-card';
    let body = { uid: id, pay: true };
    this.http.post<UserProfile>(url, body).subscribe((data) => this.setUserProfile(data));
  }

  private setUserProfile(data:UserProfile) {
    if (data.id) {
      this._userProfile.next(data);
    } else {
      console.log(data);
    }
  }
}
