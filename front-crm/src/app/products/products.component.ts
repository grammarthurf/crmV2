import { Component, OnInit, ViewChild } from "@angular/core";
import { CrudService } from "../services/crud.service";
import { MatTableDataSource, MatSort } from "@angular/material";
import swal from 'sweetalert';

export interface PeriodicElement {
  codigo: string;
  id: string;
  modalidade: string;
  nome: string;

}

let produtosapi: PeriodicElement[] = []

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  produto = {
    nome: "",
    modalidade: "",
    codigo: ""
  };

  erroProdutos: any;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private crudService: CrudService) {
    this.getterProdutos();
    console.log(this.proddata);
  }

  proddata: MatTableDataSource<any>;
  displayedColumns: string[] = ['nome', 'codigo', 'modalidade', 'columnEdit', 'columnDelete'];
  getterProdutos() {
    this.crudService.getProdutos().subscribe(
      data => {
        produtosapi = data;
        this.proddata = data;
        console.log('produtoslog', produtosapi);
        console.log('proddata', produtosapi);
      },
      error => {
        this.erroProdutos = error;
        console.error(error);
      }
    );
  }

  applyFilter(filterValue: string) {
    this.proddata.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() { }

  save() {
    let descricao = this.produto.nome;

    if (descricao === '') {
      swal({
        icon: "error",
        text: "Descrição não preenchida!",
        timer: 1800,
        buttons: {
          buttons: false
        }
      });
    } else {
      this.crudService.saveNewProduto(this.produto).subscribe(
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
          this.getterProdutos();
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  deleteItem() {
    swal({
      icon: "error",
      text: "Produto excluído com sucesso!",
      timer: 1800,
      buttons: {
        buttons: false
      }
    });
  }
}
