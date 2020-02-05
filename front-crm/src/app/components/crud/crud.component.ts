import { CrudService } from "src/app/services/crud.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-crud",
  templateUrl: "./crud.component.html",
  styleUrls: ["./crud.component.css"]
})
export class CrudComponent implements OnInit {
  clientes: any;
  erro: any;
  constructor(private crudService: CrudService) {
    this.getterCliente();
  }

  ngOnInit() {}

  getterCliente() {
    this.crudService.getClientes().subscribe(
      data => {
        this.clientes = data;
        console.log("data: ", data);
        console.log("clientes: ", this.clientes);
      },
      error => {
        this.erro = error;
        console.error(error);
      }
    );
  }
}
