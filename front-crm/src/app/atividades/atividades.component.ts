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
  dayhj = this.dNow.getFullYear() + '-0' + (this.dNow.getMonth() + 1) + '-' + this.dNow.getDate();
  daytmrw = this.dNow.getFullYear() + '-0' + (this.dNow.getMonth() + 1) + '-' + (this.dNow.getDate() + 1);
  daymes = this.dNow.getFullYear() + '-0' + (this.dNow.getMonth() + 1) + '-' + (this.dNow.getDate() + 2);

  // Lista Ticket
  negociosapi: any;

  // Lista de Orgs:
  orsgapi: any;

  // Lista de atividades:
  erroAtividade: any;

  //Lista de Clientes:
  clientesapi: any;

  //Lista de vendedor:
  vendedorapi: any;

  calendarEvents = [
    { title: 'Reunião', start: '2020-02-27T08:30:00', end: '2020-02-27T09:00:00' },
    { title: 'Reunião', start: '2020-02-28T15:30:00', end: '2020-02-28T16:30:00' },
    { title: 'Reunião', start: '2020-02-28T17:00:00', end: '2020-02-28T17:30:00' },
    { title: 'Reunião', start: '2020-03-02T08:30:00', end: '2020-03-02T09:30:00' },
    { title: 'Reunião', start: '2020-03-04T13:30:00', end: '2020-03-04T15:00:00' },
    { title: 'Reunião', start: '2020-03-04T15:30:00', end: '2020-03-04T17:00:00' },
    { title: 'Reunião', start: '2020-03-03T10:30:00', end: '2020-03-03T11:30:00' },
    { title: 'Reunião', start: '2020-02-20T14:30:00', end: '2020-02-20T15:30:00' },
    { title: 'Reunião', start: '2020-02-20T15:30:00', end: '2020-02-20T16:30:00' },
    { title: 'Reunião', start: '2020-02-27T16:50:00', end: '2020-02-27T17:30:00' },
    { title: 'Reunião', start: '2020-03-02T10:00:00', end: '2020-03-02T10:30:00' },
    { title: 'Reunião', start: '2020-02-28T09:30:00', end: '2020-02-28T11:30:00' },
    { title: 'Ligação', start: '2020-02-28T11:30:00', end: '2020-02-28T11:35:00' },
    { title: 'Ligação', start: '2020-02-28T13:30:00', end: '2020-02-28T13:50:00' },
    { title: 'Ligação', start: '2020-02-27T10:30:00', end: '2020-02-27T10:40:00' },
    { title: 'Ligação', start: '2020-02-27T10:50:00', end: '2020-02-27T11:00:00' },
    { title: 'Ligação', start: '2020-02-28T14:30:00', end: '2020-02-28T14:40:00' },
    { title: 'Ligação', start: '2020-02-28T08:30:00', end: '2020-02-28T08:40:00' },
    { title: 'Ligação', start: '2020-03-09T09:40:00', end: '2020-03-09T09:50:00' },
    { title: 'Email  ', start: '2020-03-03T11:30:00', end: '2020-03-03T11:30:00' },
    { title: 'Email  ', start: '2020-03-05T11:40:00', end: '2020-03-05T11:40:00' },
    { title: 'Email  ', start: '2020-02-10T14:00:00', end: '2020-02-10T14:00:00' },
    { title: 'Email  ', start: '2020-02-14T11:00:00', end: '2020-02-14T11:00:00' },
    { title: 'Email  ', start: '2020-02-14T11:30:00', end: '2020-02-14T11:30:00' },
    { title: 'Email  ', start: '2020-02-18T11:30:00', end: '2020-02-18T11:30:00' },
    { title: 'Email  ', start: '2020-02-20T11:30:00', end: '2020-02-20T11:30:00' },
    { title: 'Email  ', start: '2020-02-20T11:30:00', end: '2020-02-20T11:30:00' },
    { title: 'Email  ', start: '2020-02-27T11:30:00', end: '2020-02-27T11:30:00' },
    { title: 'Email  ', start: '2020-02-27T11:30:00', end: '2020-02-27T11:30:00' },
    { title: 'Email  ', start: '2020-02-28T11:30:00', end: '2020-02-28T11:30:00' }
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
    
  }

  gotocalendar(){
    this.router.navigate([]).then(result => { window.open('/calendar/', '_blank'); });
  }

  getColor(dataini) {
    switch (dataini) {
      case this.daymes:
        return '#deeafa';
      case this.daytmrw:
        return '#deeafa';
      case this.dayhj:
        return 'rgb(255, 232, 228)';
    }
  }

  getterActivity() {
    this.crudService.getAtividade().subscribe(
      data => {
        this.matdata = []
        data.forEach(e => {
          try {

            if (e.cliente == null && e.org == null && e.ticket == null) {
              console.log();
              
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
                // ticket: e.ticket,
                // cliente: {
                //   nome: ''
                // },
                // org: e.org

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
        // setTimeout(this.reiniciar, 1001);
        this.getterActivity();
      },
      error => {
        this.getterActivity();
        console.error(error);
        // setTimeout(this.reiniciar, 1001);
      },
    );
  }

  reiniciar(){
    location.reload()
  }

  testebtn() {
    this.router.navigate([]).then(result => { window.open('/person/', '_blank'); });
  }

  testebtn2() {
    this.router.navigate([]).then(result => { window.open('/company/', '_blank'); });
  }

  testebtn3() {
    this.router.navigate([]).then(result => { window.open('/products/', '_blank'); });
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  dblclic() {
    this.dataSource.filter = "".trim().toLowerCase();
  }

  filtroLiga() {
    this.dataSource.filter = "liga".trim().toLowerCase();
  }

  filtroReuniao() {
    this.dataSource.filter = "reunião".trim().toLowerCase();
  }

  filtroVisita() {
    this.dataSource.filter = "visita".trim().toLowerCase();
  }

  filtroemail() {
    this.dataSource.filter = "email".trim().toLowerCase();
  }

  filtroTarefa() {
    this.dataSource.filter = "Tarefa".trim().toLowerCase();
  }

  filtroday(){
    this.dataSource.filter = this.dayhj.trim().toLowerCase();
  }

  filtrotmrw(){
    this.dataSource.filter = this.daytmrw.trim().toLowerCase();
  }

  filtromes(){
    var periodo = this.dNow.getFullYear() + '-0' + (this.dNow.getMonth()+1) ;
    this.dataSource.filter = periodo.trim().toLowerCase();
  }

  filtroproxmes(){
    var periodo = this.dNow.getFullYear() + '-0' + (this.dNow.getMonth()+2);
    this.dataSource.filter = periodo.trim().toLowerCase();
  }

  filtrovenc(){
    // um filtro que pegue todas as datas antes de this.dayhj
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

  atvchoose(id: number) {
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


