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

  code: any;
  generateCode() {
    let randomString = function(lenght) {
      let text = "";
      let possible = "0123456789"

      for(let i = 0; i < lenght; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }

    this.code = randomString(8);
    console.log(this.code);
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

  ngOnInit() {
  }

}
