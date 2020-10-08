import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserProfile, UserService } from 'src/app/services/user.service';
import { PopupComponent } from '../../main/popup/popup.component';

@Component({
  selector: 'app-user-emicard',
  templateUrl: './user-emicard.component.html',
  styleUrls: ['./user-emicard.component.css'],
})
export class UserEmicardComponent implements OnInit {
  user: UserProfile;
  paycard: boolean;

  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.spinner.hide();
    this.paycard = false;
    this.userService.getProfile().subscribe((data) => {
      if (data) {
        this.user = data;
      }
    });
  }

  pay() {
    this.paycard = true;
  }

  cancelPay() {
    this.paycard = false;
  }

  confirmPay() {
    this.spinner.show();
    this.userService.payForCard().subscribe((data) => {
      this.spinner.hide();
      if (data.id) {
        this.userService.setUserProfile(data);
        this.dialog.open(PopupComponent, {
          width: '350px',
          data: {
            msg: 'Payment Successful',
          },
        });
      } else {
        this.dialog.open(PopupComponent, {
          width: '350px',
          data: {
            msg: 'Payment Failed',
          },
        });
      }
      this.paycard = false;
    });
  }
}
