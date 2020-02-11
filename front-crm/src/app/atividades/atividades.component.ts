
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { CrudService } from "../services/crud.service";
import { MatSort } from '@angular/material/sort';


export interface PeriodicElement {
  id: number;
  assunto: String;
  dataVenc: string;
  nomeContato: string;
  cliente: String;
  email: string;
  telefone: string;
  userResp: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 1,
    assunto: 'Ligar',
    dataVenc: '12/10/2020',
    nomeContato: 'Maria Eduarda Silva',
    cliente: 'Vedois Tecnologia',
    email: 'vedois@vedois.com',
    telefone: '(47) 988457154',
    userResp: 'Maria Silva'
  },
  {
    id: 2,
    assunto: 'Reunião',
    dataVenc: '12/10/2020',
    nomeContato: 'Maria Eduarda Silva',
    cliente: 'Vedois Tecnologia',
    email: 'vedois@vedois.com',
    telefone: '(47) 988457154',
    userResp: 'Maria Silva '
  },
  {
    id: 3,
    assunto: 'Ligar',
    dataVenc: '12/10/2020',
    nomeContato: 'Maria Eduarda Silva',
    cliente: 'Vedois Tecnologia',
    email: 'vedois@vedois.com',
    telefone: '(47) 988457154',
    userResp: 'Maria Silva '
  },
  {
    id: 4,
    assunto: 'Visita',
    dataVenc: '12/10/2020',
    nomeContato: 'Maria Eduarda Silva',
    cliente: 'Vedois Tecnologia',
    email: 'vedois@vedois.com',
    telefone: '(47) 988457154',
    userResp: 'Maria Silva '
  },
  {
    id: 5,
    assunto: 'Email',
    dataVenc: '12/10/2020',
    nomeContato: 'Maria Eduarda Silva',
    cliente: 'Vedois Tecnologia',
    email: 'vedois@vedois.com',
    telefone: '(47) 988457154',
    userResp: 'Maria Silva '
  },
  {
    id: 6,
    assunto: 'Ligar',
    dataVenc: '12/10/2020',
    nomeContato: 'Maria Eduarda Silva',
    cliente: 'Vedois Tecnologia',
    email: 'vedois@vedois.com',
    telefone: '(47) 988457154',
    userResp: 'Maria Silva '
  },
  {
    id: 7,
    assunto: 'Reunião',
    dataVenc: '12/10/2020',
    nomeContato: 'Maria Eduarda Silva',
    cliente: 'Vedois Tecnologia',
    email: 'vedois@vedois.com',
    telefone: '(47) 988457154',
    userResp: 'Maria Silva '
  },
  {
    id: 8,
    assunto: 'Visita',
    dataVenc: '12/10/2020',
    nomeContato: 'Maria Eduarda Silva',
    cliente: 'Vedois Tecnologia',
    email: 'vedois@vedois.com',
    telefone: '(47) 988457154',
    userResp: 'Maria Silva '
  },
  {
    id: 9,
    assunto: 'Email',
    dataVenc: '12/10/2020',
    nomeContato: 'Maria Eduarda Silva',
    cliente: 'Vedois Tecnologia',
    email: 'vedois@vedois.com',
    telefone: '(47) 988457154',
    userResp: 'Maria Silva '
  },
];

@Component({
  selector: "app-atividades",
  templateUrl: "./atividades.component.html",
  styleUrls: ["./atividades.component.css"]
})
export class AtividadesComponent implements OnInit {
  // Lista de atividades:
  activityapi: any;
  erroActivity: any;

  displayedColumns: string[] = ['select', 'assunto', 'dataVenc', 'cliente', 'nomeContato', 'email', 'telefone', 'userResp', 'columnEdit', 'columnDelete'];
  data = Object.assign(ELEMENT_DATA);
  dataSource = new MatTableDataSource<Element>(this.data);
  selection = new SelectionModel<Element>(true, []);

  constructor(private router: Router, private crudService: CrudService) {
    this.getterActivity();
  }

  @ViewChild(MatSort, { static: true }) sort: MatSort;


  getterActivity() {
    this.crudService.getAtividade().subscribe(
      data => {
        this.activityapi = data;
        console.log(data);
      },
      error => {
        this.erroActivity = error;
        console.error(error);
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filtrolig() {
    this.dataSource.filter = "ligar".trim().toLowerCase();
  }

  filtroreun() {
    this.dataSource.filter = "reunião".trim().toLowerCase();
  }

  filtrovisit() {
    this.dataSource.filter = "visita".trim().toLowerCase();
  }

  filtroemail() {
    this.dataSource.filter = "email".trim().toLowerCase();
  }

  dblclic() {
    this.dataSource.filter = "".trim().toLowerCase();
  }

  removeSelectedRows() {
    this.selection.selected.forEach(item => {
      let index: number = this.data.findIndex(d => d === item);
      this.data.splice(index, 1);
      this.dataSource = new MatTableDataSource<Element>(this.data);
    });
    this.selection = new SelectionModel<Element>(true, []);
  }

  removechama() {
    this.removeSelectedRows();
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }
}
