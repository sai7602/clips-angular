import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: '',
  };
  login() {
    console.log(this.credentials);
  }
  constructor() {}

  ngOnInit(): void {}
}
