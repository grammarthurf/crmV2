import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CrudService } from '../services/crud.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-organization-register',
  templateUrl: './organization-register.component.html',
  styleUrls: ['./organization-register.component.css']
})
export class OrganizationRegisterComponent implements OnInit {

  constructor(private crudService: CrudService, private route: ActivatedRoute, private router: Router) {
    this.getterErp();
    this.getterRamo();
    this.getterOrgs();

  }

  selectRamo = false;

  orgapi: any;
  matdata: any;
  erroOrgs: any;
  disableCode: boolean = false;
  disableCode1: boolean = false;
  org = {
    id: 0 , codigo: '', razaosocial: '', nomefantasia: '', ramos: '',
    cnpj: '', ie: '', rua: '', complemento: '', bairro: '', cep: '',
    cidade: '', uf: '', telefone: '', erp: '', email: '', site: '',
    contatos: [], erpe: [], ramo: []
  };

  orgUpdate: any;

  contato = { nome: '', email: '', cargo: '', dep: '', birth: '', tel: '', cel: '', skp: '' }

  ramosapi: any;
  ramos = { desc: '' };

  erpsapi: any;
  erp = { codigo: '', desc: '', empresa: '' };

  code1: any;

  code2: any;

  ngOnInit() {
    this.loadOrg()
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

  loadOrg() {
    const id = this.route.snapshot.paramMap.get("id");
    console.log(id);

    this.getterOrg(id);
  }

  contatoDelete(item){
    let index = this.org.contatos.indexOf(item)
    console.log(this.org.contatos.indexOf(item));
    this.org.contatos.splice(index, 1);
  }

  getterOrg(id) {
    
    this.crudService.getOrg(id).subscribe(
      data => {
        this.orgUpdate = data;
        console.log(' Organização pega' , this.orgUpdate);
        console.log('teste' + this.orgUpdate.ramo)
        this.org = {
          id: this.orgUpdate.id,
          codigo: this.orgUpdate.codigo,
          razaosocial: this.orgUpdate.razaosocial,
          nomefantasia: this.orgUpdate.nomefantasia,

          ramos: this.orgUpdate.ramos,
          erp: this.orgUpdate.erp,

          cnpj: this.orgUpdate.cnpj,
          ie: this.orgUpdate.ie,
          rua: this.orgUpdate.rua,
          complemento: this.orgUpdate.complemento,
          bairro: this.orgUpdate.bairro,
          cep: this.orgUpdate.cep,
          cidade: this.orgUpdate.cidade,
          uf: this.orgUpdate.uf,
          telefone: this.orgUpdate.telefone,
          email: this.orgUpdate.email,
          site: this.orgUpdate.site,
          contatos: this.orgUpdate.contatos,

          erpe: this.orgUpdate.erpe,
          ramo: this.orgUpdate.ramo

        };

        console.log('dados da empresa', this.org.erpe)
        
      },
      error => {
        // this.erroAtividade = error;
      }
    );
  }

  generateCode1() {
    var a = this.orgapi;
    console.log(a.length);
    if (a.length > 0) {
      if (a.length < 9) {
        this.code1 = "000" + ++this.orgapi[0].codigo;
        this.org.codigo = this.code1;
        console.log(this.code1);
      } else if (a.length < 99) {
        this.code1 = "00" + ++this.orgapi[0].codigo;
        this.org.codigo = this.code1;
        console.log(this.code1);
      } else if (a.length < 999) {
        this.code1 = "0" + ++this.orgapi[0].codigo;
        this.org.codigo = this.code1;
        console.log(this.code1);
      } else {
        this.code1 = ++this.orgapi[0].codigo;
        this.org.codigo = this.code1;
        console.log(this.code1);
      }
    } else {
      this.code1 = "000" + 1;
      this.org.codigo = this.code1;
      console.log(this.code1);
    }
    this.disableCode = true;
  }
  generateCode2() {
    var a = this.erpsapi;
    if (a.length > 0) {
      if (a.length < 9) {
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
      this.code2 = "00" + 1;
      this.erp.codigo = this.code2;
      console.log(this.code2);
    }
    this.disableCode1 = true;
  }

  enableSelect(){
    this.selectRamo = true;
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
    this.crudService.getErpes().subscribe(
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
      nome: this.contato.nome,
      email: this.contato.email,
      cargo: this.contato.cargo,
      dep: this.contato.dep,
      birth: this.contato.birth,
      tel: this.contato.tel,
      skp: this.contato.skp,
      cel: this.contato.cel
    }

    this.org.contatos.push(contatovar)
    console.log(this.org);

    this.contato.nome = ''
    this.contato.email = ''
    this.contato.cargo = ''
    this.contato.dep = ''
    this.contato.birth = ''
    this.contato.tel = ''
    this.contato.cel = ''
    this.contato.skp = ''
  }

  exit() {
    this.router.navigate([`/company/`]);
  }

  saveRamo() {
    this.crudService.saveNewRamo(this.ramos).subscribe(
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

  saveErp() {
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

    if (this.contato.nome != '') {
      
      const contatovar = {
        nome: this.contato.nome,
        email: this.contato.email,
        cargo: this.contato.cargo,
        dep: this.contato.dep,
        birth: this.contato.birth,
        tel: this.contato.tel,
        skp: this.contato.skp,
        cel: this.contato.cel
      }

      this.org.contatos.push(contatovar)
      console.log(this.org);
    } 

    if (this.org.codigo === '') {
      swal({
        icon: "error",
        text: "Código deve ser preenchido!",
        timer: 1800,
        buttons: {
          buttons: false
        }
      });
    } else if (this.org.razaosocial === '') {
      swal({
        icon: "error",
        text: "Razão Social deve ser preenchida!",
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
    } else if (this.org.contatos.length === 0) {
      swal({
        icon: "error",
        text: "Adicione um contato!",
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
          console.log(data);
          this.exit();
        },
        error => {}
      );
    }

  }

  updateOrg() {
    //this.org.erpe.push(this.erp);
    //this.org.ramo.push(this.ramos);

    if(this.org.erp == undefined){
      this.org.erp = this.orgUpdate.erpe.id;
      console.log(this.org.erp)
    } else {
      console.log(this.org.erp)
    }


    if(this.org.ramos == undefined){
      this.org.ramos = this.orgUpdate.ramo.id;
      console.log(this.org.ramos)
    } else {
      console.log(this.org.ramos)
    }
    

    this.crudService.UpdateOrgMain(this.org).subscribe(
      data => {
        swal({
          icon: "success",
          text: "Empresa atualizada com sucesso!",
          timer: 1800,
          buttons: {
            buttons: false
          }
        });
        this.exit();
        console.log(data);
        console.log('atualizou')
      }, error => {
        console.log('nao atualizou')
        console.error(error);
      }
    )
  }

  maiuscula(value: string, id:number){
    var v = value.toUpperCase();
    if(id == 1){
      this.org.razaosocial = v
    } else if(id == 2) {
      this.org.nomefantasia = v
    } else if(id == 3) {
      this.org.rua = v
    } else if(id == 4) {
      this.org.bairro = v
    } else if(id == 5) {
      this.org.complemento = v
    } else if(id == 6) {
      this.org.cidade = v
    } else if(id == 7) {
      this.org.uf = v
    } else if (id== 10){
      this.contato.nome = v
    } else if (id== 12){
      this.contato.cargo = v
    } else if (id== 13){
      this.contato.dep = v
    } else if (id== 15){
      this.ramos.desc = v
    } else if (id== 16){
      this.erp.empresa = v
    } else if (id== 17){
      this.erp.desc = v
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
  }

  formatCellPhoneNumber(str) {
    //Filter only numbers from the input
    let cleaned = ('' + str).replace(/\D/g, '');
    //Check if the input is of correct length
    let match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    };
    return null
  }

  formatBirth(str) {
    //Filter only numbers from the input
    let cleaned = ('' + str).replace(/\D/g, '');
    //Check if the input is of correct length
    let match = cleaned.match(/^(\d{2})(\d{2})$/);
    if (match) {
      return match[1] + '/' + match[2]
    };
    return null
  }

  // addFields() {
  //   var currentDiv = document.getElementById('duplicate');
  //   var clonedDiv = currentDiv.cloneNode(true);
  //   currentDiv.parentNode.insertBefore(clonedDiv, currentDiv.nextSibling);
  // }

}
