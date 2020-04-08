import { Component, OnInit, ViewChild, ɵCompiler_compileModuleAndAllComponentsAsync__POST_R3__ } from '@angular/core';
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
  feito: boolean;
  cliente: string;
  ticket: string;
}

const atividade: PeriodicElement[] = [
  { id: 0, position: 0, data: '', tipo: '', feito: false, cliente: '', ticket: '' },
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

  conf: any = { update: null };
  feito: boolean = false;

  dNow = new Date();
  today = this.dNow.getFullYear() + '-0' + (this.dNow.getMonth() + 1) + '-0' + this.dNow.getDate();
  today1 = this.dNow.getFullYear() + '-0' + (this.dNow.getMonth() + 1) + '-' + this.dNow.getDate();
  tomorrow = this.dNow.getFullYear() + '-0' + (this.dNow.getMonth() + 1) + '-0' + (this.dNow.getDate() + 1);
  tomorrow1 = this.dNow.getFullYear() + '-0' + (this.dNow.getMonth() + 1) + '-' + (this.dNow.getDate() + 1);
  dayMonth = this.dNow.getFullYear() + '-0' + (this.dNow.getMonth() + 1);
  dayNextMonth = this.dNow.getFullYear() + '-0' + (this.dNow.getMonth() + 2);

  // Lista Ticket
  negociosapi: any = []

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

  statusUpdate = { id: 0, feito: false };

  atv = {
    position: 0,
    dataini: '',
    horaini: '',
    datafim: '',
    horafim: '',
    vendedor: {
      id: 0, user: {
        username: ''
      }
    },
    tipo: '',
    feito: false,
    cliente: '',
    org: '',
    ticket: '',
    assunto: ''
  };

  displayedColumns: string[] = ['select', 'tipo', 'dataini', 'ticket.titulo', 'cliente', 'assunto', 'vendedor', 'columnEdit', 'columnDelete'];

  dataSource: any;

  mode: boolean = false;
  selection = new SelectionModel<Element>(false, []);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private router: Router, public crudService: CrudService) {
    this.getterCliente();
    this.getterOrgs();
    this.getterVendedor();
    this.getterTickets();
    this.getterActivity(this.mode);
    this.calendarPlugins = [listPlugin, bootstrapPlugin];
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.matdata);
    this.dataSource.sort = this.sort;
    this.atv.dataini = this.today1;
  }

  // FILTRAR SELECT DAS EMPRESAS DE ACORDO COM O SELECIONADO EM NEGÓCIOS

  getterOrgTick(id) {
    console.log(id)
    this.crudService.getTicket(id).subscribe(
      data => {


        this.tckapi = data;
        console.log('Ticket pego: ', this.tckapi);
        this.atv.org = this.tckapi.org;
        this.atv.cliente = this.tckapi.cliente;
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
        this.getterActivity(this.mode);
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

  UpdateStatusAtiv() {
    this.crudService.updatestatusatv(this.statusUpdate).subscribe(
      data => {
        this.getterActivity(false);
        console.log(data);
        if (!this.statusUpdate.feito) {
          this.reiniciar();
        }
      }, err => { console.log(err); });
  }

  UpdateAtiv() {


    this.crudService.updateatv(this.atv).subscribe(
      data => {
        this.getterActivity(this.mode);
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
    console.log(this.conf.update);

    this.crudService.getAtividades(id).subscribe(
      data => {
        this.selectedatv = data;

        this.atv.position = 0;
        this.atv.horaini = '';
        this.atv.datafim = '';
        this.atv.horafim = '';
        this.atv.tipo = '';
        this.atv.cliente = '';
        this.atv.org = '';
        this.atv.ticket = '';
        this.atv.assunto = '';

        this.atv.position = this.selectedatv.id;
        this.atv.dataini = this.selectedatv.dataini;
        this.atv.horaini = this.selectedatv.horaini;
        this.atv.datafim = this.selectedatv.datafim;
        this.atv.horafim = this.selectedatv.horafim;
        this.atv.tipo = this.selectedatv.tipo;
        this.atv.vendedor = this.selectedatv.vendedor;
        // this.atv.cliente = this.selectedatv.cliente;
        // this.atv.org = this.selectedatv.org;
        // this.atv.ticket = this.selectedatv.ticket;
        this.atv.assunto = this.selectedatv.assunto;
        console.log('VENDEDOR: ', this.atv.vendedor);

      },
      error => { }
    )
  }

  //UPDATE FALSE
  updateFalse() {
    this.conf.update = false;
    this.atv.horaini = '';
    this.atv.datafim = '';
    this.atv.horafim = '';
    this.atv.tipo = '';
    this.atv.cliente = null;
    this.atv.org = "0";
    this.atv.ticket = null;
    this.atv.assunto = '';
  }

  //EDIT ACTIVITY
  editAtv(item) {
    this.conf.update = true;
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
  getterActivity(mode) {
    this.crudService.getAtividade().subscribe(
      data => {
        console.log('Atividades: ', data);

        this.calendarEvents = [];
        this.matdata = [];
        const username = JSON.parse(localStorage.getItem('username'))

        data.forEach(e => {
          console.log('Usuario logado: ', username);
          console.log('Usuario Responsavel: ', e.vendedor.user.username);

          if (e.vendedor.user.username == username || username === 'Fabiana' || username == 'Osmir' || username == 'Leandro' || username == 'admin') {
            console.log('true');

          } else {
            console.log('false');

          }


          if (e.vendedor.user.username === username || username === 'Fabiana' || username == 'Osmir' || username == 'Leandro' || username == 'admin') {
            var timeIni = e.horaini.substring(0, 2) + ":" + e.horaini.substring(2, 4);
            var timeEnd = e.horafim.substring(0, 2) + ":" + e.horafim.substring(2, 4);
            console.log(e);

            this.calendarEvents.push({
              title: e.tipo + ":  " + e.ticket.titulo,
              start: e.dataini + "T" + timeIni,
              end: e.datafim + "T" + timeEnd
            });
            console.log('feito? : ', e.feito);
            if (mode) {
              if (e.feito) {
                try {
                  if (e.cliente == null && e.org == null && e.ticket == null) {
                    this.matdata.push({
                      position: e.id,
                      assunto: e.assunto,
                      dataini: e.dataini,
                      tipo: e.tipo,
                      feito: e.feito,
                      ticket: {
                        titulo: ''
                      },
                      cliente: {
                        nome: ''
                      },
                      org: {
                        razaosocial: ''
                      },
                      vendedor: e.vendedor.user.username
                    });
                  } else if (e.cliente == null) {
                    this.matdata.push({
                      position: e.id,
                      assunto: e.assunto,
                      dataini: e.data,
                      tipo: e.tipo,
                      feito: e.feito,
                      ticket: e.ticket,
                      cliente: {
                        nome: ''
                      },
                      org: e.org,
                      vendedor: e.vendedor.user.username
                    });
                  } else if (e.org == null) {
                    this.matdata.push({
                      position: e.id,
                      assunto: e.assunto,
                      dataini: e.dataini,
                      tipo: e.tipo,
                      feito: e.feito,
                      ticket: e.ticket,
                      cliente: e.cliente,
                      org: {
                        razaosocial: ''
                      },
                      vendedor: e.vendedor.user.username
                    });
                  } else if (e.ticket == null) {
                    this.matdata.push({
                      position: e.id,
                      assunto: e.assunto,
                      dataini: e.dataini,
                      tipo: e.tipo,
                      feito: e.feito,
                      ticket: {
                        titulo: ''
                      },
                      cliente: e.cliente,
                      org: e.org,
                      vendedor: e.vendedor.user.username
                    });
                  } else {
                    this.matdata.push({
                      position: e.id,
                      assunto: e.assunto,
                      dataini: e.dataini,
                      tipo: e.tipo,
                      feito: e.feito,
                      ticket: e.ticket,
                      cliente: e.cliente,
                      org: e.org,
                      vendedor: e.vendedor.user.username
                    });
                  }
                } catch (error) {

                }
              }
            } else {
              if (!e.feito) {
                try {
                  if (e.cliente == null && e.org == null && e.ticket == null) {
                    this.matdata.push({
                      position: e.id,
                      assunto: e.assunto,
                      dataini: e.dataini,
                      tipo: e.tipo,
                      feito: e.feito,
                      ticket: {
                        titulo: ''
                      },
                      cliente: {
                        nome: ''
                      },
                      org: {
                        razaosocial: ''
                      },
                      vendedor: e.vendedor.user.username
                    });
                  } else if (e.cliente == null) {
                    this.matdata.push({
                      position: e.id,
                      assunto: e.assunto,
                      dataini: e.data,
                      tipo: e.tipo,
                      feito: e.feito,
                      ticket: e.ticket,
                      cliente: {
                        nome: ''
                      },
                      org: e.org,
                      vendedor: e.vendedor.user.username
                    });
                  } else if (e.org == null) {
                    this.matdata.push({
                      position: e.id,
                      assunto: e.assunto,
                      dataini: e.dataini,
                      tipo: e.tipo,
                      feito: e.feito,
                      ticket: e.ticket,
                      cliente: e.cliente,
                      org: {
                        razaosocial: ''
                      },
                      vendedor: e.vendedor.user.username
                    });
                  } else if (e.ticket == null) {
                    this.matdata.push({
                      position: e.id,
                      assunto: e.assunto,
                      dataini: e.dataini,
                      tipo: e.tipo,
                      feito: e.feito,
                      ticket: {
                        titulo: ''
                      },
                      cliente: e.cliente,
                      org: e.org,
                      vendedor: e.vendedor.user.username
                    });
                  } else {
                    this.matdata.push({
                      position: e.id,
                      assunto: e.assunto,
                      dataini: e.dataini,
                      tipo: e.tipo,
                      feito: e.feito,
                      ticket: e.ticket,
                      cliente: e.cliente,
                      org: e.org,
                      vendedor: e.vendedor.user.username
                    });
                  }
                } catch (error) {

                }
              }
            }


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
        console.log(this.vendedorapi)
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
        const username = JSON.parse(localStorage.getItem('username'))
        console.log('ticket', data);
        data.forEach(element => {
          if (element.vendedor.user.username == username || username == 'Fabiana' || username == 'Osmir') {
            this.negociosapi.push(element);
          }
        });

      },
      error => {
        this.erroAtividade = error;
      }
    );
  }

  // SAVE ACTIVITY
  save() {
    console.log(this.conf.update);
    console.log(this.atv.dataini)

    if (this.atv.ticket == "") {
      this.atv.ticket = this.selectedatv.ticket.id.toString();
    }

    if (this.atv.org == "") {
      this.atv.org = this.selectedatv.org;
    }

    if (this.atv.cliente == "") {
      this.atv.cliente = this.selectedatv.cliente;
    }

    console.log('VENDEDOR CAIU: ', this.atv.vendedor)

    console.log(this.atv.ticket + this.atv.org + this.atv.cliente)

    if (this.conf.update) {
      console.log('calledupdate');

      this.UpdateAtiv();
    } else {
      console.log('calledcreated');
      if (this.atv.horafim == "") {
        this.atv.horafim = this.atv.horaini;
      }

      if (this.atv.datafim == "") {
        this.atv.datafim = this.atv.dataini;
      }

      let dataIniAno = parseInt(this.atv.dataini.substring(0, 4))
      let dataIniMes = parseInt(this.atv.dataini.substring(5, 7))
      let dataIniDia = parseInt(this.atv.dataini.substring(8, 10))
      let dataInputIni = new Date(dataIniAno, dataIniMes, dataIniDia)
      let dataHoje = new Date(this.dNow.getFullYear(), (this.dNow.getMonth() + 1), this.dNow.getDate())

      if (dataInputIni < dataHoje) {
        swal({
          icon: "error",
          text: "Data da atividade já passou!",
          timer: 1000,
          buttons: {
            buttons: false
          }
        });
        setTimeout(() => {
          this.reiniciar()
        }, 600)
      } else {
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
            this.atv.cliente = '0';
            this.atv.datafim = "";
            this.atv.tipo = "";
            this.atv.ticket = '0';
            this.atv.org = '0';
            this.atv.position = 0;
            this.atv.horafim = "";
            this.atv.horaini = "";
            this.numm = "";
            this.getterActivity(false);

            setTimeout(() => {
              this.reiniciar()
            }, 600)
          },
          error => {
            this.getterActivity(false);
          },
        );
      }
    }


  }

  reiniciar() {
    location.reload()
  }

  // TRANSFORM CAPITAL LETTER
  maiuscula(value: string) {
    var v = value.toUpperCase();
    this.atv.assunto = v
  }

  // WORD FILTER
  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  // ALL FILTER
  filterAll() {
    this.getterActivity(false);
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
    const day = this.dNow.getDate();
    if (day <= 9) {
      this.dataSource.filter = this.today.trim().toLowerCase();
    } else {
      this.dataSource.filter = this.today1.trim().toLowerCase();
    }
  }

  // TOMORROW FILTER
  filterTomorrow() {
    const day = (this.dNow.getDate() + 1);
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
    console.log(this.dataSource);
    console.log(this.dayNextMonth.trim().toLowerCase());

    this.dataSource.filter = this.dayNextMonth.trim().toLowerCase();
  }

  // Muda status {feito} da atividade

  ChangeStatus(e) {

    this.conf.update = false;
    this.statusUpdate.id = e.source.id;
    this.statusUpdate.feito = e.checked;
    this.atv.feito = e.checked;

    this.UpdateStatusAtiv();
    this.getActivity(e.source.id);


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

  somethingChanged(e) {
    console.log('CAIU CHANGE')
    console.log(e);
    this.atv.vendedor = {id: e, user: { username: '' }};
    console.log(this.atv.vendedor)
  }
}
