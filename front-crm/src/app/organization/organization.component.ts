import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CrudService } from "../services/crud.service";

export interface PeriodicElement {
  nome_fantasia, razao_social, fone, celular, email, endereco, tipo, erp, vendedor: String
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    nome_fantasia: 'V&V',
    razao_social: 'Asasasea',
    fone: '(47) 33821475',
    celular: '(47) 988745147',
    email: 'vedois@vedois.com.br',
    endereco: 'Rua Austrália, 211',
    tipo: 'Parceiro',
    erp: 'ASDASD',
    vendedor: 'Fabiana'
  },
  {
    nome_fantasia: 'Vedois Tecnologia',
    razao_social: 'Asasasea',
    fone: '(47) 33821475',
    celular: '(47) 988745147',
    email: 'vedois@vedois.com.br',
    endereco: 'Rua Austrália, 211',
    tipo: 'Cliente',
    erp: 'ASDASD',
    vendedor: 'Fabiana'
  },
  {
    nome_fantasia: 'V&V',
    razao_social: 'Asasasea',
    fone: '(47) 33821475',
    celular: '(47) 988745147',
    email: 'vedois@vedois.com.br',
    endereco: 'Rua Austrália, 211',
    tipo: 'Cliente',
    erp: 'ASDASD',
    vendedor: 'Fabiana'
  },
  {
    nome_fantasia: 'V&V',
    razao_social: 'Asasasea',
    fone: '(47) 33821475',
    celular: '(47) 988745147',
    email: 'vedois@vedois.com.br',
    endereco: 'Rua Austrália, 211',
    tipo: 'Cliente',
    erp: 'ASDASD',
    vendedor: 'Fabiana'
  },
  {
    nome_fantasia: 'Vedois Tecnologia',
    razao_social: 'Asasasea',
    fone: '(47) 33821475',
    celular: '(47) 988745147',
    email: 'vedois@vedois.com.br',
    endereco: 'Rua Austrália, 211',
    tipo: 'Parceiro',
    erp: 'ASDASD',
    vendedor: 'Fabiana'
  },
  {
    nome_fantasia: 'V&V',
    razao_social: 'Asasasea',
    fone: '(47) 33821475',
    celular: '(47) 988745147',
    email: 'vedois@vedois.com.br',
    endereco: 'Rua Austrália, 211',
    tipo: 'Parceiro',
    erp: 'ASDASD',
    vendedor: 'Fabiana'
  },
];


@Component({
  selector: "app-organization",
  templateUrl: "./organization.component.html",
  styleUrls: ["./organization.component.css"]
})
export class OrganizationComponent implements OnInit {
  orgapi: any;
  erroOrg: any;

  displayedColumns: string[] = ['nome_fantasia', 'razao_social', 'fone', 'celular', 'email', 'endereco', 'tipo', 'erp', 'vendedor'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private crudService: CrudService) {
    this.getterOrg();
  }

  getterOrg() {
    this.crudService.getOrgs().subscribe(
      data => {
        this.orgapi = data;
        console.log(data);
      },
      error => {
        this.erroOrg = error;
        console.error(error);
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }
}
