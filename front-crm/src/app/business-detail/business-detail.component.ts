import { Component, OnInit } from "@angular/core";
import { CrudService } from "../services/crud.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-business-detail",
  templateUrl: "./business-detail.component.html",
  styleUrls: ["./business-detail.component.css"]
})
export class BusinessDetailComponent implements OnInit {
  id: any;
  business: any;

  constructor(
    private route: ActivatedRoute,
    private crudService: CrudService
  ) {}

  loadBusiness() {
    const id = this.route.snapshot.paramMap.get("id");
    this.getterTicket(id);
  }

  getterTicket(id) {
    this.crudService.getTicket(id).subscribe(
      data => {
        this.business = data;
        console.log("id", data);
      },
      error => {
        console.error(error);
      }
    );
  }

  ngOnInit() {
    this.loadBusiness();
  }
}