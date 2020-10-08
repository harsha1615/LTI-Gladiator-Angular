import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { UserProfile } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  @Input('uid') uid:number; 
  user:UserProfile;
  private userProfileSubscription : Subscription;

  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.userProfileSubscription = this.adminService.getUser(this.uid).subscribe( (data) => {
      this.user = data;
    });
  }

  ngOnDestroy(): void {
    this.userProfileSubscription.unsubscribe();
  }

  activateCard(){
    this.adminService.activateUserCard(this.user.id);
  }

}
