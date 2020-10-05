import { Component, Input, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @Input('profile') userProfile:UserProfile;

  constructor() { }

  ngOnInit(): void {
  }

}
