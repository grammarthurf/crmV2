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
  displayedColumns: string[] = ['nome_fantasia', 'razao_social', 'endereco', 'tipo', 'erp', 'vendedor', 'columnEdit', 'columnDelete'];
  erroOrgs: any;

  code: any;
  
  data = Object.assign(org);
  dataSource = new MatTableDataSource<Element>(this.data);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private crudService: CrudService, private router: Router) {
    this.getterOrg();
  }

  orgapi: MatTableDataSource<any>;

  getterOrg() {
    this.crudService.getOrgs().subscribe(
      data => {
        data.forEach(e => {
            console.log();
            this.matdata.push({
              id: e.id,
              razaosocial: e.razaosocial,
              nomefantasia: e.nomefantasia,
              rua: e.rua,
              bairro: e.bairro,
              cidade: e.cidade,
              uf: e.uf,
              erp: e.erp
          });
        });

        this.dataSource = new MatTableDataSource(this.matdata);
        console.log("DATASOURCE" + this.dataSource);
        this.dataSource.sort = this.sort;

        this.orgapi = data;
        console.log(data);
      },
      error => {
        this.erroOrgs = error;
        console.error(error);
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  save() {
    console.log(this.org);

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
          setTimeout(this.reiniciar, 1001);
          console.log(data);
        },
        error => {
          this.getterOrg();
          console.error(error);
          setTimeout(this.reiniciar, 1001);
        }
      );
    }
  }

  reiniciar(){
    location.reload()
  }

  newcode(){
    this.code = Math.floor(Math.random() * (999 - 100) + 100);
    console.log(this.code);
    return this.code;
  }

  ngOnInit() {
    
  }


  // goTo(id) {
  //   this.router.navigate([`/organization-detail/${id}`]);
  // }

  goTo() {
    this.router.navigate([`/company-detail/`]);
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

  // generateCode() {
  //   let randomString = function(lenght) {
  //     let text = "";
  //     let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&"

  //     for(let i = 0; i < lenght; i++) {
  //       text += possible.charAt(Math.floor(Math.random() * possible.length));
  //     }
  //     return text;
  //   }

  //   this.org.cep = randomString(10);
  //   console.log(this.org.cep);
  // }


}
