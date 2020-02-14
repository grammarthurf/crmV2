import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { CrudService } from "../services/crud.service";
import { MatSort } from '@angular/material/sort';
import swal from 'sweetalert';
import { CalendarEvent, CalendarView } from 'angular-calendar';

export interface AtvData {
  tipo: string;
  data: string;
  assunto: string;
  cliente: string;
  org: string;
  negocio: string;
}

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
 // Lista de Orgs:
  orsgapi: any;
  // Lista de atividades:
  erroActivity: any;
  
  //Lista de Clientes:
  clientesapi:any;
  
  displayedColumns: string[] = ['select', 'assunto', 'data', 'cliente', 'org',
   'ticket', 'userResp', 'columnEdit', 'columnDelete'];

  activityapi: MatTableDataSource<AtvData>;
  selection = new SelectionModel<Element>(true, []);

  constructor(private router: Router, private crudService: CrudService) {
   this.getterActivity();

  }
  //data = Object.assign(this.activityapi);
  //dataSource = new MatTableDataSource<Element>(this.data);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  //ATIVIDADE
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

  filtrolig() {
    this.activityapi.filter = "Ligação".trim().toLowerCase();
    console.log(this.activityapi.filter);
  }

  filtroreun(event: Event) {
    this.activityapi.filter = "Reunião".trim().toLowerCase();
    console.log(this.activityapi.filter);
  }

  filtrovisit(){
    this.activityapi.filter = "Visita".trim().toLowerCase();
    console.log(this.activityapi.filter);
  }

  filtroemail() {
    this.activityapi.filter = "Email".trim().toLowerCase();
    console.log(this.activityapi.filter);
  }

  filtroTarefa(){
    this.activityapi.filter = "Tarefa".trim().toLowerCase();
    console.log(this.activityapi.filter);
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.activityapi.filter = filterValue.trim().toLowerCase();
  console.log("oi brenda" + this.activityapi.filter);
  }

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