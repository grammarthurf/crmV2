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
  disableCode: boolean = false;

  erroProdutos: any;

  conf: any = { update: false};
  selectedproduct: any;

  delProduct: any;

  data = Object.assign(produto);
  dataSource = new MatTableDataSource(this.data);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private crudService: CrudService) {
    this.getterProdutos();
  }

  code1: any;
  generateCode1() {
    var a = this.produtosapi;
    console.log(a);
    if(a.length > 0){
      if(a.length < 9){
        this.code1 = "00" + ++this.produtosapi[0].codigo;
        this.produto.codigo = this.code1;
        console.log(this.code1);

      } else if (a.length < 99){
        this.code1 = "0" + ++this.produtosapi[0].codigo;
        this.produto.codigo = this.code1;
        console.log(this.code1);
      } else {
        this.code1 = ++this.produtosapi[0].codigo;
        this.produto.codigo = this.code1;
        console.log(this.code1);
      }
    } else {
      this.code1 = "00"+1;
      this.produto.codigo = this.code1;
      console.log(this.code1);
    }
    this.disableCode = true;
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

  getterProduct(id) {
    this.crudService.getProduto(id).subscribe(
      data => {
        this.selectedproduct = data;
        console.log('Produtoselecionado: ', this.selectedproduct);

        this.produto.id = this.selectedproduct.id;
        this.produto.nome = this.selectedproduct.nome;
        this.produto.modalidade = this.selectedproduct.modalidade;
        this.produto.codigo = this.selectedproduct.codigo;
      },
      error => {
        console.error(error);
      }
    )
  }


  updatefalse(){
    this.conf.update = false;
    this.produto.id = this.selectedproduct.id;
    this.produto.nome = '';
    this.produto.modalidade = '';
    this.produto.codigo = '';
  }

  UpdateProduct(){
    this.crudService.UpdateProduct(this.produto).subscribe( data => { this.getterProdutos() }, error => {})
  }

  editProduct(item){
    this.conf.update = true
    this.getterProduct(item.id);
  }

  maiuscula(value: string){
    var v = value.toUpperCase();
    this.produto.nome = v;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

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
          this.disableCode = false;
          this.produto.nome = '';
          this.produto.modalidade = '';
          this.produto.codigo = '';
        },
        error => {
          console.error(error);

        }
      );
    }
  }

  deleteItem(item) {
    this.delProduct = item.id;
    console.log(this.delProduct)
    // swal({
    //   icon: "error",
    //   text: "Produto excluído com sucesso!",
    //   timer: 1800,
    //   buttons: {
    //     buttons: false
    //   }
    // });
  }

  del(){
    this.crudService.deleteProduct(this.delProduct).subscribe(
      data => {
        this.getterProdutos();
        swal({
          icon: "success",
          text: "Produto deletado com sucesso!",
          timer: 1000,
          buttons: {
            buttons: false
          }
        });
      },
      error => {
        swal({
          icon: "error",
          text: "Erro ao deletar !",
          timer: 1000,
          buttons: {
            buttons: false
          }
        });
      }
    )
  }
}
