import { Component, OnInit } from '@angular/core';
import { Router, Data } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
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
    this.router.navigate(['/login']);
  }
  
}
