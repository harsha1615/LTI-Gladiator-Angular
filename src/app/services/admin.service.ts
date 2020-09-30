import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  isAdmin$: Observable<boolean>;
  private _isAdmin: BehaviorSubject<boolean>;

  constructor(private router:Router, private http: HttpClient) {
    this._isAdmin = new BehaviorSubject<boolean>(true);
    this.isAdmin$ = this._isAdmin.asObservable();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    var loggedin:boolean = this._isAdmin.getValue();
    if(loggedin){
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
  
}
