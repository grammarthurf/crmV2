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

  //Lista de Produtos
  produtosapi: any;

  // Lista de Orgs:
  orsgapi: any;
  orgapi: any;

  // Lista de estagios:
  estagiosapi: any;
  erroEstagio: any;

  // Lista de atividades:
  atividadesapi: any;
  erroAtividade: any;

  // Lista de tickets:
  ticketsapi: any;
  erroTicket: any;

  selectedTicket: any;

  ticket = { titulo: "", estagio: '', cliente: '', org: '', produto: '', valorestimado: 0, termometro: '', vendedor: '', obs: '' };

  // Lottie:
  public lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 1;

  constructor(private crudService: CrudService, private router: Router) {
    this.getterEstagios();
    this.getterTickets('open');
    this.getterAtividades();
    this.getterOrgs();
    this.getterProd();
    this.getterCliente();

    this.lottieConfig = {
      path: 'assets/handshake.json',
      renderer: 'canvas',
      autoplay: false,
      loop: false
    };
  }

  // code1: any;
  // generateCode1() {
  //   let randomString = function (lenght) {
  //     let text = "";
  //     let possible = "0123456789"

  //     for (let i = 0; i < lenght; i++) {
  //       text += possible.charAt(Math.floor(Math.random() * possible.length));
  //     }
  //     return text;
  //   }

  //   this.code1 = randomString(3);
  //   this.produtosapi.codigo = this.code1;
  //   console.log(this.code1);
  // }

  //FILTRAR SELECT DOS CONTATOS DE ACORDO COM O SELECIONADO EM EMPRESAS
  gettercliorg(id) {
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

  dataCheck(dataini){
    //console.log( 'dataini: ' , dataini);

    return true;
  }

  calcAllValue() {
    const listaTicketslist: any = [this.tickets1, this.tickets2, this.tickets3, this.tickets4,
    this.tickets5, this.tickets6, this.tickets7]

    listaTicketslist.forEach(e => {
      this.calcValueestagio(e);
    });

    console.log(this.dNow);
  }

  calcValueestagio(ticketest) {
    // console.log('ticketque pegou: ', ticketest);
    let i = 0;
    ticketest.valor = i;
    // console.log( 'Tickets: '  , ticketest.tickets);
    ticketest.tickets.forEach(e => {
      // console.log('ENTROU');

      // console.log( 'Tickets: '  , e);

      i += e.valorestimado;
      // console.log(e.valorestimado);

    });

    // console.log(i);
    ticketest.valor = i;


  }

  showOpen() {
    this.getterTickets('open');
  }
  showWin() {
    this.getterTickets('win');
  }
  showLose() {
    this.getterTickets('lose');
  }
  // showExclude() {
  //   this.getterTickets('exclude');
  // }

  handleAnimation(anim: any) {
    this.anim = anim;
  };

  stop() {
    this.anim.stop();
  }

  play() {
    this.anim.play();
  }

  pause() {
    this.anim.pause();
  }

  setSpeed(speed: number) {
    this.animationSpeed = speed;
    this.anim.setSpeed(speed);
  }

  updatedTicket(id, ticket) {
    this.calcAllValue();
    this.crudService.updateTicket(id, ticket).subscribe(
      data => {
        this.calcAllValue();
        console.log(data);
      }, error => {
        console.error(error);
      }
    )
  }

  getterCliente() {
    this.crudService.getClientes().subscribe(
      data => {
        this.clientesapi = data;
        console.log(data);
      },
      error => {
        this.erroAtividade = error;
      }
    );
  }

  getterProd() {
    this.crudService.getProdutos().subscribe(
      data => {
        this.produtosapi = data;
        console.log(data);
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
        console.log(data);
      },
      error => {
        this.erroAtividade = error;
      }
    );
  }

  getterAtividades() {
    this.crudService.getAtividade().subscribe(
      data => {
        this.atividadesapi = data;
        console.log(data);
      },
      error => {
        this.erroAtividade = error;
      }
    );
  }

  getterEstagios() {
    this.crudService.getEstagios().subscribe(
      data => {
        this.estagiosapi = data;
        console.log(data);
      },
      error => {
        this.erroEstagio = error;
        console.error(error);
      }
    );
  }

  removeAllArray(array) {
    array = []
  }

  getterTickets(status) {
    console.log('status: ', status);

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
          console.log('data', data);
          data.forEach(e => {
            console.log(e.status);

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
          // this.showOpen();
          console.log('tickets 1: ', this.tickets1, 'tickets 2: ', this.tickets2, 'tickets 3: ', this.tickets3, 'tickets 4: ', this.tickets4, 'tickets 5: ', this.tickets5, 'tickets 6: ', this.tickets6, 'tickets 7: ', this.tickets7);
        },
        error => {
          this.erroTicket = error;
          console.error(error);
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
          console.log('tickets 1: ', this.tickets1, 'tickets 2: ', this.tickets2, 'tickets 3: ', this.tickets3, 'tickets 4: ', this.tickets4, 'tickets 5: ', this.tickets5, 'tickets 6: ', this.tickets6, 'tickets 7: ', this.tickets7);
          // this.showOpen();
        },
        error => {
          this.erroTicket = error;
          console.error(error);
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
          console.log('data', data);
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
          // this.showOpen();
          console.log('tickets 1: ', this.tickets1, 'tickets 2: ', this.tickets2, 'tickets 3: ', this.tickets3, 'tickets 4: ', this.tickets4, 'tickets 5: ', this.tickets5, 'tickets 6: ', this.tickets6, 'tickets 7: ', this.tickets7);

        },
        error => {
          this.erroTicket = error;
          console.error(error);
        }
      );
    }


  }

  save() {
    console.log(this.ticket);
    let title = this.ticket.titulo;
    let org = this.ticket.org;
    let value = this.ticket.valorestimado;
    let product = this.ticket.produto;
    let therm = this.ticket.termometro;
    let contact = this.ticket.cliente;
    let stage = this.ticket.estagio;
    let valor = this.ticket.valorestimado

    if(title === '' || org === '' || value === 0 || product === '' || therm === '' || contact === '' || stage === '') {
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
          this.getterTickets('open');
          console.log(data);
          // setTimeout(this.reiniciar, 1001);
        },
        error => {
          this.getterEstagios();
          this.getterTickets('open');
          console.error(error);
        }
      );
    }
  }

  // reiniciar(){
  //   location.reload()
  // }

  goTo(id) {
    this.router.navigate([`/business-detail/${id}`]);
  }

  drop(event: CdkDragDrop<string[]>) {
    this.calcAllValue();
    console.log('EVENTO:', event);
    if (event.distance.x > 600) {
      this.calcAllValue();
      console.log('CHAMOU ARTHUR ');
      this.play();
      setTimeout(() => {
        this.stop()
        console.log('funcionou')
      }, 4000);
    }
    this.ticketsapi.forEach(e => {
      if (e.id == event.item.element.nativeElement.id) {
        this.selectedBusiness = e;
        console.log('selecionado', this.selectedBusiness);
      }
    });

    console.log(event.item.element.nativeElement.id);
    console.log(event.container.id);

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

    // this.updatedTicket()
    console.log(event.previousContainer);
    console.log(event.container);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log(event.previousContainer);
      console.log(event.container);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  redirectToAdd(url): void {
    window.open(url, '_blank');
    window.focus();
  }

  ngOnInit() {
    Inputmask().mask(document.getElementById("value"));

  }

  formatNumberBR(value) {
    let result = value.format('0.0,')

    return result
  }

}
