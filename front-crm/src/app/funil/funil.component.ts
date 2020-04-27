import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-funil',
  templateUrl: './funil.component.html',
  styleUrls: ['./funil.component.css']
})
export class FunilComponent implements OnInit {
  @Input() showSidebar: boolean = false;

  @Output() situationSidebar = new EventEmitter();

  ticket: {
    id: string;
    // titulo: string;
    empresa: string;
    product: Array<object>[];
    estagio: object;
    valorestimado: number;
    termometro: string;
    vendedor: object;
    status: string;
    atividades: Array<object>[]
  }

  tickets: any = [{
    id: 1,
    // titulo: 'ROSINA PORTAS - VEDOIS OEE',
    empresa: '1',
    product: [{ id: 1, title: 'Vedois OEE' }, { id: 2, title: 'Vedois CRM' }, { id: 3, title: 'Vedois Saúde' }, { id: 4, title: 'Vedois Planejamento' }],
    estagio: { id: 1 },
    valorestimado: 3500,
    termometro: { value: '0', text: 'Regular' },
    vendedor: { id: 0, user: { username: 'Arthur' } },
    status: 'Ganhou',
    atividades: [{ id: 0 }, { id: 1 }]

  }, {
    id: 1,
    // titulo: 'ROSINA PORTAS - VEDOIS OEE',
    empresa: '2',
    product: [{ id: 1, title: 'Vedois OEE' }, { id: 2, title: 'Vedois CRM' }, { id: 3, title: 'Vedois Saúde' }, { id: 4, title: 'Vedois Planejamento' }],
    estagio: { id: 2 },
    valorestimado: 3500,
    termometro: { value: '50', text: 'Bom' },
    vendedor: { id: 0, user: { username: 'Arthur' } },
    status: 'Aberto',
    atividades: [{ id: 0 }, { id: 1 }]

  }, {
    id: 1,
    // titulo: 'ROSINA PORTAS - VEDOIS OEE',
    empresa: '3',
    product: [{ id: 1, title: 'Vedois OEE' }, { id: 2, title: 'Vedois CRM' }, { id: 3, title: 'Vedois Saúde' }, { id: 4, title: 'Vedois Planejamento' }],
    estagio: { id: 3 },
    valorestimado: 15000,
    termometro: { value: '100', text: 'Ótimo' },
    vendedor: { id: 0, user: { username: 'Arthur' } },
    status: 'Aberto',
    atividades: [{ id: 0 }, { id: 1 }]
  }, {
    id: 1,
    // titulo: 'ROSINA PORTAS - VEDOIS OEE',
    empresa: '4',
    product: [{ id: 1, title: 'Vedois OEE' }, { id: 2, title: 'Vedois CRM' }, { id: 3, title: 'Vedois Saúde' }, { id: 4, title: 'Vedois Planejamento' }, { id: 5, title: 'Vedois Logística' }],
    estagio: { id: 4 },
    valorestimado: 3500,
    termometro: { value: '0', text: 'Regular' },
    vendedor: { id: 0, user: { username: 'Arthur' } },
    status: 'Aberto',
    atividades: [{ id: 0 }, { id: 1 }]

  }, {
    id: 1,
    // titulo: 'ROSINA PORTAS - VEDOIS OEE',
    empresa: '5',
    product: [{ id: 1, title: 'Vedois OEE' }, { id: 2, title: 'Vedois CRM' }, { id: 3, title: 'Vedois Saúde' }, { id: 4, title: 'Vedois Planejamento' }],
    estagio: { id: 5 },
    valorestimado: 10000,
    termometro: { value: '0', text: 'Regular' },
    vendedor: { id: 0, user: { username: 'Arthur' } },
    status: 'Aberto',
    atividades: [{ id: 0 }, { id: 1 }]

  }, {
    id: 1,
    // titulo: 'ROSINA PORTAS - VEDOIS OEE',
    empresa: '6',
    product: [{ id: 1, title: 'Vedois OEE' }, { id: 2, title: 'Vedois CRM' }, { id: 3, title: 'Vedois Saúde' }, { id: 4, title: 'Vedois Planejamento' }],
    estagio: { id: 6 },
    valorestimado: 0,
    termometro: { value: '50', text: 'Bom' },
    vendedor: { id: 0, user: { username: 'Arthur' } },
    status: 'Aberto',
    atividades: [{ id: 0 }, { id: 1 }]

  }, {
    id: 1,
    // titulo: 'ROSINA PORTAS - VEDOIS OEE',
    empresa: '7',
    product: [{ id: 1, title: 'Vedois OEE' }, { id: 2, title: 'Vedois CRM' }, { id: 3, title: 'Vedois Saúde' }, { id: 4, title: 'Vedois Planejamento' }],
    estagio: { id: 7 },
    // valorestimado: 50000,
    termometro: { value: '50', text: 'Bom' },
    vendedor: { id: 0, user: { username: 'Arthur' } },
    status: 'Perdido',
    atividades: [{ id: 0 }, { id: 1 }]

  },];

  // Funil:
  contatado: any = { tickets: [], valor: '' };
  clienteP: any = { tickets: [], valor: '' };
  demoA: any = { tickets: [], valor: '' };
  proposta: any = { tickets: [], valor: '' };
  negociaI: any = { tickets: [], valor: '' };



  // Status:

  prospecao: any = { tickets: [], valor: '' };
  ganhas: any = { tickets: [], valor: '' };
  perdidas: any = { tickets: [], valor: '' };


  constructor() {
    this.getTickets();
  }

  // CALC ALL VALUES FROM STAGE
  calcAllValue() {
    const listaTicketslist: any = [this.contatado, this.clienteP, this.demoA, this.proposta,
    this.negociaI]

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

  getTickets() {
    this.tickets.forEach(ticket => {
      if (ticket.status == 'Aberto') {
        switch (ticket.estagio.id) {
          case 1:
            this.prospecao.tickets.push(ticket);
            break;
          case 2:
            this.contatado.tickets.push(ticket);
            break;
          case 3:
            this.clienteP.tickets.push(ticket);
            break;
          case 4:
            this.demoA.tickets.push(ticket);
            break;
          case 5:
            this.proposta.tickets.push(ticket);
            break;
          case 6:
            this.negociaI.tickets.push(ticket);
            break;
          case 7:
            this.ganhas.tickets.push(ticket);
            break;
          default:
            break;
        }
        this.calcAllValue();
      } else if (ticket.status === 'Ganhou') {
        this.ganhas.tickets.push(ticket);
      } else if (ticket.status === 'Perdido') {
        this.perdidas.tickets.push(ticket);
      }

      // ticket.product.forEach(product => {
      //   this.tickets.product = product.title.replace('Vedois', '');
      //   console.log(this.tickets.product)
      // })


    });
    console.log(this.perdidas.tickets);
    console.log('CONTATADO:', this.contatado)

  }

  cutVedois(word) {
    const newWord = word.replace('Vedois', ' ');
    return newWord;
  }



  // DRAG AND DROP LEADS
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  redirectToAdd(url): void {
    window.open(url);
    window.focus();
  }

  onClick() {
    this.showSidebar = !this.showSidebar;
    this.situationSidebar.emit({ situation: this.showSidebar })
  }

  ngOnInit() {

  }

}
