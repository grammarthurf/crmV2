
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { CrudService } from "../services/crud.service";
import { MatSort } from '@angular/material/sort';


export interface PeriodicElement {
  id: number;
  Assunto: String;
  DataVenc: string;
  NomeContato: string;
  Cliente: String;
  Email: string;
  Telefone: string;
  UserResp: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, Assunto: 'Ligação', DataVenc: '12/10/2020', NomeContato: 'Maria Eduarda Silva', Cliente: 'Empresa aaaaaaaaaaaaaaaaaaaaaaaaa', Email: 'empresaa@gmail.com', Telefone: '(47)99854785', UserResp: 'Maria'},
  {id: 2, Assunto: 'Reunião', DataVenc: '25/12/2020', NomeContato: 'Maicon Dos Santos', Cliente: 'Empresa bbbbbbbbbbbbbb', Email: 'empresab@gmail.com', Telefone: '(47)99854785', UserResp: 'João'},
  {id: 3, Assunto: 'Email', DataVenc: '02/02/2020', NomeContato: 'Gabriela Borges', Cliente: 'Empresa ccccccccccccccc', Email: 'empresac@gmail.com', Telefone: '(47)99854785', UserResp: 'Daniel'},
  {id: 4, Assunto: 'Ligação', DataVenc: '03/05/2020', NomeContato: 'Maicon Dos Santos', Cliente: 'Empresa ddddddddddddddd', Email: 'empresad@gmail.com', Telefone: '(47)99854785', UserResp: 'Bianca'},
  {id: 5, Assunto: 'Reunião', DataVenc: '14/04/2020', NomeContato: 'Maria Eduarda Silva', Cliente: 'Empresa eeeeeeeeeeeee', Email: 'empresae@gmail.com', Telefone: '(47)99854785', UserResp: 'Bianca'},
  {id: 6, Assunto: 'Visita', DataVenc: '02/05/2020', NomeContato: 'Maicon Dos Santos', Cliente: 'Empresa f', Email: 'empresaf@gmail.com', Telefone: '(47)99854785', UserResp: 'Maria'},
  {id: 7, Assunto: 'Ligação', DataVenc: '10/02/2020', NomeContato: 'Gabriela Borges', Cliente: 'Empresa g', Email: 'empresag@gmail.com', Telefone: '(47)99854785', UserResp: 'Daniel'},
  {id: 8, Assunto: 'Ligação', DataVenc: '07/02/2020', NomeContato: 'Gabriela Borges', Cliente: 'Empresa h', Email: 'empresah@gmail.com', Telefone: '(47)99854785', UserResp: 'João'},
  {id: 9, Assunto: 'Visita', DataVenc: '10/04/2020', NomeContato: 'Maria Eduarda Silva', Cliente: 'Empresa i', Email: 'empresai@gmail.com', Telefone: '(47)99854785', UserResp: 'Maria'},
  {id: 10, Assunto: 'Visita', DataVenc: '06/12/2020', NomeContato: 'Gabriela Borges', Cliente: 'Empresa j', Email: 'empresaj@gmail.com', Telefone: '(47)99854785', UserResp: 'Daniel'},
  {id: 11, Assunto: 'Email', DataVenc: '08/02/2020', NomeContato: 'Gabriela Borges', Cliente: 'Empresa k', Email: 'empresak@gmail.com', Telefone: '(47)99854785', UserResp: 'Bianca'},
  {id: 11, Assunto: 'Visita', DataVenc: '08/12/2020', NomeContato: 'Maria Eduarda Silva', Cliente: 'Empresa l', Email: 'empresal@gmail.com', Telefone: '(47)99854785', UserResp: 'Daniel'},
  {id: 11, Assunto: 'Ligação', DataVenc: '03/03/2020', NomeContato: 'Gabriela Borges', Cliente: 'Empresa m', Email: 'empresam@gmail.com', Telefone: '(47)99854785', UserResp: 'João'},
  {id: 11, Assunto: 'Visita', DataVenc: '06/02/2020', NomeContato: 'Maicon Dos Santos', Cliente: 'Empresa n', Email: 'empresan@gmail.com', Telefone: '(47)99854785', UserResp: 'Bianca'},

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

  displayedColumns: string[] = ['select', 'Assunto', 'DataVenc', 'Cliente', 'NomeContato', 'Email', 'Telefone', 'UserResp'];
  data = Object.assign( ELEMENT_DATA);
  dataSource = new MatTableDataSource<Element>(this.data);
  selection = new SelectionModel<Element>(true, []);

  constructor(private router: Router, private crudService: CrudService) { 
    this.getterActivity();
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;


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
    this.dataSource.filter = "ligação".trim().toLowerCase();
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

  goTo() {
    this.router.navigate(['/business-detail']);
  }

  removechama(){
    this.removeSelectedRows();
  }
  
  ngOnInit() {
    this.dataSource.sort = this.sort;
  }
}
