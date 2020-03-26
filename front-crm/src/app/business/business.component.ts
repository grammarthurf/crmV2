import { Component, OnInit } from "@angular/core";
import { CrudService } from "../services/crud.service";
import { Router, Data } from "@angular/router";
import swal from 'sweetalert';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import * as Inputmask from "inputmask"

@Component({
  selector: "app-business",
  templateUrl: "./business.component.html",
  styleUrls: ["./business.component.css"]
})
export class BusinessComponent implements OnInit {

  dNow = new Date();
  selectedBusiness: any

  tickets1: any = { tickets: [], valor: '' };
  tickets2: any = { tickets: [], valor: '' };
  tickets3: any = { tickets: [], valor: '' };
  tickets4: any = { tickets: [], valor: '' };
  tickets5: any = { tickets: [], valor: '' };
  tickets6: any = { tickets: [], valor: '' };
  tickets7: any = { tickets: [], valor: '' };

  //Lista de Clientes
  clientesapi: any;

  disableCode: boolean = false;

  //Lista de Produtos
  produtosapi: any;
  produto: any = { nome: '', codigo: '' };
  vendedorExt: any = { nome: '' }
  vendedorextapi: any;

  // Lista de Orgs:
  orsgapi: any;
  orgapi: any;

  // Lista de estagios:
  estagiosapi: any;
  erroEstagio: any;

  // Lista de atividades:
  atividadesapi: any;
  erroAtividade: any;

  //Lista de Vendedores
  userapi: any;

  // Lista de tickets:
  ticketsapi: any;
  erroTicket: any;

  selectedTicket: any;

  values = '';

  ticket = { titulo: "", estagio: '', cliente: '', org: '', produto: '', valorestimado: 0, termometro: '', vendedor: '', obs: '', vendext: '' };

  today = this.dNow.getFullYear() + '-0' + (this.dNow.getMonth() + 1) + '-0' + this.dNow.getDate();
  today1 = this.dNow.getFullYear() + '-0' + (this.dNow.getMonth() + 1) + '-' + this.dNow.getDate();

  calendarPlugins: any = [];
  
  // Lottie:
  public lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 1;

  constructor(private crudService: CrudService, private router: Router) {

    this.lottieConfig = {
      path: 'assets/handshake.json',
      renderer: 'canvas',
      autoplay: false,
      loop: false
    };

  }

  // GENERATE CODE
  code1: any;
  generateCode1() {
    var a = this.produtosapi;
    if (a.length > 0) {
      if (a.length < 9) {
        this.code1 = "00" + ++this.produtosapi[0].codigo;
        this.produto.codigo = this.code1;
      } else if (a.length < 99) {
        this.code1 = "0" + ++this.produtosapi[0].codigo;
        this.produto.codigo = this.code1;
      } else {
        this.code1 = ++this.produtosapi[0].codigo;
        this.produto.codigo = this.code1;
      }
    } else {
      this.code1 = "00" + 1;
      this.produto.codigo = this.code1;
    }
    this.disableCode = true;

  }

  // SAVE PRODUCT
  saveProduto() {
    this.crudService.saveNewProduto(this.produto).subscribe(
      data => {
        swal({
          icon: "success",
          text: "Produto criado com sucesso!",
          timer: 1300,
          buttons: {
            buttons: false
          }
        });
        this.getterProd();
        this.disableCode = false;
      },
      error => { }
    );
  }

  // GET EXTERNAL SELLER
  getterVendedorExt() {
    this.crudService.getVendedorExt().subscribe(
      data => {
        this.vendedorextapi = data;
        console.log('vendedor externo')
      },
      error => {
        this.erroAtividade = error;
      }
    );
  }

  // SAVE EXTERNAL SELLER
  saveVendedorExt() {
    this.crudService.saveNewVendedorExt(this.vendedorExt).subscribe(
      data => {
        this.getterVendedorExt();
      },
      error => { }
    );
  }

  // FILTRAR SELECT DOS CONTATOS DE ACORDO COM O SELECIONADO EM EMPRESAS
  gettercliorg(id) {
    this.crudService.getOrg(id).subscribe(
      data => {
        this.orgapi = data;
      },
      error => {
        this.erroAtividade = error;
      }
    );
  }

  dataCheck(dataini) {
    var year = this.dNow.getFullYear();
    var month = this.dNow.getMonth() + 1;
    var day = this.dNow.getDate();

    var year1 = dataini.substring(0, 4);
    var month1 = dataini.substring(5, 7);
    var day1 = dataini.substring(8, 10);

    if (year > year1 ||
      (year == year1 && month > month1) ||
      (year == year1 && month == month1 && day > day1)) {
      return true;
    } else {
      return false;
    }
  }

  Array(atv) {
    var length = atv.length;
    var n = 0;
    if (length == 1) {
      var r = this.dataCheck(atv[n].dataini);
      return r;
    } else if (length >= 2) {
      var i;
      for (i = 0; i < length; i++) {
        n++;
        var dates = atv[n - 1].dataini;
        var r = this.dataCheck(dates);
        if (r === false) {
          r = this.dataCheck(dates);
        } else if (r === true) {
          return true;
        }
      }
    }
  }

  // CALC ALL VALUES FROM STAGE
  calcAllValue() {
    const listaTicketslist: any = [this.tickets1, this.tickets2, this.tickets3, this.tickets4,
    this.tickets5, this.tickets6, this.tickets7]

    listaTicketslist.forEach(e => {
      this.calcValueStage(e);
    });
  }

  calcValueStage(ticketest) {
    let i = 0;
    ticketest.valor = i;
    ticketest.tickets.forEach(e => {
      i += e.valorestimado;
    });

    ticketest.valor = i;
  }

  // SHOW LEADS OPEN
  showOpen() {
    this.getterTickets('open');
    this.getterTickets('win');
  }

  // SHOW LEADS LOSE
  showLose() {
    this.getterTickets('lose');
  }

  // LOTTIE ANIMATION
  handleAnimation(anim: any) {
    this.anim = anim;
  };

  // STOP ANIMATION
  stop() {
    this.anim.stop();
  }

  // PLAY ANIMATION
  play() {
    this.anim.play();
  }

  // PAUSE ANIMATION
  pause() {
    this.anim.pause();
  }

  // SET SPEED ANIMATION
  setSpeed(speed: number) {
    this.animationSpeed = speed;
    this.anim.setSpeed(speed);
  }

  // TRANSFORM CAPITAL LETTER
  maiuscula(value: string, id: number) {
    var v = value.toUpperCase();

    if (id == 2) {
      this.ticket.obs = v;
    } else if (id == 1) {
      this.ticket.titulo = v;
    } else if (id == 3) {
      this.produto.nome = v;
    } else if (id == 4) {
      this.vendedorExt.nome = v;
    }
  }

  // UPDATE LEADS
  updatedTicket(id, ticket) {
    this.calcAllValue();
    this.crudService.updateTicket(id, ticket).subscribe(
      data => {
        this.calcAllValue();
      }, error => { }
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

  // GET USER
  getterUser() {
    this.crudService.getVendedor().subscribe(
      data => {
        this.userapi = data;
      },
      error => { }
    );
  }

  // GET PRODUCT
  getterProd() {
    this.crudService.getProdutos().subscribe(
      data => {
        this.produtosapi = data;
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

  // GET ACTIVITY
  getterAtividades(id) {
    this.crudService.getAtividades(id).subscribe(
      data => {
        this.atividadesapi = data;
      },
      error => {
        this.erroAtividade = error;
      }
    );
  }

  // GET STAGE
  getterEstagios() {
    this.crudService.getEstagios().subscribe(
      data => {
        this.estagiosapi = data;
      },
      error => {
        this.erroEstagio = error;
      }
    );
  }

  // GET LEADS
  getterTickets(status) {

    if (status == undefined || status == 'open') {
      this.tickets1.tickets = [];
      this.tickets2.tickets = [];
      this.tickets3.tickets = [];
      this.tickets4.tickets = [];
      this.tickets5.tickets = [];
      this.tickets6.tickets = [];
      this.tickets7.tickets = [];
      this.crudService.getTickets().subscribe(
        data => {
          this.ticketsapi = data;
          data.forEach(e => {

            if (e.status == 'Aberto') {
              switch (e.estagio.id) {

                case 1:
                  this.tickets1.tickets.push(e);
                  break;

                case 2:
                  this.tickets2.tickets.push(e);
                  break;

                case 3:
                  this.tickets3.tickets.push(e);
                  break;

                case 4:
                  this.tickets4.tickets.push(e);
                  break;

                case 5:
                  this.tickets5.tickets.push(e);
                  break;

                case 7:
                  this.tickets6.tickets.push(e);
                  break;

                case 8:
                  this.tickets7.tickets.push(e);
                  break;

                default:
                  break;
              }
              this.calcAllValue();
            }
          });
        },
        error => {
          this.erroTicket = error;
        }
      );
    }

    if (status == 'lose') {
      this.tickets1.tickets = [];
      this.tickets2.tickets = [];
      this.tickets3.tickets = [];
      this.tickets4.tickets = [];
      this.tickets5.tickets = [];
      this.tickets6.tickets = [];
      this.tickets7.tickets = [];
      this.crudService.getTickets().subscribe(
        data => {
          this.ticketsapi = data;
          console.log('data', data);
          data.forEach(e => {

            if (e.status == 'Perdido') {
              switch (e.estagio.id) {
                case 1:
                  this.tickets1.tickets.push(e);
                  break;

                case 2:
                  this.tickets2.tickets.push(e);
                  break;

                case 3:
                  this.tickets3.tickets.push(e);
                  break;

                case 4:
                  this.tickets4.tickets.push(e);
                  break;

                case 5:
                  this.tickets5.tickets.push(e);
                  break;

                case 7:
                  this.tickets6.tickets.push(e);
                  break;

                case 8:
                  this.tickets7.tickets.push(e);
                  break;

                default:
                  break;
              }
              this.calcAllValue();
            }
          });
        },
        error => {
          this.erroTicket = error;
        }
      );
    }

    if (status == 'win') {
      this.tickets1.tickets = [];
      this.tickets2.tickets = [];
      this.tickets3.tickets = [];
      this.tickets4.tickets = [];
      this.tickets5.tickets = [];
      this.tickets6.tickets = [];
      this.tickets7.tickets = [];
      this.crudService.getTickets().subscribe(
        data => {
          this.ticketsapi = data;
          data.forEach(e => {

            if (e.status == 'Ganhou') {

              switch (e.estagio.id) {
                case 1:
                  this.tickets1.tickets.push(e);
                  break;

                case 2:
                  this.tickets2.tickets.push(e);
                  break;

                case 3:
                  this.tickets3.tickets.push(e);
                  break;

                case 4:
                  this.tickets4.tickets.push(e);
                  break;

                case 5:
                  this.tickets5.tickets.push(e);
                  break;

                case 7:
                  this.tickets6.tickets.push(e);
                  break;

                case 8:
                  this.tickets7.tickets.push(e);
                  break;

                default:
                  break;
              }
              this.calcAllValue();
            }
          });
        },
        error => {
          this.erroTicket = error;
        }
      );
    }
  }

  // SAVE LEADS
  save() {
    let title = this.ticket.titulo;
    let org = this.ticket.org;
    let value = this.ticket.valorestimado;
    let product = this.ticket.produto;
    let therm = this.ticket.termometro;
    let contact = this.ticket.cliente;
    let stage = this.ticket.estagio;
    let vendedor = this.ticket.vendedor;

    if (title === '' || org === '' || value === 0 || product === '' || therm === '' || contact === '' || stage === '' || vendedor === '') {
      swal({
        icon: "error",
        text: "Todos os campos são obrigatórios!",
        timer: 1800,
        buttons: {
          buttons: false
        }
      });
    } else {
      this.crudService.saveNewTicket(this.ticket).subscribe(
        data => {
          swal({
            icon: "success",
            text: "Lead criada com sucesso!",
            timer: 1800,
            buttons: {
              buttons: false
            }
          });
          this.getterEstagios();
          this.ticket.titulo = "";
          this.ticket.termometro = "50";
          this.ticket.produto = "";
          this.ticket.valorestimado = 0;
          this.ticket.org = "";
          this.ticket.cliente = "";
          this.ticket.vendedor = "";
          this.ticket.obs = "";
          this.getterTickets('open');
          this.getterTickets('win');
        },
        error => {
          this.getterEstagios();
          this.getterTickets('open');
          this.getterTickets('win');
        }
      );
    }
  }

  // REDIRECT TO BUSINESS DETAIL SCREEN
  goTo(id) {
    this.router.navigate([`/business-detail/${id}`]);
  }

  // REDIRECT TO ACTIVITY
  goToAtv() {
    this.router.navigate([`/activity/`]);
  }

  // DRAG AND DROP LEADS
  drop(event: CdkDragDrop<string[]>) {
    console.log('qualquer coisa')
    this.calcAllValue();
    if (event.distance.x > 600) {
      this.calcAllValue();
      this.play();
      setTimeout(() => {
        this.stop()
      }, 4000);
    }

    this.ticketsapi.forEach(e => {
      if (e.id == event.item.element.nativeElement.id) {
        this.selectedBusiness = e;
      }
    });

    switch (event.container.id) {

      case 'cdk-drop-list-6':
        console.log('8');
        this.updatedTicket(8, this.selectedBusiness)
        this.calcAllValue();
        break;

      case 'cdk-drop-list-5':
        console.log('7');
        this.updatedTicket(7, this.selectedBusiness)
        this.calcAllValue();
        break;

      case 'cdk-drop-list-4':
        console.log('6');
        this.updatedTicket(5, this.selectedBusiness)
        this.calcAllValue();
        break;

      case 'cdk-drop-list-3':
        console.log('5');
        this.updatedTicket(4, this.selectedBusiness)
        this.calcAllValue();
        break;

      case 'cdk-drop-list-2':
        console.log('4');
        this.updatedTicket(3, this.selectedBusiness)
        this.calcAllValue();
        break;

      case 'cdk-drop-list-1':
        console.log('3');
        this.updatedTicket(2, this.selectedBusiness)
        this.calcAllValue();
        break;

      case 'cdk-drop-list-0':
        console.log('1');
        this.updatedTicket(1, this.selectedBusiness)
        this.calcAllValue();
        break;

      default:
        break;
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  exitCreateLead() {
    this.ticket.titulo = '';
    this.ticket.org = '';
    this.ticket.valorestimado = 0;
    this.ticket.produto = '';
    this.ticket.termometro = '50';
    this.ticket.cliente = '';
    this.ticket.estagio = '';
    this.ticket.vendedor = '';
    this.ticket.obs = ''
  }

  // REDIRECT PAGE
  redirectToAdd(url): void {
    window.open(url);
    window.focus();
  }

  reloadpage(){
    location.reload()
  }

  ngOnInit() {
    this.getterVendedorExt();
    this.getterEstagios();
    this.getterTickets('open');
    this.getterTickets('win');
    this.getterOrgs();
    this.getterProd();
    this.getterCliente();
    this.getterUser();
    if (!localStorage.getItem('token')) {
      this.reloadpage();
    }

    Inputmask().mask(document.getElementById("value"));
    this.ticket.termometro = "50";
  }

  // FORMAT NUMBER BR
  formatNumberBR(value) {
    let result = value.format('0.0,')
    return result
  }

}
