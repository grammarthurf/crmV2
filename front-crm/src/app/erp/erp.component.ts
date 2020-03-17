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
  disableCode: boolean = false;
  erp: any = { position: 0, codigo: '', desc: '', empresa: ''};

  delERP: any;

  selectederp: any;

  conf: any = { update: false};

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['codigo', 'empresa', 'desc', 'columnEdit', 'columnDelete'];

  data = Object.assign(erps);
  dataSource = new MatTableDataSource<Element>(this.data);
  constructor(private crudService: CrudService) {
    this.getterErp();
   }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  // GENERATE CODE
  code1: any;
  generateCode() {
    let a = this.erpsapi;
    if(a.length > 0){
      if(a.length < 9){
        this.code1 = "00" + ++this.erpsapi[0].codigo;
        this.erp.codigo = this.code1;
      } else if (a.length < 99) {
        this.code1 = "0" + ++this.erpsapi[0].codigo;
        this.erp.codigo = this.code1;
      } else {
        this.code1 = ++this.erpsapi[0].codigo;
        this.erp.codigo = this.code1;
      }
    } else {
      this.code1 = "00"+1;
      this.erp.codigo = this.code1;
    }
    this.disableCode = true;
  }

  // SAVE ERP
  saveErp(){
    this.crudService.saveNewErp(this.erp).subscribe(
      data => {
        swal({
          icon: "success",
          text: "Erp salvo com sucesso!",
          timer: 1800,
          buttons: {
            buttons: false
          }
        });
        this.getterErp();
      },
      error => {}
    );
  }

  // GET ERP
  getterErp() {
    this.crudService.getErpes().subscribe(
      data => {
        this.erpsapi = data;
        this.dataSource = new MatTableDataSource(this.erpsapi);
      },
      error => {}
    );
  }

  // GET ERP
  getterErpe(id) {

    this.crudService.getErp(id).subscribe(
      data => {
        this.selectederp = data;
        this.erp.position = this.selectederp.id;
        this.erp.codigo = this.selectederp.codigo;
        this.erp.desc = this.selectederp.desc;
        this.erp.empresa = this.selectederp.empresa;
      },
      error => {}
    );
  }

  updatefalse(){
    this.conf.update = false;
    this.erp.position = 0;
    this.erp.codigo = '';
    this.erp.desc = '';
    this.erp.empresa = '';
  }

  // EDIT ERP
  editErp(item){
    this.conf.update = true;
    this.getterErpe(item.id);
  }

  // UPDATE ERP
  UpdateErp(){
    this.crudService.updateErp(this.erp).subscribe(
      data => {
        this.getterErp();
        swal({
          icon: "success",
          text: "ERP atualizado com sucesso!",
          timer: 1000,
          buttons: {
            buttons: false
          }
        });
      },
      error => {}
    )
  }

  // DELETE ITEM
  deleteItem(item) {
    this.delERP = item.id;
  }

  // DELETE ERP
  del(){
    this.crudService.deleteERP(this.delERP).subscribe(
      data => {
        this.getterErp();
        swal({
          icon: "success",
          text: "ERP deletado com sucesso!",
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

  // TRANSFORM CAPITAL LETTER
  maiuscula(value: string, id:number){
    var v = value.toUpperCase();
    if(id == 1){
      this.erp.empresa = v
    } else if(id == 2) {
      this.erp.desc = v
    }
  }

  ngOnInit() {
  }

}
