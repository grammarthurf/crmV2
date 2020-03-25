import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from "@angular/core";
import { CrudService } from "../services/crud.service";
import { MatTableDataSource, MatSort } from "@angular/material";
import swal from 'sweetalert';

export interface PeriodicElement {
  nome: string;
  usuario: string;
  tipo: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {nome: 'Fabiana', usuario: 'fabiana', tipo: 'Vendedor Interno'},
  {nome: 'Fabiana', usuario: 'fabiana', tipo: 'Vendedor Interno'},
  {nome: 'Fabiana', usuario: 'fabiana', tipo: 'Vendedor Interno'},
];


@Component({
  selector: 'app-vendedor',
  templateUrl: './vendedor.component.html',
  styleUrls: ['./vendedor.component.css']
})
export class VendedorComponent implements OnInit {
  vendedor = {
    nome: "",
    username: "",
    password: "",
  };

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['nome', 'usuario', 'tipo', 'columnEdit', 'columnDelete'];
  dataSource = ELEMENT_DATA;

  usersapi: any;

  constructor(private http: HttpClient, private crudservice: CrudService) {
    this.getterUsers();
   }

   getterUsers(){
    this.crudservice.getVendedor().subscribe(
      data => {
        this.usersapi = data;
        console.log(this.usersapi);

      },
      error => { }
    );
   }

  deleteItem() {
    swal({
      icon: "error",
      text: "Vendedor excluído com sucesso!",
      timer: 1800,
      buttons: {
        buttons: false
      }
    });
  }

  register() {
    console.log(this.vendedor);
    this.crudservice.registerUser(this.vendedor).subscribe( data => { console.log(data);
    }, err => {console.log(err);
    });
    this.vendedor.username = '';
    this.vendedor.password = '';
    this.vendedor.nome = '';

  }

  maiuscula(value: string){
    var v = value.toUpperCase();
    this.vendedor.nome = v;
  }

  ngOnInit() {
  }

}
