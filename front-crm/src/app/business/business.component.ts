import { Component, OnInit } from "@angular/core";
import { CrudService } from "../services/crud.service";
import { Router } from "@angular/router";
import swal from 'sweetalert';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: "app-business",
  templateUrl: "./business.component.html",
  styleUrls: ["./business.component.css"]
})
export class BusinessComponent implements OnInit {

  selectedBusiness: any

  tickets1: any = [];
  tickets3: any = [];
  tickets4: any = [];
  tickets5: any = [];
  tickets6: any = [];
  tickets7: any = [];
  tickets8: any = [];

  //Lista de Clientes
  clientesapi: any;

  //Lista de Produtos
  produtosapi: any;

  // Lista de Orgs:
  orsgapi: any;

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

  ticket = { titulo: "", estagio: '', cliente: '', org: '', produto: '', valorestimado: '', termometro: '', vendedor: '', obs: '' };

  // Lottie:

  public lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 1;

  constructor(private crudService: CrudService, private router: Router) {
    this.getterEstagios();
    this.getterTickets();
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

  showOpen() {
    this.tickets1.forEach(ticket => {
      console.log(ticket.status);
    });
    this.tickets3.forEach(ticket => {
      console.log(ticket.status);
    });
    this.tickets4.forEach(ticket => {
      console.log(ticket.status);
    });
    this.tickets5.forEach(ticket => {
      console.log(ticket.status);
    });
    this.tickets6.forEach(ticket => {
      console.log(ticket.status);
    });
    this.tickets7.forEach(ticket => {
      console.log(ticket.status);
    });
    this.tickets8.forEach(ticket => {
      console.log(ticket.status);
    });
  }

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
    this.crudService.updateTicket(id, ticket).subscribe(
      data => {
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

  getterTickets() {
    this.crudService.getTickets().subscribe(
      data => {
        this.ticketsapi = data;
        console.log('data', data);
        data.forEach(e => {
          switch (e.estagio.id) {
            case 1:
              this.tickets1.push(e);
              break;
            case 3:
              this.tickets3.push(e);
              break;
            case 4:
              this.tickets4.push(e);
              break;
            case 5:
              this.tickets5.push(e);
              break;
            case 6:
              this.tickets6.push(e);
              break;
            case 7:
              this.tickets7.push(e);
              break;
            case 8:
              this.tickets8.push(e);
              break;
            default:
              break;
          }
        });
        this.showOpen();
      },
      error => {
        this.erroTicket = error;
        console.error(error);
      }
    );
  }

  save() {
    console.log(this.ticket);
    let title = this.ticket.titulo;
    let stage = this.ticket.estagio;

    if (title === '' && stage === '') {
      swal({
        icon: "error",
        text: "Título e Estágio não preenchido!",
        timer: 1800,
        buttons: {
          buttons: false
        }
      });
    } else if (stage === '') {
      swal({
        icon: "error",
        text: "Estágio não preenchido!",
        timer: 1800,
        buttons: {
          buttons: false
        }
      });
    } else if (title === '') {
      swal({
        icon: "error",
        text: "Título não preenchido!",
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
            text: "Produto salvo com sucesso!",
            timer: 1800,
            buttons: {
              buttons: false
            }
          });
          this.getterEstagios();
          this.getterTickets();
          console.log(data);
        },
        error => {
          this.getterEstagios();
          this.getterTickets();
          console.error(error);
        }
      );
    }
  }

  goTo(id) {
    this.router.navigate([`/business-detail/${id}`]);
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log('EVENTO:', event);
    if (event.distance.x > 600) {
      console.log('CHAMOU ARTHUR ');
      this.play();
      setTimeout(() => {
        this.stop()
        console.log('funcionou')
      }, 4500);
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
        break;
      case 'cdk-drop-list-5':
        console.log('7');
        this.updatedTicket(7, this.selectedBusiness)
        break;
      case 'cdk-drop-list-4':
        console.log('6');
        this.updatedTicket(6, this.selectedBusiness)
        break;
      case 'cdk-drop-list-3':
        console.log('5');
        this.updatedTicket(5, this.selectedBusiness)
        break;
      case 'cdk-drop-list-2':
        console.log('4');
        this.updatedTicket(4, this.selectedBusiness)
        break;
      case 'cdk-drop-list-1':
        console.log('3');
        this.updatedTicket(3, this.selectedBusiness)
        break;
        case 'cdk-drop-list-0':
          console.log('1');
          this.updatedTicket(1, this.selectedBusiness)
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
  
  ngOnInit() {
  }
}
