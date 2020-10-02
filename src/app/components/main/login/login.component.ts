import { Component, OnInit } from '@angular/core';
import {Router}   from '@angular/router';
import {AuthService} from '../../../services/auth.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: Login = new Login();
  data: any;

  constructor(private authService : AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  loginCheck(){
    console.log(this.login);
    this.authService.login(this.login).subscribe(data=>{
      console.log(data);
      if(data.status==true){
        sessionStorage.setItem('customerId',String(data.customerId));
        sessionStorage.setItem('customerName', data.name);
        this.router.navigate(['dashboard']);
      }
      else{
        this.data = data.statusMessage;
      }
    })
  
  }
  }

export class Login{
  email: String;
  password: String;
}

export class LoginStatus{
  status: boolean;
  statusMessage: string;
  customerId: number;
  name: string;
}