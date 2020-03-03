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
  {nome: 'Fabiana', usuario: 'fabiana', tipo: 'Vendedor Interno'},
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

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['nome', 'usuario', 'tipo', 'columnEdit', 'columnDelete'];
  dataSource = ELEMENT_DATA;

  constructor() { }

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

  ngOnInit() {
  }

}
