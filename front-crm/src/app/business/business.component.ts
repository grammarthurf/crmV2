import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {

  constructor() { }

  table = [
    {
      title: 'Prospecção',
      value: '0 - 1 ativ.'
    },
    {
      title: 'Contratado',
      value: '0 - 2 ativ.'
    },
    {
      title: 'Cliente Potencial',
      value: '0 - 0 ativ.'
    },
    {
      title: 'Demo Agendada',
      value: '0 - 0 ativ.'
    },
    {
      title: 'Proposta',
      value: '0 - 1 ativ.'
    },
    {
      title: 'Negoc. Iniciadas',
      value: '0 - 0 ativ.'
    },
    {
      title: 'Cliente',
      value: '0 - 2 ativ.'
    }
  ];

  cards = [
    {
      title: 'Sull OEE',
      subtitle: 'Sull Automação e Tecnologia',
      value: '15.000'
    },
    {
      title: 'Sull OEE',
      subtitle: 'Sull Automação e Tecnologia',
      value: '4.250'
    },
    {
      title: 'Sull OEE',
      subtitle: 'Sull Automação e Tecnologia',
      value: '7.458'
    },
    {
      title: 'Sull OEE',
      subtitle: 'Sull Automação e Tecnologia',
      value: '60.000'
    },
    {
      title: 'Sull OEE',
      subtitle: 'Sull Automação e Tecnologia',
      value: '19.000'
    },
    {
      title: 'Sull OEE',
      subtitle: 'Sull Automação e Tecnologia',
      value: '1.000'
    },
    {
      title: 'Sull OEE',
      subtitle: 'Sull Automação e Tecnologia',
      value: '17.968'
    }
  ];

  ngOnInit() {
  }

}
