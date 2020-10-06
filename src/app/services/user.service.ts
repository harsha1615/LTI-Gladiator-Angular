import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { Product } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _userId: number;

  userProfile$: Observable<UserProfile>;
  private _userProfile: BehaviorSubject<UserProfile>;

  userPurchases$: Observable<Array<Purchase>>;
  private _userPurchases: BehaviorSubject<Array<Purchase>>;

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this._userProfile = new BehaviorSubject<UserProfile>(null);
    this.userProfile$ = this._userProfile.asObservable();
    this._userPurchases = new BehaviorSubject<Array<Purchase>>(null);
    this.userPurchases$ = this._userPurchases.asObservable();
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      if (loggedIn) {
        this._userId = this.authService.getUserId();
        this.fetchProfile();
        this.fetchPurchases();
      } else {
        this._userId = null;
        this.removeUserProfile();
      }
    });
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
    this.http
      .get<UserProfile>(url)
      .subscribe((data) => this.setUserProfile(data));
  }

  payForCard() {
    let id = this._userId;
    let url = 'http://localhost:8080/user/pay-for-card';
    let body = { uid: id, pay: true };
    this.http
      .post<UserProfile>(url, body)
      .subscribe((data) => this.setUserProfile(data));
  }

  private setUserProfile(data: UserProfile) {
    if (data.id) {
      this._userProfile.next(data);
    } else {
      console.log(data);
    }
  }

  private removeUserProfile() {
    this._userProfile.next(null);
  }

  getPurchases(): Observable<Array<Purchase>> {
    return this.userPurchases$;
  }

  getPurchase(id: number): Purchase {
    let purchases = this._userPurchases.value;
    return purchases.find((purchase) => purchase.id == id);
  }

  fetchPurchases() {
    let url = 'http://localhost:8080/purchases?uid=' + this._userId;
    this.http.get<Array<Purchase>>(url).subscribe((data) => {
      this._userPurchases.next(data);
    });
  }

  purchaseProduct(pid: number, tenure: number): Observable<any> {
    let url = 'http://localhost:8080/purchases';
    let data: PurchaseProduct = {
      userId: this._userId,
      productId: pid,
      emiTenure: tenure,
    };
    return this.http.post<any>(url, data);
  }

  payEmi() {}
}

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

export interface PurchaseProduct {
  userId: number;
  productId: number;
  emiTenure: number;
}

export interface Purchase {
  id: number;
  dateTime: String;
  product: Product;
  price: number;
  emiTenure: number;
  emiAmount: number;
  emisPaid: number;
  emiPayments: Array<EmiPayment>;
}

export interface EmiPayment {
  emiNo: number;
  emiAmount: number;
  lateFee: number;
  totalAmount: number;
  dateTime: String;
}
