import { Component, OnInit } from "@angular/core";
import { CrudService } from "../services/crud.service";

@Component({
  selector: "app-organization",
  templateUrl: "./organization.component.html",
  styleUrls: ["./organization.component.css"]
})
export class OrganizationComponent implements OnInit {
  orgapi: any;
  erroOrg: any;

  constructor(private crudService: CrudService) {
    this.getterOrg();
  }

  getterOrg() {
    this.crudService.getOrgs().subscribe(
      data => {
        this.orgapi = data;
        console.log(data);
      },
      error => {
        this.erroOrg = error;
        console.error(error);
      }
    );
  }

  ngOnInit() {}
}
