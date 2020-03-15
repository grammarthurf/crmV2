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
  ramo: any = { nome: ''};

  delRamo: any;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['nome', 'columnEdit', 'columnDelete'];

  conf: any = { update: false};
  selectedramo: any;

  data = Object.assign(ramos);
  dataSource = new MatTableDataSource<Element>(this.data);

  constructor(private crudService: CrudService) {
    this.getterRamo();
   }

  deleteItem(item) {
    this.delRamo = item.id;
    console.log(this.delRamo);
    // swal({
    //   icon: "error",
    //   text: "Ramo excluído com sucesso!",
    //   timer: 1800,
    //   buttons: {
    //     buttons: false
    //   }
    // });
  }

  getterRamo() {
    this.crudService.getRamo().subscribe(
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
    this.crudService.saveNewRamo(this.ramo).subscribe(
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

  del(){
    this.crudService.deleteRamo(this.delRamo).subscribe(
      data => {
        this.getterRamo();
        swal({
          icon: "success",
          text: "Ramo deletada com sucesso!",
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

  getterRamos(id) {
    this.crudService.getRamos(id).subscribe(
      data => {
        this.selectedramo = data;
        this.ramo.id=this.selectedramo.id;
        this.ramo.desc= this.selectedramo.desc;
      },
      error => {
        console.error(error);
      }
    )
  }
  UpdateRamo(){
    this.crudService.updateRamo(this.ramo).subscribe(
      data => {
        this.getterRamo();
        swal({
          icon: "success",
          text: "ERP atualizado com sucesso!",
          timer: 1000,
          buttons: {
            buttons: false
          }
        });
      },
      error => {
        console.error(error);
      }
    )
  }


  updatefalse(){
    this.conf.update = false;
    this.ramo.desc = '';
  }

  editRamo(item){
    this.conf.update = true;
    this.getterRamos(item.id);
    console.log(item.id)
  }

  maiuscula(value: string){
    var v = value.toUpperCase();
    this.ramo.desc = v;
  }

  ngOnInit() {
  }

}
