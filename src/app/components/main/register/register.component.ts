import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService, UserSignup } from '../../../services/auth.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: UserSignup;
  registerForm: FormGroup;
  formSubmitted: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
    this.formSubmitted = false;
    this.spinner.hide();
  }

  createRegisterForm(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', [Validators.required]],
      phone: [
        '',
        [Validators.required, Validators.pattern('[1-9]{1}[0-9]{9}')],
      ],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      cardType: ['', Validators.required],
      bankName: ['', Validators.required],
      accountNo: ['', Validators.required],
      confirmAccountNo: ['', Validators.required],
      ifsc: ['', Validators.required],
    });
  }

  register() {
    console.log(this.registerForm);
    if (this.registerForm.valid) {
      this.user = {
        name: this.registerForm.get('name').value,
        username: this.registerForm.get('username').value,
        phone: this.registerForm.get('phone').value,
        address: this.registerForm.get('address').value,
        email: this.registerForm.get('email').value,
        password: this.registerForm.get('password').value,
        emiCard: { cardType: this.registerForm.get('cardType').value },
        bank: {
          name: this.registerForm.get('bankName').value,
          ifsc: this.registerForm.get('ifsc').value,
          accountNo: this.registerForm.get('accountNo').value,
        },
      };
      if (!this.formSubmitted) {
        this.formSubmitted = true;
        this.spinner.show();
        this.authService.register(this.user).subscribe((res) => {
          if (res.success) {
            this.spinner.hide();
            console.log(res.message);
            this.dialog.open(PopupComponent, {
              width: '350px',
              data: {
                msg: res.message,
              },
            });
            this.router.navigate(['login']);
          } else {
            this.spinner.hide();
            console.log(res.message);
            this.dialog.open(PopupComponent, {
              width: '350px',
              data: {
                msg: res.message,
              },
            });
            this.formSubmitted = false;
          }
        });
      }
    }
  }
}
