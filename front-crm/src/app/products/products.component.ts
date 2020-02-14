import { Component, OnInit, ViewChild } from "@angular/core";
import { CrudService } from "../services/crud.service";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import swal from 'sweetalert';

export interface PeriodicElement {
  codigo: string;
  id: string;
  modalidade: string;
  nome: string;

}

let produtosapi: PeriodicElement[] = []

// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     nome: "Vedois OEE",
//     cod: "32412",
//     cat: "Indústria",
//   },
//   {
//     nome: "Vedois Planejamento",
//     cod: "51235",
//     cat: "Planejamento",
//   },
//   {
//     nome: "Vedois Tear",
//     cod: "32712",
//     cat: "Indústria",
//   },
//   {
//     nome: "Vedois Saúde",
//     cod: "12345",
//     cat: "Médica",
//   },
//   {
//     nome: "Vedois Estoque",
//     cod: "52134",
//     cat: "Estoque",
//   },
//   {
//     nome: "Vedois CRM",
//     cod: "12513",
//     cat: "Planejamento",
//   }
// ];

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
  // Lista produtos:
  // produtosapi: any;
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
