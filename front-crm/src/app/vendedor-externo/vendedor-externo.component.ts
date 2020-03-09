import { Component, OnInit } from '@angular/core';
import { CrudService } from "../services/crud.service";
import { MatTableDataSource, MatSort } from "@angular/material";
import swal from 'sweetalert';


export interface PeriodicElement {
  nome: string;
}

const vendedorExt: PeriodicElement[] = [
  { nome: '' },
];

@Component({
  selector: 'app-vendedor-externo',
  templateUrl: './vendedor-externo.component.html',
  styleUrls: ['./vendedor-externo.component.css']
})
export class VendedorExternoComponent implements OnInit {
  vendedorExt = {
    nome: ""
  };

  vendedorextapi: any;
  matdata: any;

  data = Object.assign(vendedorExt);
  dataSource = new MatTableDataSource(this.data);

  constructor(private crudService: CrudService) {
    this.getterVendedorExt();
   }

  ngOnInit() {
  }

  displayedColumns: string[] = ['nome', 'columnEdit', 'columnDelete'];

  getterVendedorExt() {
    this.matdata = [];
    this.crudService.getVendedorExt().subscribe(
      data => {
        data.forEach(e => {
            console.log();
            this.matdata.push({
              nome: e.nome
          });
        });
        this.dataSource = new MatTableDataSource(this.matdata);
        this.vendedorextapi = data;
      },
      error => {
        console.error(error);
      }
    );
  }

  save() {
    this.crudService.saveNewVendedorExt(this.vendedorExt).subscribe(
      data => {
        swal({
          icon: "success",
          text: "Vendedor Externo salvo com sucesso!",
          timer: 1800,
          buttons: {
            buttons: false
          }
        });
          console.log(data);
          this.getterVendedorExt();
        },
        error => {
          console.error(error);
        }
    );
  }
}
