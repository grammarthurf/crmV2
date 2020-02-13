import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CrudService } from "../services/crud.service";
import swal from 'sweetalert';

// export interface PeriodicElement {
//   nome_fantasia, razao_social, fone, celular, email, endereco, tipo, erp, vendedor: String
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     nome_fantasia: 'V&V',
//     razao_social: 'Asasasea',
//     fone: '(47) 33821475',
//     celular: '(47) 988745147',
//     email: 'vedois@vedois.com.br',
//     endereco: 'Rua Austrália, 211',
//     tipo: 'Parceiro',
//     erp: 'Projedata',
//     vendedor: 'Fabiana'
//   },
//   {
//     nome_fantasia: 'Vedois Tecnologia',
//     razao_social: 'Asasasea',
//     fone: '(47) 33821475',
//     celular: '(47) 988745147',
//     email: 'vedois@vedois.com.br',
//     endereco: 'Rua Austrália, 211',
//     tipo: 'Cliente',
//     erp: 'Projedata',
//     vendedor: 'Clayton'
//   },
//   {
//     nome_fantasia: 'V&V',
//     razao_social: 'Asasasea',
//     fone: '(47) 33821475',
//     celular: '(47) 988745147',
//     email: 'vedois@vedois.com.br',
//     endereco: 'Rua Austrália, 211',
//     tipo: 'Cliente',
//     erp: 'Projedata',
//     vendedor: 'Clayton'
//   },
//   {
//     nome_fantasia: 'V&V',
//     razao_social: 'Asasasea',
//     fone: '(47) 33821475',
//     celular: '(47) 988745147',
//     email: 'vedois@vedois.com.br',
//     endereco: 'Rua Austrália, 211',
//     tipo: 'Cliente',
//     erp: 'SAP',
//     vendedor: 'Fabiana'
//   },
//   {
//     nome_fantasia: 'Vedois Tecnologia',
//     razao_social: 'Asasasea',
//     fone: '(47) 33821475',
//     celular: '(47) 988745147',
//     email: 'vedois@vedois.com.br',
//     endereco: 'Rua Austrália, 211',
//     tipo: 'Parceiro',
//     erp: 'SAP',
//     vendedor: 'Gisela'
//   },
//   {
//     nome_fantasia: 'V&V',
//     razao_social: 'Asasasea',
//     fone: '(47) 33821475',
//     celular: '(47) 988745147',
//     email: 'vedois@vedois.com.br',
//     endereco: 'Rua Austrália, 211',
//     tipo: 'Parceiro',
//     erp: 'SAP',
//     vendedor: 'Jéssica'
//   },
// ];


@Component({
  selector: "app-organization",
  templateUrl: "./organization.component.html",
  styleUrls: ["./organization.component.css"]
})
export class OrganizationComponent implements OnInit {
  org = {razaosocial: '', nomefantasia: '', rua: '', bairro: '', cep: '', cidade: '', uf: '', erp: ''}

  // Lista orgs:

  erroOrg: any;

  displayedColumns: string[] = ['nome_fantasia', 'razao_social', 'endereco', 'tipo', 'erp', 'vendedor', 'columnEdit', 'columnDelete'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private crudService: CrudService) {
    this.getterOrg();
  }

  orgapi: MatTableDataSource<any>;

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
    this.orgapi.filter = filterValue.trim().toLowerCase();
  }

  save(){
    console.log(this.org);

    this.crudService.saveNewOrg(this.org).subscribe(
      data => {
        swal({
          icon: "success",
          text: "Empresa salva com sucesso!",
          timer: 1800,
          buttons: {
            buttons: false
          }
        });
        this.getterOrg();

        console.log(data);
      },
      error => {

        this.getterOrg();
        console.error(error);
      }
    );
  }

  ngOnInit() {
    // this.orgapi.sort = this.sort;
  }

  deleteItem() {
    swal({
      icon: "error",
      text: "Empresa excluída com sucesso!",
      timer: 1800,
      buttons: {
        buttons: false
      }
    });
  }
}
