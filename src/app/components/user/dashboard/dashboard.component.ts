import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserProfile, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  userProfile:UserProfile;
  private userProfileSubscription : Subscription;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userProfileSubscription = this.userService.getProfile().subscribe( (data) => {
      this.userProfile = data;
    });
  }

  payForCard(){
    this.userService.payForCard();
  }

  ngOnDestroy(): void {
    this.userProfileSubscription.unsubscribe();
  }

}
