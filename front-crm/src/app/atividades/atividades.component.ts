import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { CrudService } from "../services/crud.service";
import { MatSort } from '@angular/material/sort';
import swal from 'sweetalert';
import { ɵAnimationGroupPlayer } from '@angular/animations';
import { CalendarEvent, CalendarView } from 'angular-calendar';

@Component({
  selector: "app-atividades",
  templateUrl: "./atividades.component.html",
  styleUrls: ["./atividades.component.css"]
})
export class AtividadesComponent implements OnInit {
  atividade = { tipo: "", data: '', assunto: '', cliente: '', org: '', negocio: '' };

  //CALENDARIO
  view: CalendarView = CalendarView.Day;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  // Lista Ticket
  negociosapi:any;

  // Lista de atividades:

  erroActivity: any;
  clientesapi:any;

  // Lista de Orgs:
  orsgapi: any;

  displayedColumns: string[] = ['select', 'assunto', 'data', 'cliente', 'org',
   'ticket', 'userResp', 'columnEdit', 'columnDelete'];
  // data = Object.assign(ELEMENT_DATA);
  // dataSource = new MatTableDataSource<Element>(this.data);
  selection = new SelectionModel<Element>(true, []);

  constructor(private router: Router, private crudService: CrudService) {
   this.getterActivity();
   this.getterCliente();
   this.getterOrgs();
   this.getterTickets();
  }

  activityapi: MatTableDataSource<any>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;


  getterTickets() {
    this.crudService.getTickets().subscribe(
      data => {
        this.negociosapi = data;
        console.log(data);
      },
      error => {

        console.error(error);
      }
    );
  }

  getterActivity() {
   this.crudService.getAtividade().subscribe(
     data => {
       this.activityapi = data;
       console.log('activity',this.activityapi);
     },
     error => {
       this.erroActivity = error;
       console.error(error);
     }
   );
  }

  getterCliente() {
    this.crudService.getClientes().subscribe(
      data => {
        this.clientesapi = data;
        console.log(data);
      },
      error => {
        console.error(error);

      }
    );
  }

  getterOrgs() {
    this.crudService.getOrgs().subscribe(
      data => {
        this.orsgapi = data;
        console.log(data);
      },
      error => {

      }
    );
  }


  save() {
    console.log(this.atividade);

    this.crudService.saveNewAtividade(this.atividade).subscribe(
      data => {
        swal({
          icon: "success",
          text: "Atividade salva com sucesso!",
          timer: 1800,
          buttons: {
            buttons: false
          }
        });
        this.getterActivity();
        console.log(data);
      },
      error => {
        swal({
          icon: "error",
          text: "Falhou!",
          timer: 1800,
          buttons: {
            buttons: false
          }
        });
        this.getterActivity();
        console.error(error);
      }
    );
  }

  

  applyFilter(filterValue: string) {
    this.activityapi.filter = filterValue.trim().toLowerCase();
  }

  filtrolig() {
    this.activityapi.filter = "ligar".trim().toLowerCase();
  }

  filtroreun() {
    this.activityapi.filter = "reunião".trim().toLowerCase();
  }

  filtrovisit() {
    this.activityapi.filter = "visita".trim().toLowerCase();
  }

  filtroemail() {
    this.activityapi.filter = "email".trim().toLowerCase();
  }

  filtroTarefa() {
    this.activityapi.filter = "tarefa".trim().toLowerCase();
  }

  filtrohj() {
    var dNow = new Date();
    this.activityapi.filter = (dNow.getDate() + '/0' + (dNow.getMonth()+1) + '/' + dNow.getFullYear()).trim().toLowerCase();
  }

  filtroamanha() {
    var dNow = new Date();
    this.activityapi.filter = ((dNow.getDate()+1) + '/0' + (dNow.getMonth()+1) + '/' + dNow.getFullYear()).trim().toLowerCase();
  }

  filtromes() {
    var dNow = new Date();
    this.activityapi.filter = ((dNow.getMonth()+1) + '/' + dNow.getFullYear()).trim().toLowerCase();
  }

  filtroproxmes() {
    var dNow = new Date();
    this.activityapi.filter = ((dNow.getMonth()+2) + '/' + dNow.getFullYear()).trim().toLowerCase();
  }

  filtrovenc() {
    var dNow = new Date();
    var localdate =  '/' + (dNow.getFullYear()-1);
    this.activityapi.filter = localdate.trim().toLowerCase();
  }

  dblclic() {
    this.activityapi.filter = "".trim().toLowerCase();
  }

  catchday(){
    var dNow = new Date();
    var periodo = dNow.getDate() + '/0' + (dNow.getMonth()+1) + '/' + dNow.getFullYear();
    return periodo;
  }

  catchtmrw(){
    var dNow = new Date();
    var periodo = (dNow.getDate()+1) + '/0' + (dNow.getMonth()+1) + '/' + dNow.getFullYear();
    return periodo;
  }

  atvchoose(id:number){
    if(id == 1){
      return "Ligar";
    }
    
  }


  // removeSelectedRows() {
  //   this.selection.selected.forEach(item => {
  //     let index: number = this.data.findIndex(d => d === item);
  //     this.data.splice(index, 1);
  //     this.activityapi = new MatTableDataSource<Element>(this.data);
  //   });
  //   this.selection = new SelectionModel<Element>(true, []);
  // }

  // removechama() {
  //   this.removeSelectedRows();
  // }

  ngOnInit() {
   // this.activityapi.sort = this.sort;

   
  }

  deleteItem() {
   swal({
     icon: "error",
     text: "Atividade excluída com sucesso!",
     timer: 1800,
     buttons: {
       buttons: false
     }
   });
  }
}
