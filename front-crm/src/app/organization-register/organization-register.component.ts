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

  code: any;
  generateCode() {
    let randomString = function(lenght) {
      let text = "";
      let possible = "0123456789"

      for(let i = 0; i < lenght; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }

    this.code = randomString(8);
    console.log(this.code);
  }

  exit() {
    this.router.navigate([`/company/`]);
  }

  goToRamo() {
    window.open('/ramo');
  }

  goToERP() {
    window.open('/erp');
  }

}
