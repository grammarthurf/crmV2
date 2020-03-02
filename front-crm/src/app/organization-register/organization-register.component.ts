import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CrudService } from '../services/crud.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-organization-register',
  templateUrl: './organization-register.component.html',
  styleUrls: ['./organization-register.component.css']
})
export class OrganizationRegisterComponent implements OnInit {

  org = { codigo: '', razaosocial: '', nomefantasia: '', ramo: '' ,
   cnpj: '', ie: '',  rua: '', complemento: '', bairro: '', cep: '',
   cidade: '', uf: '', telefone: '', erp: '', email: '', site: '', contatos: [] };

  contato = { nome: '', email: '', cargo: '', dep: '', birth: '', tel: '', cel: '', skp: ''}

  ramosapi: any;
  ramo = { nome: ''};

  erpsapi:any;
  erp = { codigo: '', desc: '', empresa: ''};

  constructor(private crudService: CrudService,private router: Router) {
    this.getterErp();
    this.getterRamo();
   }

  ngOnInit() {
  }

  code: any;
  generateCode() {
    let randomString = function(lenght) {
      let text = "";
      let possible = "0123456789"

      for(let i = 0; i < lenght; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }

    this.code = randomString(8);
    console.log(this.code);
  }

  getterRamo() {
    this.crudService.getRamo().subscribe(
      data => {
        this.ramosapi = data;
        console.log(data);
      },
      error => {
        // this.erroAtividade = error;
      }
    );
  }
  getterErp() {
    this.crudService.getErp().subscribe(
      data => {
        this.erpsapi = data;
        console.log(data);
      },
      error => {
        // this.erroAtividade = error;
      }
    );
  }

  addContato() {

    const contatovar = {nome: this.contato.nome , email: this.contato.email, cargo: this.contato.cargo,
    dep: this.contato.dep, birth: this.contato.birth, tel: this.contato.tel, cel: this.contato.cel, skp: this.contato.skp}

    this.org.contatos.push(contatovar)
    console.log(this.org);

    this.contato.nome = '';
    this.contato.email = '';
    this.contato.cargo = '';
    this.contato.dep = '';
    this.contato.birth = '';
    this.contato.tel = '';
    this.contato.cel = '';
    this.contato.skp = '';
  }

  exit() {
    this.router.navigate([`/company/`]);
  }

  goToRamo() {
    window.open('/ramo');
  }

  goToERP() {
    window.open('/erp');
  }

  save() {
    console.log(this.org);
    console.log(this.contato);


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
          // this.getterOrg();
          // setTimeout(this.reiniciar, 1001);
          console.log(data);
        },
        error => {
          // this.getterOrg();
          console.error(error);
          // setTimeout(this.reiniciar, 1001);
        }
      );
    }
  }

}
