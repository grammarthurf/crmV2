import { CrudService } from './../services/crud.service';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, Data } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username = JSON.parse(localStorage.getItem('username'));

  constructor(private router: Router, private crudservice: CrudService) {}

  ngOnInit() {
    // console.log(this.username);

  }

}
