import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatSort } from "@angular/material";
import { CrudService } from "../services/crud.service";
import swal from 'sweetalert';
import { Router } from "@angular/router";

export interface PeriodicElement {
  id: any;
  nome: any;
  org: any;
  tel: any;
  email: any;
  tipo: any;
}

const contatos: PeriodicElement[] = [
  { id: "", nome: '', org: '', tel: '', email: '', tipo: '' },
];

@Component({
  selector: "app-person",
  templateUrl: "./person.component.html",
  styleUrls: ["./person.component.css"]
})
export class PersonComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'org', 'tel', 'email', 'tipo', 'columnEdit', 'columnDelete'];
  //dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  contato = { nome: '', tipo: '', fone: '', celular: '', email: '', skype: '', org: '' };
  matdata: any = [];

  orgsapi: any;

  //Lista de contatos:
  contatosapi: MatTableDataSource<any>;

  erroContatos: any;


  data = Object.assign(contatos);
  dataSource = new MatTableDataSource<Element>(this.data);


  constructor(private crudService: CrudService, private router: Router) {
    this.getterContatos();
    this.getterOrgs();
  }

  getterOrgs() {
    this.crudService.getOrgs().subscribe(
      data => {
        this.orgsapi = data;
        console.log(data);
      },
      error => {

      }
    );
  }

  getterContatos() {
    this.crudService.getClientes().subscribe(
      data => {
        data.forEach(e => {
          if (e.org == null) {
            console.log();

            this.matdata.push({
              id: e.id,
              nome: e.nome,
              fone: e.fone,
              celular: e.celular,
              email: e.email,
              skype: e.skype,
              tipo: e.tipo,
              org: {
                nomefantasia: ''
              }

            });
          }

          if (e.org != null) {
            console.log();

            this.matdata.push({
              id: e.id,
              nome: e.nome,
              fone: e.fone,
              celular: e.celular,
              email: e.email,
              skype: e.skype,
              tipo: e.tipo,
              org: e.org,

            });
          }
        });


        this.dataSource = new MatTableDataSource(this.matdata);
        console.log(this.dataSource);

        this.contatosapi = data;
        console.log(data);
      },
      error => {
        this.erroContatos = error;
        console.error(error);
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  save() {
    console.log(this.contato);

    let name = this.contato.nome;

    if (name === '') {
      swal({
        icon: "error",
        text: "Nome não preenchido!",
        timer: 1800,
        buttons: {
          buttons: false
        }
      });
    } else {
      this.crudService.saveNewCliente(this.contato).subscribe(
        data => {
          swal({
            icon: "success",
            text: "Contato salvo com sucesso!",
            timer: 1800,
            buttons: {
              buttons: false
            }
          });
          this.getterOrgs();
          this.getterContatos();
          console.log(data);
        },
        error => {
          this.getterContatos();
          console.error(error);
        }
      );
    }
  }

  formatPhoneNumber(str) {
    let cleaned = ('' + str).replace(/\D/g, '');

    let match = cleaned.match(/^(\d{2})(\d{4})(\d{4})$/);

    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    };

    return null
  }

  goTo() {
    this.router.navigate([`/person-detail/`]);
  }
  
  filtroCli() {
    this.dataSource.filter = "Cliente".trim().toLowerCase();
  }

  filtroPar() {
    this.dataSource.filter = "Parceiro".trim().toLowerCase();
  }

  dblclic(){
    this.dataSource.filter = "".trim().toLowerCase();
  }

  ngOnInit() {
    // this.dataSource.sort = this.sort;
  }

  redirectToAdd(url): void {
    window.open(url, '_blank');
    window.focus();
  }

  deleteItem() {
    swal({
      icon: "error",
      text: "Pessoa excluída com sucesso!",
      timer: 1800,
      buttons: {
        buttons: false
      }
    });
  }
}
