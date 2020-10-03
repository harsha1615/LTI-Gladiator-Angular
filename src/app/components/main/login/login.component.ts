import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService, UserLogin } from '../../../services/auth.service';
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
    this.formSubmitted = false;
  }

  createLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  loginCheck() {
    console.log(this.loginForm);
    if (this.loginForm.valid) {
      this.user = {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value,
      };
      if(!this.formSubmitted){
        this.formSubmitted = true;
        if(this.user.email == "admin"){
          this.adminService.login(this.user).subscribe((res) => {
            if (res.success) {
              this.adminService.doLogin(res);
              this.router.navigate(['admin','dashboard']);
            } else {
              console.log(res.message);
              alert(res.message);
              this.formSubmitted = false;
            }
          });
        }else{
          this.authService.login(this.user).subscribe((res) => {
            if (res.success) {
              this.authService.doLogin(res);
              this.router.navigate(['user','dashboard']);
            } else {
              console.log(res.message);
              alert(res.message);
              this.formSubmitted = false;
            }
          });
        }
      }
    }
  }

}
