import { Component, OnInit, ViewChild } from "@angular/core";
import { CrudService } from "../services/crud.service";
import { MatTableDataSource, MatSort } from "@angular/material";
import swal from 'sweetalert';

export interface PeriodicElement {
  codigo: string;
  empresa: string;
  erp: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {codigo: '123', empresa: 'Vedois Tecnologia', erp: 'Vedois OEE'},
  {codigo: '123', empresa: 'Vedois Tecnologia', erp: 'Vedois OEE'},
  {codigo: '123', empresa: 'Vedois Tecnologia', erp: 'Vedois OEE'},
  {codigo: '123', empresa: 'Vedois Tecnologia', erp: 'Vedois OEE'},
  {codigo: '123', empresa: 'Vedois Tecnologia', erp: 'Vedois OEE'},
  {codigo: '123', empresa: 'Vedois Tecnologia', erp: 'Vedois OEE'},
  {codigo: '123', empresa: 'Vedois Tecnologia', erp: 'Vedois OEE'},
  {codigo: '123', empresa: 'Vedois Tecnologia', erp: 'Vedois OEE'}
];

@Component({
  selector: 'app-erp',
  templateUrl: './erp.component.html',
  styleUrls: ['./erp.component.css']
})
export class ErpComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['codigo', 'empresa', 'erp', 'columnEdit', 'columnDelete'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

}
