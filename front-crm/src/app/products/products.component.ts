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

const produto: PeriodicElement[] = [
  {codigo: '', id: '', modalidade: '', nome: '' },
];


@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  produto = {
    id: "",
    nome: "",
    modalidade: "",
    codigo: ""
  };

  matdata: any = [];
  produtosapi: any;

  erroProdutos: any;

  data = Object.assign(produto);
  dataSource = new MatTableDataSource(this.data);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private crudService: CrudService) {
    this.getterProdutos();
  }

  code1: any;
  generateCode1() {
    this.code1 = ++this.produtosapi[0].codigo;
    this.produto.codigo = this.code1;
    console.log(this.code1);
  }

  displayedColumns: string[] = ['nome', 'codigo', 'columnEdit', 'columnDelete'];

  getterProdutos() {
    this.matdata = [];
    this.crudService.getProdutos().subscribe(
      data => {
        data.forEach(e => {
            console.log();
            this.matdata.push({
              id: e.id,
              nome: e.nome,
              codigo: e.codigo
          });
        });
        this.dataSource = new MatTableDataSource(this.matdata);
        this.dataSource.sort = this.sort;
        this.produtosapi = data;
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

  // filterCrtl(){
  //   this.dataSource.filter = "Controle".trim().toLowerCase();
  // }

  // filterPlan(){
  //   this.dataSource.filter = "Planejamento".trim().toLowerCase();
  // }

  dblclic(){
    this.dataSource.filter = "".trim().toLowerCase();
  }

  ngOnInit() { }

  save() {
    let descricao = this.produto.nome;
    let codigo = this.produto.codigo;

    if (descricao === '') {
      swal({
        icon: "error",
        text: "Descrição não preenchida!",
        timer: 1800,
        buttons: {
          buttons: false
        }
      });
    } else if (codigo === '') {
      swal({
        icon: "error",
        text: "Código não preenchido!",
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
