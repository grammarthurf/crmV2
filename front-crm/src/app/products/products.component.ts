import { Component, OnInit } from "@angular/core";
import { CrudService } from "../services/crud.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  // Lista produtos:
  produtosapi: any;
  erroProdutos: any;

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
  ngOnInit() {}
}
