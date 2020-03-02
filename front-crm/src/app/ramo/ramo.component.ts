import { Component, OnInit, ViewChild } from "@angular/core";
import { CrudService } from "../services/crud.service";
import { MatTableDataSource, MatSort } from "@angular/material";
import swal from 'sweetalert';

export interface PeriodicElement {
  nome: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {nome: 'Plástico'},
  {nome: 'Têxtil'},
  {nome: 'Vidro'},
  {nome: 'Madeira'},
];

@Component({
  selector: 'app-ramo',
  templateUrl: './ramo.component.html',
  styleUrls: ['./ramo.component.css']
})
export class RamoComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['nome', 'columnEdit', 'columnDelete'];
  dataSource = ELEMENT_DATA;

  constructor(private crudservice: CrudService) { }

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

  ngOnInit() {
  }

}
