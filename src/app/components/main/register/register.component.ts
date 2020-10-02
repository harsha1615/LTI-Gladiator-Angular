import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: User;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', [Validators.required]],

      phoneNo: [
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
      ifsc: ['', Validators.required],
    });
  }
  register() {
    console.log(this.registerForm.value);
    console.log(this.registerForm);
    if (this.registerForm.valid) {
      this.user = {
        name: this.registerForm.get('name').value,
        username: this.registerForm.get('username').value,
        phoneNo: this.registerForm.get('phoneNo').value,
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
    }

    this.userService.register(this.user).subscribe((response) => {
      console.log(response);
    });
  }
}
export interface User {
  name: string;
  username: string;
  phoneNo: string;
  address: string;
  email: string;
  password: string;

  emiCard: {
    cardType: string;
  };

  bank: {
    name: string;
    ifsc: string;
    accountNo: string;
  };
}
