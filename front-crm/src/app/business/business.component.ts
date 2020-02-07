import { Component, OnInit } from "@angular/core";
import { CrudService } from "../services/crud.service";
import { Router } from '@angular/router';

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

  constructor(private crudService: CrudService, private router: Router) {
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

  table = [
    {
      title: "Prospecções",
      value: "0 - 1 ativ"
    },
    {
      title: "Contatado",
      value: "0 - 2 ativ"
    },
    {
      title: "Cliente Potencial",
      value: "0 - 1 ativ"
    },
    {
      title: "Demo Agendada",
      value: "0 - 1 ativ"
    },
    {
      title: "Proposta",
      value: "0 - 1 ativ"
    },
    {
      title: "Negoc. Iniciadas",
      value: "0 - 1 ativ"
    },
    {
      title: "Cliente",
      value: "0 - 1 ativ"
    }
  ];

  cards = [
    {
      title: "Sull OEE",
      subtitle: "Sull Automação e Tecnologia",
      value: "10.000"
    },
    {
      title: "Sull OEE",
      subtitle: "Sull Automação e Tecnologia",
      value: "10.000"
    },
    {
      title: "Sull OEE",
      subtitle: "Sull Automação e Tecnologia",
      value: "10.000"
    },
    {
      title: "Sull OEE",
      subtitle: "Sull Automação e Tecnologia",
      value: "10.000"
    },
    {
      title: "Sull OEE",
      subtitle: "Sull Automação e Tecnologia",
      value: "10.000"
    },
    {
      title: "Sull OEE",
      subtitle: "Sull Automação e Tecnologia",
      value: "10.000"
    },
    {
      title: "Sull OEE",
      subtitle: "Sull Automação e Tecnologia",
      value: "10.000"
    }
  ];

  goTo() {
    this.router.navigate(['/business-detail']);
  }

  ngOnInit() {}
}
