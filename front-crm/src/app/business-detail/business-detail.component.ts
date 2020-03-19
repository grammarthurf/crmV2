import { Component, OnInit } from "@angular/core";
import { CrudService } from "../services/crud.service";
import { ActivatedRoute } from "@angular/router";
import { Router, Data } from "@angular/router";
import swal from 'sweetalert';
import listPlugin from '@fullcalendar/list';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: "app-business-detail",
  templateUrl: "./business-detail.component.html",
  styleUrls: ["./business-detail.component.css"]
})

export class BusinessDetailComponent implements OnInit {
  id: any;

  business: any;
  estagiosapi: any;
  calendarPlugins: any = [];

  public lottieConfig: Object;
  private anim: any;

  numm: number;
  idobs = { id: '', obs: '', term: '', mtvperd: '', cmtperd: '' };

  clientName: '';

  calendarEvents = [
    { title: 'event 1', start: '2020-03-02T10:00', end: '2020-03-01' }
  ];

  constructor(private route: ActivatedRoute, private crudService: CrudService, private router: Router) {
    this.lottieConfig = {
      path: 'assets/bike.json',
      renderer: 'canvas',
      autoplay: false,
      loop: false
    };

    this.getterEstagio();
    this.loadBusiness();
    this.calendarPlugins = [ listPlugin , bootstrapPlugin ];
  }

  // UPDATE STATUS LEADS
  updatedTicketStatus(ticket) {
    this.crudService.updateTicketDetails(ticket, this.idobs.mtvperd, this.idobs.cmtperd).subscribe(
      data => {}, 
      error => {}
    );
  }

  // UPDATE TERM LEADS
  updateTicketTerm() {
    this.idobs.id = this.business.id;
    this.crudService.updateTicketTerm(this.idobs).subscribe(
      data => {}, error => {}
    );
  }

  // UPDATE OBS LEADS
  updateTicketObs() {
    this.idobs.id = this.business.id;

    this.crudService.updateTicketObs(this.idobs).subscribe(
      data => {
        this.loadBusiness();
        this.idobs.obs = '';
        swal({
          icon: "success",
          text: "Observação adicionada com sucesso!",
          timer: 1450,
          buttons: {
            buttons: false
          }
        });
      }, error => {}
    );
  }

  // LOAD BUSINESS
  loadBusiness() {
    const id = this.route.snapshot.paramMap.get("id");
    this.getterTicket(id);
  }

  // GET LEADS
  getterTicket(id) {
    this.crudService.getTicket(id).subscribe(
      data => {
        this.business = data;
        this.reverseArray()
        if (this.business.status == 'Ganhou') {
          this.stageWin();
        } else if (this.business.status == 'Perdido') {
          this.stageLose();
        } else {
          this.stageNull();
        }
        this.clientName = this.business.cliente.nome.split(" ", 1);
      },
      error => {}
    );
  }

  // ANIMATION
  handleAnimation(anim: any) {
    this.anim = anim;
  }

  // STOP ANIMATION
  stop() {
    this.anim.stop();
  }

  // PLAY ANIMATION
  play() {
    this.anim.play();
  }

  // PAUSE ANIMATION
  pause() {
    this.anim.pause();
  }

  // PLAY ANIMATION WHEN WIN TICKET
  ganhou() {
    this.play()
  }

  // GET STAGE
  getterEstagio() {
    this.crudService.getEstagios().subscribe(
      data => {
        this.estagiosapi = data;
      },
      error => {}
    );
  }

  // UPDATE LEAD
  updatedTicket(id, ticket) {
    this.crudService.updateTicket(id, ticket).subscribe(
      data => {}, 
      error => {}
    )
  }

  // CHANGE ID TICKET
  changeid(idd: number) {
    if (idd == 1) {
      this.business.estagio.id = 1;
      this.updatedTicket(this.business.estagio.id , this.business)
    } else if (idd == 2) {
      this.business.estagio.id = 2;
      this.updatedTicket(this.business.estagio.id , this.business)
    } else if (idd == 3) {
      this.business.estagio.id = 3;
      this.updatedTicket(this.business.estagio.id , this.business)
    } else if (idd == 4) {
      this.business.estagio.id = 4;
      this.updatedTicket(this.business.estagio.id , this.business)
    } else if (idd == 5) {
      this.business.estagio.id = 5;
      this.updatedTicket(this.business.estagio.id , this.business)
    } else if (idd == 7) {
      this.business.estagio.id = 7;
      this.updatedTicket(this.business.estagio.id , this.business)
    } else if (idd == 8) {
      this.business.estagio.id = 8;
      this.updatedTicket(this.business.estagio.id , this.business)
    }
  }

  // CHANGE STYLES BUTTONS WIN/LOSE
  stageWin() {
    let btnLose = document.getElementById('lose');
    let btnWin = document.getElementById('win');
    btnLose.style.display = 'none';

    let btnNull = document.getElementById('null');
    btnNull.style.display = 'block';

    btnWin.style.borderRadius = '20px';
    btnWin.style.cursor = 'none';
    btnWin.style.outline = 'none';
    if (this.business.status != 'Ganhou') {
      this.business.status = 'Ganhou';
      this.business.estagio.id = 8;
      this.updatedTicket(this.business.estagio.id , this.business)
    }
    this.play();
    setTimeout(() => {
      this.stop()
    }, 5000);
  }

  // CHANGE STYLES BUTTONS WIND/LOSE
  stageLose() {
    let btnWin = document.getElementById('win');
    let btnLose = document.getElementById('lose');
    btnWin.style.display = 'none';

    let btnNull = document.getElementById('null');
    btnNull.style.display = 'block';

    btnLose.style.borderRadius = '20px';
    btnLose.style.cursor = 'none';
    btnLose.style.outline = 'none';
    if (this.business.status != 'Perdido') {
      this.business.status = 'Perdido';
      this.business.mtvperd = this.idobs.mtvperd;
      this.business.cmtperd = this.idobs.cmtperd;
      this.updatedTicketStatus(this.business);
    }
  }

  // CHANGE STYLES BUTTONS WIND/LOSE
  stageNull() {
    let btnWin = document.getElementById('win');
    let btnLose = document.getElementById('lose');
    let btnNull = document.getElementById('null');
    btnWin.style.display = 'block';
    btnLose.style.display = 'block';
    btnNull.style.display = 'none';

    btnWin.style.borderRadius = '5px';
    btnWin.style.cursor = 'pointer';
    btnWin.style.outline = 'solid';

    btnLose.style.borderRadius = '5px';
    btnLose.style.cursor = 'pointer';
    btnLose.style.outline = 'solid';
    if (this.business.status != 'Aberto') {
      this.business.status = 'Aberto';
      this.updatedTicketStatus(this.business);
    }
  }

  // REVERSE OBS
  reverseArray() {
    let arrayObs = [];
    arrayObs = this.business.obs;
    arrayObs.reverse()
  }

  // FORMAT DATE BR
  formatDate(date) {
    let result = date.split('-').reverse().join('/');

    return result
  }

  // GO TO COMPANY DETAIL SCREEN
  goTo(id) {
    this.router.navigate([`/company-detail/${id}`]);
  }


  ngOnInit() {

  }

  // TRANSFORM CAPITAL LETTER
  maiuscula(value: string){
    var v = value.toUpperCase();
    this.idobs.obs = v;
  }
  
  // FORMAT PHONE NUMBER
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

  // FORMAT CELL NUMBER
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

  cancelObs() {
    this.idobs.obs = '';
  }

  Print(){
    var myWindow=window.open('','','width=1500,height=800');
    myWindow.document.write(
      "<h1 style='text-align: center;'>" + this.business.titulo +"</h1>" +
      "<h3> Informações do Negócio: </h3>" + 
      "<div>" + 
        "<ul style='list-style-type: none;'>" +
          "<li style='margin-top: 20px; border-bottom: 1px solid #DDDDDD;'>Valor Estimado: R$ "
            + this.business.valorestimado + 
          ",00</li><li style='margin-top: 20px; border-bottom: 1px solid #DDDDDD;'>Estagio: " 
            + this.business.estagio.nome +
          "</li><li style='margin-top: 20px; border-bottom: 1px solid #DDDDDD;'>Produto: "
            + this.business.produto[0].nome + 
          "</li><li style='margin-top: 20px; border-bottom: 1px solid #DDDDDD;'>Última Observação:  " 
            + this.business.obs[0].texto + " (" + this.business.obs[0].data + ")" +
          "</li><li style='margin-top: 20px; border-bottom: 1px solid #DDDDDD;'>Criado em:  " 
            + this.business.created.datetime +
          "</li>" +
        "</ul>" +
      "</div>" +
      "<h3> Informações da Empresa: </h3>" + 
      "<div>" +
        "<ul style='list-style-type: none;'>" +
          "<li style='margin-top: 20px; border-bottom: 1px solid #DDDDDD;'>Código:  " 
            + this.business.org.codigo +
          "</li><li style='margin-top: 20px; border-bottom: 1px solid #DDDDDD;'>Razão Social: " 
            + this.business.org.razaosocial +
          "<li style='margin-top: 20px; border-bottom: 1px solid #DDDDDD;'>Nome Fantasia: " 
            + this.business.org.nomefantasia +
          "</li><li style='margin-top: 20px; border-bottom: 1px solid #DDDDDD;'>Estado: " 
            + this.business.org.uf +
          "</li> <li style='margin-top: 20px; border-bottom: 1px solid #DDDDDD;'>Cidade: " 
            + this.business.org.cidade + 
          "</li><li style='margin-top: 20px; border-bottom: 1px solid #DDDDDD;'>Bairro: " 
            + this.business.org.bairro + 
          "</li><li style='margin-top: 20px; border-bottom: 1px solid #DDDDDD;'>Rua: " 
            + this.business.org.rua + 
          "</li><li style='margin-top: 20px; border-bottom: 1px solid #DDDDDD;'>Complemento: " 
            + this.business.org.complemento +
          "</li><li style='margin-top: 20px; border-bottom: 1px solid #DDDDDD;'>CEP: " 
            + this.business.org.cep +
          "</li><li style='margin-top: 20px; border-bottom: 1px solid #DDDDDD;'>ERP:  " 
            + this.business.org.erpe.desc +
          "</li><li style='margin-top: 20px; border-bottom: 1px solid #DDDDDD;'>CNPJ: " 
            + this.business.org.cnpj +
          "</li><li style='margin-top: 20px; border-bottom: 1px solid #DDDDDD;'>IE: " 
            + this.business.org.ie +
          "</li>" +
        "</ul>" +
      "</div>" +
      "<h3> Informações do Contato: </h3>" +
      "<div>" +
        "<ul style='list-style-type: none;'>" +
          "<li style='margin-top: 20px; border-bottom: 1px solid #DDDDDD;'>Nome:  " 
            + this.business.cliente.nome +
          "</li><li style='margin-top: 20px; border-bottom: 1px solid #DDDDDD;'>Cargo: " 
            + this.business.cliente.cargo +
          "<li style='margin-top: 20px; border-bottom: 1px solid #DDDDDD;'>Telefone: " 
            + this.business.cliente.tel +
          "</li><li style='margin-top: 20px; border-bottom: 1px solid #DDDDDD;'>Celular: " 
            + this.business.cliente.cel +
          "</li><li style='margin-top: 20px; border-bottom: 1px solid #DDDDDD;'>Departamento: " 
            + this.business.cliente.dep + 
          "</li><li style='margin-top: 20px; border-bottom: 1px solid #DDDDDD;'>Email: " 
            + this.business.cliente.email +
          "</li><li style='margin-top: 20px; border-bottom: 1px solid #DDDDDD;'>Skype: " 
            + this.business.cliente.skype + 
          "</li><li style='margin-top: 20px; border-bottom: 1px solid #DDDDDD;'>Data de Nascimento: "
            + this.business.cliente.birth + 
          "</li>" +
        "</ul>" +
      "</div>"
    );
    
    myWindow.document.close();
    myWindow.focus();
    myWindow.print();
    myWindow.close();
  }
}
