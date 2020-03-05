import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { CrudService } from "../services/crud.service";
import swal from 'sweetalert';
// import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import listPlugin from '@fullcalendar/list';

export interface PeriodicElement {
  position: number;
  data: string;
  tipo: string;
  cliente: string;
  org: string;
  ticket: string;
}

const atividade: PeriodicElement[] = [
  {position: 0, data: '', tipo: '', cliente: '', org: '', ticket: '' },
];

@Component({
  selector: "app-atividades",
  templateUrl: "./atividades.component.html",
  styleUrls: ["./atividades.component.css"],
})

export class AtividadesComponent implements OnInit {

  numm: string;
  matdata:  any = [];
  datamat: any = [];
  calendarPlugins: any = [];

  dNow = new Date();
  today = this.dNow.getFullYear() + '-0' + (this.dNow.getMonth() + 1) + '-0' + this.dNow.getDate();
  today1 = this.dNow.getFullYear() + '-0' + (this.dNow.getMonth() + 1) + '-' + this.dNow.getDate();
  tomorrow = this.dNow.getFullYear() + '-0' + (this.dNow.getMonth() + 1) + '-0' + (this.dNow.getDate() + 1);
  tomorrow1 = this.dNow.getFullYear() + '-0' + (this.dNow.getMonth() + 1) + '-' + (this.dNow.getDate() + 1);
  dayMonth = this.dNow.getFullYear() + '-0' + (this.dNow.getMonth() + 1) ;
  dayNextMonth = this.dNow.getFullYear() + '-0' + (this.dNow.getMonth() + 2) ;

  // Lista Ticket
  negociosapi: any;

  // Lista de Orgs:
  orsgapi: any;
  orgapi: any;

  tckapi: any;

  // Lista de atividades:
  erroAtividade: any;

  //Lista de Clientes:
  clientesapi: any;

  //Lista de vendedor:
  vendedorapi: any;

  calendarEvents = [
    { title: 'event 1', date: '2020-03-02' },
    { title: 'event 1', date: '2020-03-02' },
    { title: 'event 1', date: '2020-03-02' },
    { title: 'event 1', date: '2020-03-02' },
    { title: 'event 1', date: '2020-03-02' },
    { title: 'event 1', date: '2020-03-02' },
    { title: 'event 1', date: '2020-03-02' },
    { title: 'event 1', date: '2020-03-02' },
    { title: 'event 1', date: '2020-03-02' },
    { title: 'event 1', date: '2020-03-02' },
    { title: 'event 1', date: '2020-03-02' },
    { title: 'event 1', date: '2020-03-02' },
    { title: 'event 2', date: '2020-03-09' },
    { title: 'event 2', date: '2020-03-09' },
    { title: 'event 2', date: '2020-03-09' },
    { title: 'event 2', date: '2020-03-09' },
    { title: 'event 2', date: '2020-03-09' },
    { title: 'event 2', date: '2020-03-09' },
    { title: 'event 2', date: '2020-03-09' },
    { title: 'event 2', date: '2020-03-09' },
    { title: 'event 2', date: '2020-03-09' },
    { title: 'event 2', date: '2020-03-09' },
    { title: 'event 2', date: '2020-03-09' },
    { title: 'event 2', date: '2020-03-09' },
    { title: 'event 2', date: '2020-03-09' },
    { title: 'event 2', date: '2020-03-09' },
    { title: 'event 2', date: '2020-03-09' },
  ];

  atv = {position: 0, dataini: '', horaini: '', datafim: '', horafim: '', tipo: '', cliente: '', org: '', ticket: '', assunto: '' };

  displayedColumns: string[] = ['select', 'tipo', 'data', 'cliente', 'org',
    'ticket', 'assunto', 'columnEdit', 'columnDelete'];

  dataSource: any;

  selection = new SelectionModel<Element>(true, []);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private router: Router, public crudService: CrudService) {
    this.getterCliente();
    this.getterOrgs();
    this.getterVendedor();
    this.getterTickets();
    this.getterActivity();
    this.calendarPlugins = [ listPlugin , bootstrapPlugin ];

  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.matdata);
    console.log(this.calendarEvents)
  }

  //FILTRAR SELECT DOS CONTATOS DE ACORDO COM O SELECIONADO EM EMPRESAS
  getterCliOrg(id) {
    // console.log(id)
    this.crudService.getOrg(id).subscribe(
      data => {
        this.orgapi = data;
        console.log(data);
      },
      error => {
        this.erroAtividade = error;
      }
    );
  }

  //FILTRAR SELECT DAS EMPRESAS DE ACORDO COM O SELECIONADO EM NEGÓCIOS
    // getterOrgTick(id) {
    //  console.log(id)
    //  this.crudService.getTicket(id).subscribe(
    //    data => {
    //      this.tckapi = data;
    //      console.log(data);
    //    },
    //    error => {
    //      this.erroAtividade = error;
    //    }
    //  );
    // }

  gotocalendar(){
    this.router.navigate([]).then(result => { window.open('/calendar/', '_blank'); });
  }

  getColor(dataini) {
    if(dataini == this.today){
      return 'rgb(255, 232, 228)';
    } else if (dataini == this.today1) {
      return 'rgb(255, 232, 228)';
    } else if (dataini == this.tomorrow){
      return '#deeafa';
    } else if (dataini == this.tomorrow1) {
      return '#deeafa';
    }
  }

  getterActivity() {
    this.crudService.getAtividade().subscribe(
      data => {
        this.matdata = []
        data.forEach(e => {
          try {
            if (e.cliente == null && e.org == null && e.ticket == null) {
              this.matdata.push({
               position: e.id,
                assunto: e.assunto,
                dataini: e.dataini,
                tipo: e.tipo,
                ticket: {
                  titulo: ''
                },
                cliente: {
                  nome: ''
                },
                org: {
                  razaosocial: ''
                }
              });
            } else if (e.cliente == null) {
              this.matdata.push({
               position: e.id,
                assunto: e.assunto,
                dataini: e.data,
                tipo: e.tipo,
                ticket: e.ticket,
                 cliente: {
                   nome: ''
                 },
                 org: e.org
              });
            } else if (e.org == null) {
              this.matdata.push({
               position: e.id,
                assunto: e.assunto,
                dataini: e.dataini,
                tipo: e.tipo,
                ticket: e.ticket,
                cliente: e.cliente,
                org: {
                  razaosocial: ''
                }
              });
            } else if (e.ticket == null) {
              this.matdata.push({
               position: e.id,
                assunto: e.assunto,
                dataini: e.dataini,
                tipo: e.tipo,
                ticket: {
                  titulo: ''
                },
                cliente: e.cliente,
                org: e.org
              });
            } else {
              this.matdata.push({
               position: e.id,
                assunto: e.assunto,
                dataini: e.dataini,
                tipo: e.tipo,
                ticket: e.ticket,
                cliente: e.cliente,
                org: e.org
              });
            }
          } catch (error) {
            console.log(error);
          }
        });
        this.dataSource = new MatTableDataSource(this.matdata);
        this.dataSource.sort = this.sort;
        console.log(this.calendarEvents)
        console.log('dataSource: ', this.dataSource);
      },
      error => {
        this.erroAtividade = error;
        console.error(error);
      }
    );
  }

  getterCliente() {
    this.crudService.getClientes().subscribe(
      data => {
        this.clientesapi = data;
      },
      error => {
        this.erroAtividade = error;
      }
    );
  }

  getterVendedor() {
    this.crudService.getVendedor().subscribe(
      data => {
        this.vendedorapi = data;
      },
      error => {
        this.erroAtividade = error;
      }
    );
  }

  getterOrgs() {
    this.crudService.getOrgs().subscribe(
      data => {
        this.orsgapi = data;
      },
      error => {
        this.erroAtividade = error;
      }
    );
  }

  getterTickets() {
    this.crudService.getTickets().subscribe(
      data => {
        this.negociosapi = data;
      },
      error => {
        this.erroAtividade = error;
      }
    );
  }

  save() {
    console.log("save" + this.atv)
    this.crudService.saveNewAtividade(this.atv).subscribe(
      data => {
        swal({
          icon: "success",
          text: "Produto salvo com sucesso!",
          timer: 1000,
          buttons: {
            buttons: false
          }
        });
        this.getterActivity();
      },
      error => {
        this.getterActivity();
        console.error(error);
      },
    );
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  filterAll() {
    this.dataSource.filter = "".trim().toLowerCase();
  }

  filterCall() {
    this.dataSource.filter = "liga".trim().toLowerCase();
  }

  filterReunion() {
    this.dataSource.filter = "reunião".trim().toLowerCase();
  }

  filterVisit() {
    this.dataSource.filter = "visita".trim().toLowerCase();
  }

  filterEmail() {
    this.dataSource.filter = "email".trim().toLowerCase();
  }

  filterTask() {
    this.dataSource.filter = "Tarefa".trim().toLowerCase();
  }

  filterDay(){
    var day = this.dNow.getDate();
    if(day == 1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 9){
      this.dataSource.filter = this.today.trim().toLowerCase();
    } else {
      this.dataSource.filter = this.today1.trim().toLowerCase();
    }
  }

  filterTomorrow(){
    var day = (this.dNow.getDate() + 1);
    if(day == 1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 9){
      this.dataSource.filter = this.tomorrow.trim().toLowerCase();
    } else {
      this.dataSource.filter = this.tomorrow1.trim().toLowerCase();
    }
  }

  filterMonth(){
    this.dataSource.filter = this.dayMonth.trim().toLowerCase();
  }

  filterNextMonth(){
    this.dataSource.filter = this.dayNextMonth.trim().toLowerCase();
  }

  removeSelectedRows() {
    this.selection.selected.forEach(item => {
      let index: number = this.matdata.findIndex(d => d === item);
      console.log(index);
      if(index > -1) {
          this.matdata.splice(index, 1);
          this.dataSource = new MatTableDataSource(this.matdata);
          this.selection = new SelectionModel<Element>(true, []);
      }
    });

  }

  selectActivity(id: number) {
    if (id == 1) {
      this.numm = "Ligar";
    } else if (id == 2) {
      this.numm = "Reunião";
    } else if (id == 3) {
      this.numm = "Visita";
    } else if (id == 4) {
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

  redirectToAdd(url): void {
    window.open(url, '_blank');
    window.focus();
  }

  formatDate(date) {
    let result = date.split('-').reverse().join('/');
    return result
  }
}


