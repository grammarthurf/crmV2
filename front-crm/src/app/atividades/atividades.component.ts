import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { CrudService } from "../services/crud.service";
import swal from 'sweetalert';
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { setHours, setMinutes } from 'date-fns';
import { Subject } from 'rxjs';

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
  styleUrls: ["./atividades.component.css"]
})

export class AtividadesComponent implements OnInit {

  count: number = 0;
  numm: string;
  matdata:  any = [];
  datamat: any = [];

  //CALENDARIO
  view: CalendarView = CalendarView.Day;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [
    {title: 'Reunião',
    start: setHours(setMinutes(new Date(), 0), 7),
    color: {primary: '#6297bd', secondary: '#deeafa'},
    draggable: true,
    id:1},
    {title: 'Reunião',
    start: setHours(setMinutes(new Date(), 0), 10),
    color: {primary: '#6297bd', secondary: '#deeafa'},
    draggable: true,
    id:2}
  ];

  refresh: Subject<any> = new Subject();

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }


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

  atv = {position: 0, data: '', tipo: '', cliente: '', org: '', ticket: '', assunto: '' };

  displayedColumns: string[] = ['select', 'tipo', 'data', 'cliente', 'org',
    'ticket', 'assunto', 'columnEdit', 'columnDelete'];

  data = Object.assign(atividade);
  dataSource = new MatTableDataSource(this.data);

  // dataSource = new MatTableDataSource<Element>(this.data);

  selection = new SelectionModel<Element>(true, []);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private router: Router, public crudService: CrudService) {
    this.getterCliente();
    this.getterOrgs();
    this.getterVendedor();
    this.getterTickets();
    this.getterActivity();
  }

  ngOnInit() {
  }

  getColor(data) {
    switch (data) {
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
        data.forEach(e => {
          try {

            if (e.cliente == null && e.org == null && e.ticket == null) {
              console.log();

              this.matdata.push({
               position: e.id,
                assunto: e.assunto,
                data: e.data,
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
                data: e.data,
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
                data: e.data,
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
                data: e.data,
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
                data: e.data,
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
        console.log('MATDATASOURCE: ', this.matdata);
        console.log(this.datamat);


        this.dataSource = new MatTableDataSource(this.matdata);
        this.dataSource.sort = this.sort;
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
    console.log('Atividade do Post',this.atv)
    console.log("save" + this.atv)
    this.crudService.saveNewAtividade(this.atv).subscribe(
      data => {
        swal({
          icon: "success",
          text: "Produto salvo com sucesso!",
          timer: 1800,
          buttons: {
            buttons: false
          }
        });
        this.getterActivity();
      },
      error => {
        this.getterActivity();
        console.error(error);
      }
    );
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

  countday(id){
    var day = this.dNow.getDate()

    var datei = this.dNow.getFullYear() + '-0' + (this.dNow.getMonth()+1) + '-';
    if(id == +1){
      var i = this.count++;
      var datef =  datei + (day + i) ;
    } else if (id == -1) {
      var ii = this.count++;
      var datef =  datei + (day - ii);
    }
    console.log(datef);
    var x = document.getElementById("labeldata");
    x.innerHTML = datef;
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
}


