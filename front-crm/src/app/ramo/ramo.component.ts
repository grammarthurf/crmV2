import { Component, OnInit, ViewChild } from "@angular/core";
import { CrudService } from "../services/crud.service";
import { MatTableDataSource, MatSort } from "@angular/material";
import swal from 'sweetalert';

export interface PeriodicElement {
  desc: string;
}

const ramos: PeriodicElement[] = [
  {desc: ''},

];

@Component({
  selector: 'app-ramo',
  templateUrl: './ramo.component.html',
  styleUrls: ['./ramo.component.css']
})
export class RamoComponent implements OnInit {

  ramosapi:any;
  ramo: any = { nome: ''}

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['nome', 'columnEdit', 'columnDelete'];

  data = Object.assign(ramos);
  dataSource = new MatTableDataSource<Element>(this.data);

  constructor(private crudservice: CrudService) {
    this.getterRamo();
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

  getterRamo() {
    this.crudservice.getRamo().subscribe(
      data => {
        this.ramosapi = data;
        console.log(data);
        this.dataSource = new MatTableDataSource(this.ramosapi);
      },
      error => {
        // this.erroAtividade = error;
      }
    );
  }

  saveRamo(){
    this.crudservice.saveNewRamo(this.ramo).subscribe(
      data => {
        swal({
          icon: "success",
          text: "Ramo salvo com sucesso!",
          timer: 1800,
          buttons: {
            buttons: false
          }
        });
        // this.getterOrg();
        // setTimeout(this.reiniciar, 1001);
        console.log(data);
        this.getterRamo();
      },
      error => {
        // this.getterOrg();
        console.error(error);
        // setTimeout(this.reiniciar, 1001);
      }
    );
  }

  ngOnInit() {
  }

}
