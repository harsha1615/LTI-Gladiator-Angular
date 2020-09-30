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
  card: UserEmiCard;
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
  isLoggedin$: Observable<boolean>;
  private _isLoggedIn: BehaviorSubject<boolean>;

  userProfile: UserProfile = {
    id: 1001,
    name: 'Harsha',
    username: 'harsha',
    email: 'harsha@lti.com',
    phone: '9876543210',
    address: 'mahape, mumbai',
    paidForCard: true,
    card: {
      id: 10000,
      cardType: 'GOLD',
      cardNo: '123456781234',
      activated: false,
      validity: '23-10-2020',
      balance: 15000,
      limit: 20000,
    },
  };

  constructor(private router: Router, private http: HttpClient) {
    this._isLoggedIn = new BehaviorSubject<boolean>(true);
    this.isLoggedin$ = this._isLoggedIn.asObservable();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    var loggedin: boolean = this._isLoggedIn.getValue();
    if (loggedin) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

}
