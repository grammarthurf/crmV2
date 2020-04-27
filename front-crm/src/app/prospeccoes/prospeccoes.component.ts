import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-prospeccoes',
  templateUrl: './prospeccoes.component.html',
  styleUrls: ['./prospeccoes.component.css']
})
export class ProspeccoesComponent implements OnInit {

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
    empresa: 'VEDOIS TECNOLOGIA',
    product: { id: 1, title: 'Vedois OEE' },
    estagio: { id: 2 },
    valorestimado: 3500,
    termometro: '0',
    vendedor: { id: 0, user: { username: 'Arthur' } },
    status: 'Ganhou',
    atividades: [{ id: 0 }, { id: 1 }]

  }, {
    id: 1,
    // titulo: 'ROSINA PORTAS - VEDOIS OEE',
    empresa: 'VEDOIS TECNOLOGIA',
    product: { id: 1, title: 'Vedois OEE' },
    estagio: { id: 2 },
    valorestimado: 3500,
    termometro: '50',
    vendedor: { id: 0, user: { username: 'Arthur' } },
    status: 'Aberto',
    atividades: [{ id: 0 }, { id: 1 }]

  }, {
    id: 1,
    // titulo: 'ROSINA PORTAS - VEDOIS OEE',
    empresa: 'VEDOIS TECNOLOGIA',
    product: { id: 1, title: 'Vedois OEE' },
    estagio: { id: 2 },
    valorestimado: 15000,
    termometro: '100',
    vendedor: { id: 0, user: { username: 'Arthur' } },
    status: 'Aberto',
    atividades: [{ id: 0 }, { id: 1 }]
  }, {
    id: 1,
    // titulo: 'ROSINA PORTAS - VEDOIS OEE',
    empresa: 'VEDOIS TECNOLOGIA',
    product: { id: 1, title: 'Vedois OEE' },
    estagio: { id: 5 },
    valorestimado: 3500,
    termometro: '0',
    vendedor: { id: 0, user: { username: 'Arthur' } },
    status: 'Aberto',
    atividades: [{ id: 0 }, { id: 1 }]

  }, {
    id: 1,
    // titulo: 'ROSINA PORTAS - VEDOIS OEE',
    empresa: 'VEDOIS TECNOLOGIA',
    // product: { id: 1, title: 'Vedois OEE' },
    estagio: { id: 4 },
    valorestimado: 10000,
    termometro: '0',
    vendedor: { id: 0, user: { username: 'Arthur' } },
    status: 'Aberto',
    atividades: [{ id: 0 }, { id: 1 }]

  }, {
    id: 1,
    // titulo: 'ROSINA PORTAS - VEDOIS OEE',
    empresa: 'VEDOIS TECNOLOGIA',
    product: { id: 1, title: 'Vedois OEE' },
    estagio: { id: 3 },
    valorestimado: 0,
    termometro: '50',
    vendedor: { id: 0, user: { username: 'Arthur' } },
    status: 'Aberto',
    atividades: [{ id: 0 }, { id: 1 }]

  }, {
    id: 1,
    // titulo: 'ROSINA PORTAS - VEDOIS OEE',
    empresa: 'SULL AUTOMAÇÃO',
    // product: { id: 1, title: 'Vedois OEE' },
    estagio: { id: 5 },
    valorestimado: 3500,
    termometro: '50',
    vendedor: { id: 0, user: { username: 'Arthur' } },
    status: 'Perdido',
    atividades: [{ id: 0 }, { id: 1 }]

  }, {
    id: 1,
    // titulo: 'ROSINA PORTAS - VEDOIS OEE',
    empresa: 'VEDOIS TECNOLOGIA',
    product: { id: 1, title: 'Vedois OEE' },
    estagio: { id: 7 },
    // valorestimado: 50000,
    termometro: '50',
    vendedor: { id: 0, user: { username: 'Arthur' } },
    status: 'Perdido',
    atividades: [{ id: 0 }, { id: 1 }]

  },];

  constructor() {

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

  ngOnInit() {
  }

}
