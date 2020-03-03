import { CrudService } from './../services/crud.service';
import { Component, OnInit, ViewChild } from "@angular/core";

import { MatTableDataSource, MatSort } from "@angular/material";
import swal from 'sweetalert';

export interface PeriodicElement {
  codigo: string;
  empresa: string;
  desc: string;
}

const erps: PeriodicElement[] = [
  {codigo: '', empresa: '', desc: ''},

];

@Component({
  selector: 'app-erp',
  templateUrl: './erp.component.html',
  styleUrls: ['./erp.component.css']
})
export class ErpComponent implements OnInit {

  erpsapi:any;
  erp: any = { codigo: '', desc: '', empresa: ''}

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['codigo', 'empresa', 'desc', 'columnEdit', 'columnDelete'];

  data = Object.assign(erps);
  dataSource = new MatTableDataSource<Element>(this.data);
  constructor(private crudservice: CrudService) {
    this.getterErp();
   }

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

  saveErp(){
    this.crudservice.saveNewErp(this.erp).subscribe(
      data => {
        swal({
          icon: "success",
          text: "Erp salvo com sucesso!",
          timer: 1800,
          buttons: {
            buttons: false
          }
        });
        // this.getterOrg();
        // setTimeout(this.reiniciar, 1001);
        console.log(data);
        this.getterErp();

      },
      error => {
        // this.getterOrg();
        console.error(error);
        // setTimeout(this.reiniciar, 1001);
      }
    );
  }

  getterErp() {
    this.crudservice.getErp().subscribe(
      data => {
        this.erpsapi = data;
        console.log(data);
        this.dataSource = new MatTableDataSource(this.erpsapi);
      },
      error => {
        // this.erroAtividade = error;
      }
    );
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
