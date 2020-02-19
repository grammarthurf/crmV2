import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { CrudService } from "../services/crud.service";
import swal from 'sweetalert';

@Component({
  selector: "app-organization",
  templateUrl: "./organization.component.html",
  styleUrls: ["./organization.component.css"]
})
export class OrganizationComponent implements OnInit {
  org = { razaosocial: '', nomefantasia: '', rua: '', bairro: '', cep: '', cidade: '', uf: '', erp: '' }

  // Lista orgs:
  erroOrg: any;
  displayedColumns: string[] = ['nome_fantasia', 'razao_social', 'endereco', 'tipo', 'erp', 'vendedor', 'columnEdit', 'columnDelete'];
  
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

          console.log(data);
        },
        error => {

          this.getterOrg();
          console.error(error);
        }
      );
    }
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