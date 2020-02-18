import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { CrudService } from "../services/crud.service";
import { MatSort } from '@angular/material/sort';
import swal from 'sweetalert';
import { CalendarEvent, CalendarView } from 'angular-calendar';

export interface PeriodicElement {
  id: string;
  data: string;
  assunto: string;
  cliente: string;
  org: string;
  negocio: string;
}

const atividade: PeriodicElement[] = [
  {id: "", data: '', assunto: '', cliente: '', org: '', negocio: ''},
];

@Component({
  selector: "app-atividades",
  templateUrl: "./atividades.component.html",
  styleUrls: ["./atividades.component.css"]
})
export class AtividadesComponent implements OnInit {

  numm: string;
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

  displayedColumns: string[] = ['select', 'assunto', 'data', 'cliente', 'org', 'ticket',
                                'userResp', 'columnEdit', 'columnDelete'];

    data = Object.assign( atividade);
    dataSource = new MatTableDataSource<Element>(this.data);

  //dataSource = new MatTableDataSource(atividade);
  selection = new SelectionModel<Element>(true, []);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private router: Router, public crudService: CrudService) {
    this.getterActivity();
    this.numm = 'Indefinido';
  }

  getterActivity(){
    this.crudService.getAtividade().subscribe(
      data => {
       //this.dataSource = data;
       this.dataSource = new MatTableDataSource(data);
     },
      error => {
       this.erroActivity = error;
       console.error(error);
     }
   );
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngOnInit() {
  }

  dblclic() {
   this.dataSource .filter = "".trim().toLowerCase();
  }

  filtroLiga(){
    this.dataSource.filter = "liga".trim().toLowerCase();
  }

  filtroReuniao(){
    this.dataSource.filter = "reunião".trim().toLowerCase();
  }

  filtroVisita(){
    this.dataSource.filter = "visita".trim().toLowerCase();
  }

  filtroemail(){
    this.dataSource.filter = "email".trim().toLowerCase();
  }

  filtroTarefa(){
    this.dataSource.filter = "Tarefa".trim().toLowerCase();
  }

  filtroday(){
    var dNow = new Date();
    var periodo = dNow.getDate() + '/0' + (dNow.getMonth()+1) + '/' + dNow.getFullYear();
    this.dataSource.filter = periodo.trim().toLowerCase();
  }

  filtrotmrw(){
    var dNow = new Date();
    var periodo = (dNow.getDate()+1) + '/0' + (dNow.getMonth()+1) + '/' + dNow.getFullYear();
    this.dataSource.filter = periodo.trim().toLowerCase();
  }

  filtromes(){
    var dNow = new Date();
    var periodo = dNow.getFullYear() + '-0' + (dNow.getMonth()+1) ;
    this.dataSource.filter = periodo.trim().toLowerCase();
  }

  filtroproxmes(){
    var dNow = new Date();
    var periodo = '/0' + (dNow.getMonth()+2) + '/' + dNow.getFullYear();
    this.dataSource.filter = periodo.trim().toLowerCase();
  }

  filtrovenc(){
    var dNow = new Date();
    var periodo = '/' + (dNow.getFullYear()-1);
    this.dataSource.filter = periodo.trim().toLowerCase();
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

  removeSelectedRows() {
    this.selection.selected.forEach(item => {
      let index: number = this.data.findIndex(d => d === item);
       console.log(this.data.findIndex(d => d === item));
       this.data.splice(index,1);
       this.dataSource = new MatTableDataSource<Element>(this.data);
    });
    this.selection = new SelectionModel<Element>(true, []);
  }

  atvchoose(id: number){
    if(id == 1){
      this.numm = "Ligar";
    } else if (id == 2 ) {
      this.numm = "Reunião";
    } else if (id == 3 ) {
      this.numm = "Visita";
    } else if (id == 4 ) {
      this.numm = "Email";
    } else if (id == 5) {
      this.numm = "Tarefa";
    } 
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