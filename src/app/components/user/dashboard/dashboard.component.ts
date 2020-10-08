import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserProfile, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  user: UserProfile;

  private userProfileSubscription: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userProfileSubscription = this.userService
      .getProfile()
      .subscribe((user) => {
        if (user) {
          this.user = user;
        }
      });
  }

  ngOnDestroy(): void {
    this.userProfileSubscription.unsubscribe();
  }
}
