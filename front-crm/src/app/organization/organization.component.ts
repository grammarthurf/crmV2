import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  nome_fantasia, razao_social, fone, celular, email, endereco,  tipo, erp, vendedor : String
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    nome_fantasia: 'V&V',
    razao_social: 'Asasasea',
    fone: '(47) 33821475',
    celular: '(47) 988745147',
    email: 'vedois@vedois.com.br',
    endereco: 'Rua Austrália, 211',
    tipo: 'Tecnologia',
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
    tipo: 'Tecnologia',
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
    tipo: 'Tecnologia',
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
    tipo: 'Tecnologia',
    erp: 'ASDASD', 
    vendedor: 'Fabiana'
  },
  {
    nome_fantasia: 'V&a',
    razao_social: 'Asasasea',
    fone: '(47) 33821475',
    celular: '(47) 988745147',
    email: 'vedois@vedois.com.br',
    endereco: 'Rua Austrália, 211',
    tipo: 'Tecnologia',
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
    tipo: 'Tecnologia',
    erp: 'ASDASD', 
    vendedor: 'Fabiana'
  },
];

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  displayedColumns: string[] = ['nome_fantasia', 'razao_social', 'fone', 'celular', 'email', 'endereco', 'tipo', 'erp', 'vendedor'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

}
