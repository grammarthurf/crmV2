import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { CrudService } from "../services/crud.service";

export interface PeriodicElement {
  nome;
  org;
  tel;
  email;
  neg_f;
  neg_a: String;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    nome: "Arthur Felipe",
    org: "Vedois Tecnologia",
    tel: "47 988309090",
    email: "arthurfelipe@vedois.com",
    neg_f: "3",
    neg_a: "2"
  },
  {
    nome: "Arthur Felipe",
    org: "Vedois Tecnologia",
    tel: "47 988309090",
    email: "arthurfelipe@vedois.com",
    neg_f: "3",
    neg_a: "2"
  },
  {
    nome: "Arthur Felipe",
    org: "Vedois Tecnologia",
    tel: "47 988309090",
    email: "arthurfelipe@vedois.com",
    neg_f: "3",
    neg_a: "2"
  },
  {
    nome: "Arthur Felipe",
    org: "Vedois Tecnologia",
    tel: "47 988309090",
    email: "arthurfelipe@vedois.com",
    neg_f: "3",
    neg_a: "2"
  },
  {
    nome: "Arthur Felipe",
    org: "Vedois Tecnologia",
    tel: "47 988309090",
    email: "arthurfelipe@vedois.com",
    neg_f: "3",
    neg_a: "2"
  },
  {
    nome: "Arthur Felipe",
    org: "Vedois Tecnologia",
    tel: "47 988309090",
    email: "arthurfelipe@vedois.com",
    neg_f: "2",
    neg_a: "1"
  }
];

@Component({
  selector: "app-person",
  templateUrl: "./person.component.html",
  styleUrls: ["./person.component.css"]
})
export class PersonComponent implements OnInit {
  displayedColumns: string[] = [
    "nome",
    "org",
    "tel",
    "email",
    "neg_f",
    "neg_a"
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }
}
