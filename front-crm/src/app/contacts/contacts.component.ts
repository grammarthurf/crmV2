import { Component, OnInit } from "@angular/core";
import { CrudService } from "../services/crud.service";

@Component({
  selector: "app-contacts",
  templateUrl: "./contacts.component.html",
  styleUrls: ["./contacts.component.css"]
})
export class ContactsComponent implements OnInit {
  // Lista de contatos:
  contatosapi: any;

  erroContatos: any;

  constructor(private crudService: CrudService) {
    this.getterContatos();
  }

  getterContatos() {
    this.crudService.getClientes().subscribe(
      data => {
        this.contatosapi = data;
        console.log(data);
      },
      error => {
        this.erroContatos = error;
        console.error(error);
      }
    );
  }

  ngOnInit() {}
}
