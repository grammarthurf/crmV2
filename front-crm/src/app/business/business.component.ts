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
  produto: any = { nome: '', codigo: ''};
  vendedorExt: any = {nome: ''}
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

  ticket = { titulo: "", estagio: '', cliente: '', org: '', produto: '', valorestimado: 0, termometro: '', vendedor: '', obs: '' };

  today = this.dNow.getFullYear() + '-0' + (this.dNow.getMonth() + 1) + '-0' + this.dNow.getDate();
  today1 = this.dNow.getFullYear() + '-0' + (this.dNow.getMonth() + 1) + '-' + this.dNow.getDate();

  // Lottie:
  public lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 1;

  constructor(private crudService: CrudService, private router: Router) {
    this.getterEstagios();
    this.getterTickets('open');
    this.getterTickets('win');
    //this.getterAtividades(this.orsgapi.id);
    this.getterOrgs();
    this.getterProd();
    this.getterCliente();
    this.getterUser();

    this.lottieConfig = {
      path: 'assets/handshake.json',
      renderer: 'canvas',
      autoplay: false,
      loop: false
    };
  }

  code1: any;
  generateCode1() {
    
    var a = this.produtosapi;
    if(a.length > 0){
      if(a.length < 9){
        this.code1 = "00" + ++this.produtosapi[0].codigo;
        this.produto.codigo = this.code1;
      } else if (a.length < 99){
        this.code1 = "0" + ++this.produtosapi[0].codigo;
        this.produto.codigo = this.code1;
      } else {
        this.code1 = ++this.produtosapi[0].codigo;
        this.produto.codigo = this.code1;
      }
    } else {
      this.code1 = "00"+1;
      this.produto.codigo = this.code1;
    }
    this.disableCode = true;

  }

  saveProduto(){
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
        console.log(data);

      },
      error => {

        console.error(error);
      }
    );

  }

  getterVendedorExt() {
    this.crudService.getVendedorExt().subscribe(
      data => {
        this.vendedorextapi = data;
        console.log(data);
      },
      error => {
        this.erroAtividade = error;
      }
    );
  }

  saveVendedorExt(){
      this.crudService.saveNewVendedorExt(this.vendedorExt).subscribe(
        data => {
          console.log(data);
          this.getterVendedorExt();
        },
        error => {
          console.error(error);
        }
      );
  }

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

    var year = this.dNow.getFullYear();
    var month = this.dNow.getMonth()+1;
    var day = this.dNow.getDate();

    var year1 = dataini.substring(0,4);
    var month1 = dataini.substring(5,7);
    var day1 = dataini.substring(8,10);


    if(year > year1 || 
      (year == year1 && month > month1) || 
      (year == year1 && month == month1 && day > day1) ){
      return true;
    } else {
      return false;
    }
  }

  Array(atv){

    var length = atv.length;

    var n = 0;

    if(length == 1){

      var r = this.dataCheck(atv[n].dataini);
      return r;

    } else if (length >= 2){

      var i;
      for (i=0; i<length; i++) {
        n++; 
        var dates = atv[n-1].dataini;
        var r = this.dataCheck(dates);
        console.log(r)

        if (r === false) {
          r = this.dataCheck(dates);
        } else if (r === true) {
          return true;
        }
      }
    } 
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

  getterUser() {
    this.crudService.getVendedor().subscribe(
      data => {
        this.userapi = data;
        console.log(this.userapi);

      },
      error => {
        console.error(error);
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

  getterAtividades(id) {
    this.crudService.getAtividades(id).subscribe(
      data => {
        this.atividadesapi = data;
        console.log("atividadesapi" + data);

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
              //this.getterAtividades(e.id);
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
              //this.getterAtividades(e.id);
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
              //this.getterAtividades(e.id);
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
    let vendedor = this.ticket.vendedor;

    if(title === '' || org === '' || value === 0 || product === '' || therm === '' || contact === '' || stage === '' || vendedor === '') {
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
          this.getterTickets('win');
          console.log(data);
          // setTimeout(this.reiniciar, 1001);
        },
        error => {
          this.getterEstagios();
          this.getterTickets('open');
          this.getterTickets('win');
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

  goToAtv(){
    this.router.navigate([`/activity/`]);
  }
  // goToAtv(title){
  //   this.router.navigate([`/activity/${title}`]);
  // }

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
    this.ticket.termometro = "50";
  }

  formatNumberBR(value) {
    let result = value.format('0.0,')

    return result
  }

}