import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminProfile, AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

  adminProfile:AdminProfile;
  private adminProfileSubscription:Subscription;

  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.adminProfileSubscription = this.adminService.getProfile().subscribe((data) => {
      this.adminProfile = data;
    })
  }

  logout(){
    this.adminService.doLogout();
  }

  ngOnDestroy():void {
    this.adminProfileSubscription.unsubscribe();
  }

}
