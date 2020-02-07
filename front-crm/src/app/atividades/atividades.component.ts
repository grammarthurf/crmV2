import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
import {
  MatBottomSheet,
  MatBottomSheetRef
} from "@angular/material/bottom-sheet";
import { CrudService } from "../services/crud.service";

export interface PeriodicElement {
  id: number;
  Assunto: String;
  DataVenc: string;
  Duracao: string;
  NomeContato: string;
  Cliente: String;
  Email: string;
  Telefone: string;
  UserResp: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 1,
    Assunto: "Ligação",
    DataVenc: "12/10",
    Duracao: "00:10",
    NomeContato: "Maria Eduarda Silva",
    Cliente: "Empresa a",
    Email: "empresaa@gmail.com",
    Telefone: "(47)99854785",
    UserResp: "Maria"
  },
  {
    id: 2,
    Assunto: "Reunião",
    DataVenc: "25/12",
    Duracao: "00:45",
    NomeContato: "Maicon Dos Santos",
    Cliente: "Empresa b",
    Email: "empresab@gmail.com",
    Telefone: "(47)99854785",
    UserResp: "João"
  },
  {
    id: 3,
    Assunto: "Email",
    DataVenc: "02/02",
    Duracao: "01:00",
    NomeContato: "Gabriela Borges",
    Cliente: "Empresa c",
    Email: "empresac@gmail.com",
    Telefone: "(47)99854785",
    UserResp: "Daniel"
  },
  {
    id: 4,
    Assunto: "Ligação",
    DataVenc: "03/05",
    Duracao: "00:20",
    NomeContato: "Maicon Dos Santos",
    Cliente: "Empresa d",
    Email: "empresad@gmail.com",
    Telefone: "(47)99854785",
    UserResp: "Bianca"
  },
  {
    id: 5,
    Assunto: "Reunião",
    DataVenc: "14/04",
    Duracao: "01:00",
    NomeContato: "Maria Eduarda Silva",
    Cliente: "Empresa e",
    Email: "empresae@gmail.com",
    Telefone: "(47)99854785",
    UserResp: "Bianca"
  },
  {
    id: 6,
    Assunto: "Visita",
    DataVenc: "02/01",
    Duracao: "02:00",
    NomeContato: "Maicon Dos Santos",
    Cliente: "Empresa f",
    Email: "empresaf@gmail.com",
    Telefone: "(47)99854785",
    UserResp: "Maria"
  },
  {
    id: 7,
    Assunto: "Ligação",
    DataVenc: "10/01",
    Duracao: "00:20",
    NomeContato: "Gabriela Borges",
    Cliente: "Empresa g",
    Email: "empresag@gmail.com",
    Telefone: "(47)99854785",
    UserResp: "Daniel"
  },
  {
    id: 8,
    Assunto: "Ligação",
    DataVenc: "10/06",
    Duracao: "00:10",
    NomeContato: "Gabriela Borges",
    Cliente: "Empresa h",
    Email: "empresah@gmail.com",
    Telefone: "(47)99854785",
    UserResp: "João"
  },
  {
    id: 9,
    Assunto: "Visita",
    DataVenc: "10/04",
    Duracao: "01:30",
    NomeContato: "Maria Eduarda Silva",
    Cliente: "Empresa i",
    Email: "empresai@gmail.com",
    Telefone: "(47)99854785",
    UserResp: "Maria"
  },
  {
    id: 10,
    Assunto: "Visita",
    DataVenc: "06/12",
    Duracao: "01:45",
    NomeContato: "Gabriela Borges",
    Cliente: "Empresa j",
    Email: "empresaj@gmail.com",
    Telefone: "(47)99854785",
    UserResp: "Daniel"
  },
  {
    id: 11,
    Assunto: "Visita",
    DataVenc: "08/12",
    Duracao: "02:00",
    NomeContato: "Gabriela Borges",
    Cliente: "Empresa k",
    Email: "empresak@gmail.com",
    Telefone: "(47)99854785",
    UserResp: "Bianca"
  }
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

  displayedColumns: string[] = [
    "select",
    "Assunto",
    "DataVenc",
    "Duracao",
    "Cliente",
    "NomeContato",
    "Email",
    "Telefone",
    "UserResp"
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  constructor(private crudService: CrudService) {
    this.getterActivity();
  }

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

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${
      this.selection.isSelected(row) ? "deselect" : "select"
    } row ${row.id + 1}`;
  }

  ngOnInit() {}
}
