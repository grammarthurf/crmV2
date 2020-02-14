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

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

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

  ticket = { titulo: "", estagio: '', cliente: '', org: '', produto: '', valorestimado: '', termometro: '', vendedor: '', obs: '' };

  constructor(private crudService: CrudService, private router: Router) {
    this.getterEstagios();
    this.getterTickets();
    this.getterAtividades();
    this.getterOrgs();
    this.getterProd();
    this.getterCliente();



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
    console.log(event.previousContainer);
    console.log(event.container);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log(event.previousContainer);
      console.log(event.container);
      console.log(this.todo);
      console.log(this.done);
    } else {
      console.log(this.todo);
      console.log(this.done);
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }


  ngOnInit() {
  }

}
