import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-leads-perdidas',
  templateUrl: './leads-perdidas.component.html',
  styleUrls: ['./leads-perdidas.component.css']
})
export class LeadsPerdidasComponent implements OnInit {

  ticket: {
    id: string;
    empresa: string;
    product: Array<object>[];
    estagio: object;
    valorestimado: number;
    termometro: string;
    vendedor: object;
    status: string;
    atividades: Array<object>[]
  }

  tickets: any = [
    {
      id: 1,
      empresa: 'VEDOIS TECNOLOGIA',
      product: [{ id: 1, title: 'Vedois OEE' }, { id: 2, title: 'Vedois CRM' }, { id: 3, title: 'Vedois Saúde' }, { id: 4, title: 'Vedois Planejamento' }],
      estagio: { id: 1 },
      valorestimado: 3500,
      termometro: { value: '0', text: 'Regular' },
      vendedor: { id: 1, user: { username: 'Clayton' } },
      status: 'Aberto',
      atividades: [{ id: 0 }, { id: 1 }]
    },
    {
      id: 2,
      empresa: 'VEDOIS TECNOLOGIA',
      product: [{ id: 1, title: 'Vedois OEE' }, { id: 2, title: 'Vedois CRM' }, { id: 3, title: 'Vedois Saúde' }, { id: 4, title: 'Vedois Planejamento' }],
      estagio: { id: 2 },
      valorestimado: 3500,
      termometro: { value: '50', text: 'Bom' },
      vendedor: { id: 2, user: { username: 'Gisela' } },
      status: 'Aberto',
      atividades: [{ id: 0 }, { id: 1 }]
    },
    {
      id: 3,
      empresa: 'VEDOIS TECNOLOGIA',
      product: [{ id: 1, title: 'Vedois OEE' }, { id: 2, title: 'Vedois CRM' }, { id: 3, title: 'Vedois Saúde' }, { id: 4, title: 'Vedois Planejamento' }],
      estagio: { id: 3 },
      valorestimado: 3500,
      termometro: { value: '100', text: 'Ótimo' },
      vendedor: { id: 3, user: { username: 'Jessica' } },
      status: 'Aberto',
      atividades: [{ id: 0 }, { id: 1 }]
    },
    {
      id: 4,
      empresa: 'VEDOIS TECNOLOGIA',
      product: [{ id: 1, title: 'Vedois OEE' }, { id: 2, title: 'Vedois CRM' }, { id: 3, title: 'Vedois Saúde' }, { id: 4, title: 'Vedois Planejamento' }],
      estagio: { id: 4 },
      valorestimado: 3500,
      termometro: { value: '100', text: 'Ótimo' },
      vendedor: { id: 4, user: { username: 'Fabiana' } },
      status: 'Aberto',
      atividades: [{ id: 0 }, { id: 1 }]
    },
    {
      id: 5,
      empresa: 'VEDOIS TECNOLOGIA',
      product: [{ id: 1, title: 'Vedois OEE' }, { id: 2, title: 'Vedois CRM' }, { id: 3, title: 'Vedois Saúde' }, { id: 4, title: 'Vedois Planejamento' }],
      estagio: { id: 4 },
      valorestimado: 3500,
      termometro: { value: '50', text: 'Bom' },
      vendedor: { id: 4, user: { username: 'Fabiana' } },
      status: 'Aberto',
      atividades: [{ id: 0 }, { id: 1 }]
    },
    {
      id: 6,
      empresa: 'VEDOIS TECNOLOGIA',
      product: [{ id: 1, title: 'Vedois OEE' }, { id: 2, title: 'Vedois CRM' }, { id: 3, title: 'Vedois Saúde' }, { id: 4, title: 'Vedois Planejamento' }],
      estagio: { id: 2 },
      valorestimado: 3500,
      termometro: { value: '0', text: 'Ruim' },
      vendedor: { id: 2, user: { username: 'Gisela' } },
      status: 'Aberto',
      atividades: [{ id: 0 }, { id: 1 }]
    }
  ];

  clayton: any = { tickets: [], valor: '' };
  gisela: any = { tickets: [], valor: '' };
  jessica: any = { tickets: [], valor: '' };
  fabiana: any = { tickets: [], valor: '' };

  constructor() {
    this.getTickets();
  }

  getTickets() {
    console.log(this.tickets)
    this.tickets.forEach(ticket => {
      console.log(ticket.empresa)
      if (ticket.status == 'Aberto') {
        switch (ticket.vendedor.id) {
          case 1:
            this.clayton.tickets.push(ticket);
            break;
          case 2:
            this.gisela.tickets.push(ticket);
            break;
          case 3:
            this.jessica.tickets.push(ticket);
            break;
          case 4:
            this.fabiana.tickets.push(ticket);
            break;
          default:
            break;
        }
      }
    });
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

  ngOnInit() {
  }

}
