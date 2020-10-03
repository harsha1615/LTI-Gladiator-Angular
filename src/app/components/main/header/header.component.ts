import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isUserLoggedIn:boolean;
  isAdminLoggedIn:boolean;

  constructor(private authService:AuthService, private adminService:AdminService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((data) => {
      this.isUserLoggedIn = data;
    })
    this.adminService.isAdminLoggedIn$.subscribe((data) => {
      this.isAdminLoggedIn = data;
    })
  }

  userLogout(){
    this.authService.doLogout();
  }

  adminLogout(){
    this.adminService.doLogout();
  }

}
