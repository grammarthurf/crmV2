import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatSort } from "@angular/material";
import { CrudService } from "../services/crud.service";
import swal from 'sweetalert';

// export interface PeriodicElement {
//   nome;
//   org;
//   tel;
//   email;
//   neg_f;
//   neg_a: String;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     nome: "Arthur Felipe",
//     org: "Vedois Tecnologia",
//     tel: "47 988309090",
//     email: "arthurfelipe@vedois.com",
//     neg_f: "3",
//     neg_a: "2"
//   },
//   {
//     nome: "Arthur Felipe",
//     org: "Vedois Tecnologia",
//     tel: "47 988309090",
//     email: "arthurfelipe@vedois.com",
//     neg_f: "3",
//     neg_a: "2"
//   },
//   {
//     nome: "Arthur Felipe",
//     org: "Vedois Tecnologia",
//     tel: "47 988309090",
//     email: "arthurfelipe@vedois.com",
//     neg_f: "3",
//     neg_a: "2"
//   },
//   {
//     nome: "Arthur Felipe",
//     org: "Vedois Tecnologia",
//     tel: "47 988309090",
//     email: "arthurfelipe@vedois.com",
//     neg_f: "3",
//     neg_a: "2"
//   },
//   {
//     nome: "Arthur Felipe",
//     org: "Vedois Tecnologia",
//     tel: "47 988309090",
//     email: "arthurfelipe@vedois.com",
//     neg_f: "3",
//     neg_a: "2"
//   },
//   {
//     nome: "Arthur Felipe",
//     org: "Vedois Tecnologia",
//     tel: "47 988309090",
//     email: "arthurfelipe@vedois.com",
//     neg_f: "2",
//     neg_a: "1"
//   }
// ];

@Component({
  selector: "app-person",
  templateUrl: "./person.component.html",
  styleUrls: ["./person.component.css"]
})
export class PersonComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'org', 'tel', 'email', 'tipo', 'columnEdit', 'columnDelete'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  contato = { nome: '', tipo: '', fone: '', celular: '', email: '', skype: '', org: '' }

  orgsapi: any;

  // Lista de contatos:
  contatosapi: MatTableDataSource<any>;

  erroContatos: any;

  constructor(private crudService: CrudService) {
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
    this.contatosapi.filter = filterValue.trim().toLowerCase();
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

  ngOnInit() {
    // this.dataSource.sort = this.sort;
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
