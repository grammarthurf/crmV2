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

  goToLead() {
    this.router.navigate(['/business']);
  }

  goToActivity() {
    this.router.navigate(['/activity']);
  }

  goToCompany() {
    this.router.navigate(['/company']);
  }

  goToSeller() {
    this.router.navigate(['/vendedor']);
  }

  goToProducts() {
    this.router.navigate(['/products']);
  }

  goToERP() {
    this.router.navigate(['/erp']);
  }

  goToRamo() {
    this.router.navigate(['/ramo']);
  }

  goToProfile() {
    this.router.navigate(['/user'])
  }

  goToLogin() {
    this.crudservice.logout()
    this.username = '';
    this.router.navigate(['/login']);
    this.changeUsername();
  }

  changeUsername(){
    // while (this.username == '' || this.username == null) {

    //   setTimeout(() => {
    //     this.username = JSON.parse(localStorage.getItem('username'))
    //     console.log(this.username);
    //    }, 20000)


    // }
  }

}
