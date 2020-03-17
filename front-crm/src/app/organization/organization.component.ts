import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { CrudService } from "../services/crud.service";
import swal from 'sweetalert';
import { Router } from "@angular/router";

export interface PeriodicElement {
  id: any;
  razaosocial: any;
  nomefantasia: any;
  rua: any;
  bairro: any;
  cep: any;
  cidade: any;
  uf: any;
  erp: any;
}

const org: PeriodicElement[] = [
  { id: "", razaosocial: '', nomefantasia: '', rua: '', bairro: '', cep: '', cidade: '', uf: '', erp: '' },
];

@Component({
  selector: "app-organization",
  templateUrl: "./organization.component.html",
  styleUrls: ["./organization.component.css"]
})
export class OrganizationComponent implements OnInit {
  org = { codigo: '', razaosocial: '', nomefantasia: '', cnpj: '', ie: '',  rua: '', complemento: '', bairro: '', cep: '', cidade: '', uf: '', telefone: '', erp: '', email: '', site: '' }
  matdata: any = [];

  // Lista orgs:
  erroOrg: any;
  displayedColumns: string[] = ['codigo', 'nomefantasia', 'razaosocial', 'rua', 'erp', 'columnEdit', 'columnDelete'];
  erroOrgs: any;

  code: any;
  delorg: any;

  data = Object.assign(org);
  dataSource = new MatTableDataSource<Element>(this.data);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private crudService: CrudService, private router: Router) {
    this.getterOrg();
  }

  orgapi: MatTableDataSource<any>;

  // GET ORGANIZATION
  getterOrg() {
    this.crudService.getOrgs().subscribe(
      data => {
        this.matdata = [];
        data.forEach(e => {
            this.matdata.push({
              id: e.id,
              cod: e.codigo,
              razaosocial: e.razaosocial,
              nomefantasia: e.nomefantasia,
              rua: e.rua,
              bairro: e.bairro,
              cidade: e.cidade,
              uf: e.uf,
              erp: e.erpe,
          });
        });

        this.dataSource = new MatTableDataSource(this.matdata);
        this.dataSource.sort = this.sort;
        this.orgapi = data;
      },
      error => {
        this.erroOrgs = error;
      }
    );
  }

  // FILTER
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // GO TO COMPANY REGISTER UPDATE
  goToUpdate(id) {
    this.router.navigate([`/company-register/${id}`]);
  }

  // SAVE ORGANIZATION
  save() {
    let razao_s = this.org.razaosocial;

    if (razao_s === '') {
      swal({
        icon: "error",
        text: "Razão Social não preenchida!",
        timer: 1800,
        buttons: {
          buttons: false
        }
      });
    } else {
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
        },
        error => {
          this.getterOrg();
        }
      );
    }
  }

  ngOnInit() {

  }

  // GO TO COMPANY DETAIL SCREEN
  goTo(id) {
    this.router.navigate([`/company-detail/${id}`]);
  }

  // GO TO COMPANY REGISTER SCREEN
  goToRegister() {
    this.router.navigate([`/company-register/`]);
  }

  // DELETE ITEM
  deleteItem(item) {
    this.delorg = item.id;
    console.log(this.delorg);
  }

  // DELETE ORGANIZATION
  del(){
    this.crudService.deleteOrg(this.delorg).subscribe(
      data => {
        this.getterOrg();
        swal({
          icon: "success",
          text: "Empresa excluída com sucesso!",
          timer: 1000,
          buttons: {
            buttons: false
          }
        });
      },
      error => {
        swal({
          icon: "error",
          text: "Erro ao deletar !",
          timer: 1000,
          buttons: {
            buttons: false
          }
        });
      }
    )
  }

}
