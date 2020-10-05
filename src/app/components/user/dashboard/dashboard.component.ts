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
  clickedToPay:boolean;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userProfileSubscription = this.userService.getProfile().subscribe( (user) => {
      if(user){
        this.userProfile = user;
        this.clickedToPay = user.paidForCard
      }
    });
  }

  payForCard(){
    this.userService.payForCard();
    this.clickedToPay = true;
  }

  ngOnDestroy(): void {
    this.userProfileSubscription.unsubscribe();
  }

}
