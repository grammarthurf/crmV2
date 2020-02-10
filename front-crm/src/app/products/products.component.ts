import { Component, OnInit, ViewChild } from "@angular/core";
import { CrudService } from "../services/crud.service";
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  nome, cod, cat, un, price: String
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    nome: "Vedois OEE",
    cod: "32412",
    cat: "Indústria",
    un: "1",
    price: "3500"
  },
  {
    nome: "Vedois Planejamento",
    cod: "51235",
    cat: "Planejamento",
    un: "1",
    price: "3500"
  },
  {
    nome: "Vedois Tear",
    cod: "32712",
    cat: "Indústria",
    un: "1",
    price: "3500"
  },
  {
    nome: "Vedois Saúde",
    cod: "12345",
    cat: "Médica",
    un: "1",
    price: "3500"
  },
  {
    nome: "Vedois Estoque",
    cod: "52134",
    cat: "Estoque",
    un: "1",
    price: "3500"
  },
  {
    nome: "Vedois CRM",
    cod: "12513",
    cat: "Planejamento",
    un: "1",
    price: "3500"
  }
];


@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  // Lista produtos:
  produtosapi: any;
  erroProdutos: any;

  displayedColumns: string[] = ['nome', 'cod', 'cat', 'un', 'price'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private crudService: CrudService) {
    this.getterProdutos();
  }

  getterProdutos() {
    this.crudService.getProdutos().subscribe(
      data => {
        this.produtosapi = data;
        console.log(data);
      },
      error => {
        this.erroProdutos = error;
        console.error(error);
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {}
}
