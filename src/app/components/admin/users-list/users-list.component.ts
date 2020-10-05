import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { UserProfile } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit,OnDestroy {

  users:Array<UserProfile>;
  selectedUid:number;

  private usersListSubscription:Subscription;

  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.usersListSubscription = this.adminService.getUsers().subscribe((users) => {
      this.users = users;
    })
  }

  ngOnDestroy():void{
    this.usersListSubscription.unsubscribe();
  }

  selectUser(uid:number){
    this.selectedUid = uid;
  }

  unselectUser(){
    this.selectedUid = null;
  }

}
