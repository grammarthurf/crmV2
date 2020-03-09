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
  orgapi:any;
  matdata:any;
  erroOrgs: any;
  disableCode: boolean = false;
  disableCode1: boolean = false;
  org = {
    codigo: '', razaosocial: '', nomefantasia: '', ramo: '',
    cnpj: '', ie: '', rua: '', complemento: '', bairro: '', cep: '',
    cidade: '', uf: '', telefone: '', erp: '', email: '', site: '', contatos: [], erpe: [], ramos: []
  };

  contato = { nome: '', email: '', cargo: '', dep: '', birth: '', tel: '', cel: '', skp: '' }

  ramosapi: any;
  ramo = { desc: '' };

  erpsapi: any;
  erp = { codigo: '', desc: '', empresa: '' };

  constructor(private crudService: CrudService, private router: Router) {
    this.getterErp();
    this.getterRamo();
    this.getterOrgs();
  }

  ngOnInit() {
  }

  getterOrgs() {
    this.crudService.getOrgs().subscribe(
      data => {
        this.orgapi = data;
      },
      error => {
        // this.erroAtividade = error;
      }
    );
  }

  code1: any;
  generateCode1() {
    var a = this.orgapi;
    console.log(a.length);
    if(a.length > 0){
      if(a.length < 9 ){
        this.code1 = "000" + ++this.orgapi[0].codigo;
        this.org.codigo = this.code1;
        console.log(this.code1);
      } else if (a.length < 99) {
        this.code1 = "00" + ++this.orgapi[0].codigo;
        this.org.codigo = this.code1;
        console.log(this.code1);
      } else if (a.length < 999){
        this.code1 = "0" + ++this.orgapi[0].codigo;
        this.org.codigo = this.code1;
        console.log(this.code1);
      } else {
        this.code1 = ++this.orgapi[0].codigo;
        this.org.codigo = this.code1;
        console.log(this.code1);
      }
    } else {
      this.code1 = "000"+1;
      this.org.codigo = this.code1;
      console.log(this.code1);
    }
    this.disableCode = true;
  }

  code2: any;
  generateCode2() {
    var a = this.erpsapi;
    if(a.length > 0){
      if(a.length < 9){
        this.code2 = "00" + ++this.erpsapi[0].codigo;
        this.erp.codigo = this.code2;
        console.log(this.code2);
      } else if (a.length < 99) {
        this.code2 = "0" + ++this.erpsapi[0].codigo;
        this.erp.codigo = this.code2;
        console.log(this.code2);
      } else {
        this.code2 = ++this.erpsapi[0].codigo;
        this.erp.codigo = this.code2;
        console.log(this.code2);
      }
      
    } else {
      this.code2 = "00"+1;
      this.erp.codigo = this.code2;
      console.log(this.code2);
    }
    this.disableCode1 = true;
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

    const contatovar = {
      nome: this.contato.nome, email: this.contato.email, cargo: this.contato.cargo,
      dep: this.contato.dep, birth: this.contato.birth, tel: this.contato.tel, skp: this.contato.skp, cel: this.contato.cel
    }

    this.org.contatos.push(contatovar)
    console.log(this.org);

    this.contato.nome = '';
    this.contato.email = '';
    this.contato.cargo = '';
    this.contato.dep = '';
    this.contato.birth = '';
    this.contato.tel = '';
    this.contato.skp = '';
    this.contato.cel = '';
  }

  exit() {
    this.router.navigate([`/company/`]);
  }

  saveRamo(){
    this.crudService.saveNewRamo(this.ramo).subscribe(
      data => {
        swal({
          icon: "success",
          text: "Ramo salvo com sucesso!",
          timer: 1800,
          buttons: {
            buttons: false
          }
        });
        // this.getterOrg();
        // setTimeout(this.reiniciar, 1001);
        console.log(data);
        this.getterErp();
        this.getterRamo();
      },
      error => {
        // this.getterOrg();
        console.error(error);
        // setTimeout(this.reiniciar, 1001);
      }
    );
  }

  saveErp(){
    this.crudService.saveNewErp(this.erp).subscribe(
      data => {
        swal({
          icon: "success",
          text: "Erp salvo com sucesso!",
          timer: 1800,
          buttons: {
            buttons: false
          }
        });
        // this.getterOrg();
        // setTimeout(this.reiniciar, 1001);
        console.log(data);
        this.getterErp();
        this.getterRamo();
      },
      error => {
        // this.getterOrg();
        console.error(error);
        // setTimeout(this.reiniciar, 1001);
      }
    );
  }

  save() {
    console.log(this.org);
    console.log(this.contato);

    if(this.contato.nome != ""){

      const contatovar = {
        nome: this.contato.nome, email: this.contato.email, cargo: this.contato.cargo,
        dep: this.contato.dep, birth: this.contato.birth, tel: this.contato.tel, skp: this.contato.skp, cel: this.contato.cel
      }

      this.org.contatos.push(contatovar)
      console.log(this.org);
    } else {
      console.log("Contato em branco")
    }

    if (this.org.razaosocial === '') {
      swal({
        icon: "error",
        text: "Razão Social deve ser preenchida!",
        timer: 1800,
        buttons: {
          buttons: false
        }
      });
    } else if (this.org.codigo === '') {
      swal({
        icon: "error",
        text: "Código deve ser preenchida!",
        timer: 1800,
        buttons: {
          buttons: false
        }
      });
    } else if (this.org.razaosocial === '' || this.org.codigo === '') {
      swal({
        icon: "error",
        text: "Código e Razão Social devem ser preenchidos!",
        timer: 1800,
        buttons: {
          buttons: false
        }
      });
    } else {
      this.org.erpe.push(this.erp);
      this.org.ramos.push(this.ramo);
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
           //this.getterOrg();
           //setTimeout(this.reiniciar, 1001);
          console.log(data);
          this.exit();
        },
        error => {
          // this.getterOrg();
          console.error(error);
          // setTimeout(this.reiniciar, 1001);
        }
      );
    }
  }

  formatPhoneNumber(str) {
    //Filter only numbers from the input
    let cleaned = ('' + str).replace(/\D/g, '');

    //Check if the input is of correct length
    let match = cleaned.match(/^(\d{2})(\d{4})(\d{4})$/);
  
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    };
  
    return null
  };

  formatCellPhoneNumber(str) {
    //Filter only numbers from the input
    let cleaned = ('' + str).replace(/\D/g, '');
    
    //Check if the input is of correct length
    let match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    };
  
    return null
  };


  // addFields() {
  //   var currentDiv = document.getElementById('duplicate');
  //   var clonedDiv = currentDiv.cloneNode(true);
  //   currentDiv.parentNode.insertBefore(clonedDiv, currentDiv.nextSibling);
  // }

}
