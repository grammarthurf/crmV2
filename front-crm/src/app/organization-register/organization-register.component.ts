import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-organization-register',
  templateUrl: './organization-register.component.html',
  styleUrls: ['./organization-register.component.css']
})
export class OrganizationRegisterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  exit() {
    this.router.navigate([`/company/`]);
  }

}
