import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any = { username: '', password: ''}

  constructor() { }

  login(){
    console.log(this.user);

  }

  ngOnInit() {
  }

}
