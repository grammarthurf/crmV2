import { Component, OnInit } from "@angular/core";
import { CrudService } from "../services/crud.service";
import { Router } from "@angular/router";
import swal from 'sweetalert';

@Component({
  selector: "app-business",
  templateUrl: "./business.component.html",
  styleUrls: ["./business.component.css"]
})
export class BusinessComponent implements OnInit {
  // Lista de estagios:
  estagiosapi: any;
  erroEstagio: any;

  // Lista de atividades:
  atividadesapi: any;
  erroAtividade: any;

  // Lista de tickets:
  ticketsapi: any;
  erroTicket: any;

  ticket = { titulo: "", estagio: "", valorestimado: "" };

  constructor(private crudService: CrudService, private router: Router) {
    this.getterEstagios();
    this.getterTickets();
    this.getterAtividades();
  }

  splitTickets() {
    this.estagiosapi.forEach(e => {});
  }

  getterAtividades() {
    this.crudService.getAtividade().subscribe(
      data => {
        this.atividadesapi = data;
        console.log(data);
      },
      error => {
        this.erroAtividade = error;
      }
    );
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

  save() {
    this.crudService.saveNewTicket(this.ticket).subscribe(
      data => {
        swal({
          icon: "success",
          text: "Produto salvo com sucesso!",
          timer: 1800,
          buttons: { 
            buttons: false
          }
        });
        console.log(data);
      },
      error => {
        console.error(error);
      }
    );
  }

  goTo(id) {
    this.router.navigate([`/business-detail/${id}`]);
  }

  ngOnInit() {}
}
