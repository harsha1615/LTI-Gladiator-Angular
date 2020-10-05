import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { UserProfile } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  userProfile:UserProfile;
  private userProfileSubscription : Subscription;

  constructor(private adminService:AdminService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    let uid = +this.route.snapshot.params['id']; 
    this.userProfileSubscription = this.adminService.getUser(uid).subscribe( (data) => {
      this.userProfile = data;
    });
  }

  ngOnDestroy(): void {
    this.userProfileSubscription.unsubscribe();
  }

  activateCard(){
    this.adminService.activateUserCard(this.userProfile.id);
  }

}
