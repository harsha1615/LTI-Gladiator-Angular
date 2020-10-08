import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService, UserLogin } from '../../../services/auth.service';
import { PopupComponent } from '../popup/popup.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: UserLogin;
  formSubmitted: boolean;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private adminService: AdminService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
    this.formSubmitted = false;
    this.spinner.hide();
  }

  createLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  loginCheck() {
    if (this.loginForm.valid) {
      this.user = {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value,
      };
      if (!this.formSubmitted) {
        this.formSubmitted = true;
        this.spinner.show();
        if (this.user.email == 'admin') {
          this.adminService.login(this.user).subscribe((res) => {
            if (res.success) {
              this.adminService.doLogin(res);
              this.router.navigate(['admin', 'dashboard']);
            } else {
              this.errorLogin(res);
            }
          });
        } else {
          this.authService.login(this.user).subscribe((res) => {
            if (res.success) {
              this.authService.doLogin(res);
              this.router.navigate(['user', 'dashboard']);
            } else {
              this.errorLogin(res);
            }
          });
        }
      }
    }
  }

  errorLogin(data) {
    this.spinner.hide();
    console.log(data.message);
    this.dialog.open(PopupComponent, {
      width: '350px',
      data: {
        msg: data.message,
      },
    });
    this.formSubmitted = false;
  }
}
