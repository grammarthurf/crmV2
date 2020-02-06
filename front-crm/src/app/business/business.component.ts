import { Component, OnInit } from "@angular/core";
import { CrudService } from "../services/crud.service";

@Component({
  selector: "app-business",
  templateUrl: "./business.component.html",
  styleUrls: ["./business.component.css"]
})
export class BusinessComponent implements OnInit {
  estagiosapi: any;
  erroEstagio: any;

  ticketsapi: any;
  erroTicket: any;

  constructor(private crudService: CrudService) {
    this.getterEstagios();
    this.getterTickets();
  }

  getterEstagios() {
    this.crudService.getEstagios().subscribe(
      data => {
        this.estagiosapi = data;
        console.log(data);
      },
      error => {
        this.erroEstagio = error;
        console.error(error);
      }
    );
  }

  getterTickets() {
    this.crudService.getTickets().subscribe(
      data => {
        this.ticketsapi = data;
        console.log(data);
      },
      error => {
        this.erroTicket = error;
        console.error(error);
      }
    );
  }

  ngOnInit() {}
}
