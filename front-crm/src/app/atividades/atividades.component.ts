import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { CrudService } from "../services/crud.service";
import swal from 'sweetalert';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import listPlugin from '@fullcalendar/list';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export interface PeriodicElement {
  id: number;
  position: number;
  data: string;
  tipo: string;
  cliente: string;
  org: string;
  ticket: string;
}

const atividade: PeriodicElement[] = [
  { id: 0, position: 0, data: '', tipo: '', cliente: '', org: '', ticket: '' },
];

@Component({
  selector: "app-atividades",
  templateUrl: "./atividades.component.html",
  styleUrls: ["./atividades.component.css"],
})

export class AtividadesComponent implements OnInit {

  numm: string;
  matdata: any = [];
  datamat: any = [];
  calendarPlugins: any = [];

  conf: any = { update: false };

  dNow = new Date();
  today = this.dNow.getFullYear() + '-0' + (this.dNow.getMonth() + 1) + '-0' + this.dNow.getDate();
  today1 = this.dNow.getFullYear() + '-0' + (this.dNow.getMonth() + 1) + '-' + this.dNow.getDate();
  tomorrow = this.dNow.getFullYear() + '-0' + (this.dNow.getMonth() + 1) + '-0' + (this.dNow.getDate() + 1);
  tomorrow1 = this.dNow.getFullYear() + '-0' + (this.dNow.getMonth() + 1) + '-' + (this.dNow.getDate() + 1);
  dayMonth = this.dNow.getFullYear() + '-0' + (this.dNow.getMonth() + 1);
  dayNextMonth = this.dNow.getFullYear() + '-0' + (this.dNow.getMonth() + 2);

  // Lista Ticket
  negociosapi: any;

  // Lista de Orgs:
  orsgapi: any;
  orgapi: any;

  tckapi: any;

  selectedatv: any;

  //selects inputs
  selectTck = false;
  selectOrg = false;

  calendardata: any = [];

  // Lista de atividades:
  erroAtividade: any;

  //Lista de Clientes:
  clientesapi: any;

  //Lista de vendedor:
  vendedorapi: any;

  delact: any;

  tckapi1: any;

  calendarEvents = [];

  atv = {
    position: 0,
    dataini: '',
    horaini: '',
    datafim: '',
    horafim: '',
    tipo: '',
    cliente: '',
    org: '',
    ticket: '',
    assunto: ''
  };

  displayedColumns: string[] = ['select', 'tipo', 'dataini', 'org', 'cliente', 'ticket.titulo', 'assunto', 'columnEdit', 'columnDelete'];

  dataSource: any;

  selection = new SelectionModel<Element>(true, []);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private router: Router, public crudService: CrudService) {
    this.getterCliente();
    this.getterOrgs();
    this.getterVendedor();
    this.getterTickets();
    this.getterActivity();
    this.calendarPlugins = [listPlugin, bootstrapPlugin];
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.matdata);
    this.dataSource.sort = this.sort;
  }

  //FILTRAR SELECT DAS EMPRESAS DE ACORDO COM O SELECIONADO EM NEGÓCIOS
  getterOrgTick(id) {
    console.log(id)
    this.crudService.getTicket(id).subscribe(
      data => {
        this.tckapi = [data.org];
      },
      error => {
        this.erroAtividade = error;
      }
    );
  }

  // DELETE ACTIVITY
  deleteActivity(idativ) {
    this.delact = idativ;
  }

  // DELETE ACTIVITY
  del() {
    this.crudService.deleteActivity(this.delact).subscribe(
      data => {
        this.getterActivity();
        swal({
          icon: "success",
          text: "Atividade deletada com sucesso!",
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

  UpdateAtiv(){
    this.crudService.updateatv(this.atv).subscribe(
      data => {
        this.getterActivity();
        swal({
          icon: "success",
          text: "Atividade atualizada com sucesso!",
          timer: 1000,
          buttons: {
            buttons: false
          }
        });
      },
      error => { }
    )
  }

  // GET ACTIVITY
  getActivity(id) {
    this.crudService.getAtividades(id).subscribe(
      data => {
        this.selectedatv = data;

        this.atv.position = this.selectedatv.id;
        this.atv.dataini = this.selectedatv.dataini;
        this.atv.horaini = this.selectedatv.horaini;
        this.atv.datafim = this.selectedatv.datafim;
        this.atv.horafim = this.selectedatv.horafim;
        this.atv.tipo = this.selectedatv.tipo;
        this.atv.cliente = this.selectedatv.cliente;
        this.atv.org = this.selectedatv.org;
        this.atv.ticket = this.selectedatv.ticket;
        this.atv.assunto = this.selectedatv.assunto;
      },
      error => { }
    )
  }

  //UPDATE FALSE
  updateFalse() {
    this.conf.update = false;
    this.atv.dataini = '';
    this.atv.horaini = '';
    this.atv.datafim = '';
    this.atv.horafim = '';
    this.atv.tipo = '';
    this.atv.cliente = '';
    this.atv.org = '';
    this.atv.ticket = '';
    this.atv.assunto = '';
  }

  //EDIT ACTIVITY
  editAtv(item) {
    this.conf.update = true
    this.getActivity(item.position);
  }

  // BACKGROUND COLOR ROW TABLE
  getColor(dataini) {
    //DATA ATUAL
    var year = this.dNow.getFullYear();
    var month = this.dNow.getMonth() + 1;
    var day = this.dNow.getDate();
    //DATA DA ATIVIDADE
    var year1 = dataini.substring(0, 4);
    var month1 = dataini.substring(5, 7);
    var day1 = dataini.substring(8, 10);

    if (year > year1 ||
      (year == year1 && month > month1) ||
      (year == year1 && month == month1 && day > day1)) {
      return 'rgb(255, 232, 228)';
    }
  }

  // GET ACTIVITY
  getterActivity() {
    this.crudService.getAtividade().subscribe(
      data => {
        this.calendarEvents = [];
        this.matdata = [];
        
        data.forEach(e => {

          var timeIni = e.horaini.substring(0, 2) + ":" + e.horaini.substring(2, 4);
          var timeEnd = e.horafim.substring(0, 2) + ":" + e.horafim.substring(2, 4);

          this.calendarEvents.push({
            title: e.tipo + ":  " + e.ticket.titulo,
            start: e.dataini + "T" + timeIni,
            end: e.datafim + "T" + timeEnd
          });

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

          }
        });

        this.dataSource = new MatTableDataSource(this.matdata);
        this.dataSource.sort = this.sort;
      },
      error => {
        this.erroAtividade = error;
      }
    );
  }

  // GET CLIENT
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

  // GET SELLER
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

  // GET ORGANIZATIONS
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

  // GET LEADS
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

  // SAVE ACTIVITY
  save() {
    if (this.atv.horafim == "") {
      this.atv.horafim = this.atv.horaini;
    }

    if (this.atv.datafim == "") {
      this.atv.datafim = this.atv.dataini;
    }

    this.crudService.saveNewAtividade(this.atv).subscribe(
      data => {
        swal({
          icon: "success",
          text: "Atividade salva com sucesso!",
          timer: 1000,
          buttons: {
            buttons: false
          }
        });
        this.atv.assunto = "";
        // this.atv.cliente = '0';
        this.atv.datafim = "";
        this.atv.dataini = "";
        this.atv.tipo = "";
        this.atv.ticket = '0';
        // this.atv.org = '0';
        this.atv.position = 0;
        this.atv.horafim = "";
        this.atv.horaini = "";
        this.numm = "";

        this.atv.org = "";
        this.atv.cliente = "";
        this.getterActivity();

        // setTimeout(() => {
        //   this.reiniciar()
        // }, 500)
      },
      error => {
        
        this.getterActivity();
      },
    );
  }

  reiniciar() {
    location.reload()
  }

  // TRANSFORM CAPITAL LETTER
  maiuscula(value: string) {
    var v = value.toUpperCase();
    this.atv.assunto = v
    console.log(v)
  }

  // WORD FILTER 
  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  // ALL FILTER
  filterAll() {
    this.dataSource.filter = "".trim().toLowerCase();
  }

  // CALL FILTER
  filterCall() {
    this.dataSource.filter = "liga".trim().toLowerCase();
  }

  // REUNION FILTER
  filterReunion() {
    this.dataSource.filter = "reunião".trim().toLowerCase();
  }

  // VISIT FILTER
  filterVisit() {
    this.dataSource.filter = "visita".trim().toLowerCase();
  }

  // EMAIL FILTER
  filterEmail() {
    this.dataSource.filter = "email".trim().toLowerCase();
  }

  // TASK FILTER
  filterTask() {
    this.dataSource.filter = "Tarefa".trim().toLowerCase();
  }

  // DAY FILTER
  filterDay() {
    var day = this.dNow.getDate();
    if (day <= 9) {
      this.dataSource.filter = this.today.trim().toLowerCase();
    } else {
      this.dataSource.filter = this.today1.trim().toLowerCase();
    }
  }

  // TOMORROW FILTER
  filterTomorrow() {
    var day = (this.dNow.getDate() + 1);
    if (day < 9) {
      this.dataSource.filter = this.tomorrow.trim().toLowerCase();
    } else {
      this.dataSource.filter = this.tomorrow1.trim().toLowerCase();
    }
  }

  // MONTH FILTER
  filterMonth() {
    this.dataSource.filter = this.dayMonth.trim().toLowerCase();
  }

  // NEXT MONTH FILTER
  filterNextMonth() {
    this.dataSource.filter = this.dayNextMonth.trim().toLowerCase();
  }

  // REMOVE ROW TABLE
  removeSelectedRows() {
    this.selection.selected.forEach(item => {
      let index: number = this.matdata.findIndex(d => d === item);
      console.log(index);
      if (index > -1) {
        this.matdata.splice(index, 1);
        this.dataSource = new MatTableDataSource(this.matdata);
        this.selection = new SelectionModel<Element>(true, []);
      }
      this.editAtv(item);
    });
  }

  // REDIRECT TO LEAD SCREEN
  goToLead(id) {
    this.router.navigate([`/business-detail/${id}`]);
  }

  // REDIRECT TO ORGANIZATION SCREEN
  goToOrg(id) {
    this.router.navigate([`/organization-detail/${id}`]);
  }

  // SELECT ACTIVITY ADD 
  selectActivity(id: number) {
    if (id == 1) {
      this.numm = "LIGAÇÃO";
      this.atv.tipo = this.numm;
    } else if (id == 2) {
      this.numm = "REUNIÃO";
      this.atv.tipo = this.numm;
    } else if (id == 3) {
      this.numm = "VISITA";
      this.atv.tipo = this.numm;
    } else if (id == 4) {
      this.numm = "EMAIL";
      this.atv.tipo = this.numm;
    } else if (id == 5) {
      this.numm = "TAREFA";
      this.atv.tipo = this.numm;
    }
  }

  // FORMAT DATE BR
  formatDate(date) {
    let result = date.split('-').reverse().join('/');
    return result
  }
}
