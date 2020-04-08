import { Component, OnInit } from "@angular/core";
import { CrudService } from "../services/crud.service";
import { ActivatedRoute } from "@angular/router";
import { Router, Data } from "@angular/router";
import swal from 'sweetalert';
import listPlugin from '@fullcalendar/list';
import bootstrapPlugin from '@fullcalendar/bootstrap';


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

  file: File = null
  filetitle: string;


  constructor(private route: ActivatedRoute, private crudService: CrudService, private router: Router) {
    this.lottieConfig = {
      path: 'assets/trophy.json',
      renderer: 'canvas',
      autoplay: false,
      loop: false
    };

    this.getterEstagio();
    this.loadBusiness();
    this.calendarPlugins = [listPlugin, bootstrapPlugin];
  }

  changeContato(e) {
    console.log(e);
    this.business.cliente = { id: e };
    console.log(this.business);



  }

  onFileSelected(e) {
    this.file = e.target.files[0];

  }

  files(e) {
    this.filetitle = e;

  }

  onUpload() {
    if (this.filetitle && this.file) {
      this.crudService.updateFile(this.business.id, this.file, this.filetitle).subscribe(data => {
        console.log(data);
        swal({
          icon: "success",
          text: "Anexo salvo com sucesso!",
          timer: 1450,
          buttons: {
            buttons: false
          }
        });
        setTimeout(() => {
          this.reiniciar()
        }, 600)
      }, err => {
        console.error(err);
      });
    } else {
      swal({
        icon: "error",
        text: "Digte um titulo e escolha um arquivo !",
        timer: 1450,
        buttons: {
          buttons: false
        }
      });
    }
  }

  reiniciar() {
    location.reload()
  }

  // UPDATE STATUS LEADS
  updatedTicketStatus(ticket) {
    this.crudService.updateTicketDetails(ticket, this.idobs.mtvperd, this.idobs.cmtperd).subscribe(
      data => { },
      error => { }
    );
  }

  // UPDATE TERM LEADS
  updateTicketTerm() {
    this.idobs.id = this.business.id;
    this.crudService.updateTicketTerm(this.idobs).subscribe(
      data => { }, error => { }
    );
  }

  updateTicketTitle() {
    // console.log("business: ", this.business.termometro);
    console.log("business: ", this.business);


    this.crudService.updateTicketTitle(this.business.id, this.business.titulo, this.business.valorestimado, this.business.cliente).subscribe(
      data => {
        console.log(data);
        swal({
          icon: "success",
          text: "Informações alteradas com sucesso!",
          timer: 1450,
          buttons: {
            buttons: false
          }
        });
      }, error => {
        console.log(error);
      }
    );
  }

  // UPDATE OBS LEADS
  updateTicketObs() {
    this.idobs.id = this.business.id;
    console.log('OBSERVAÇÕES', this.business.obs)
    console.log('ID OBS: ', this.idobs.obs)

    if (this.idobs.obs) {
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
        }, error => { }
      );
    } else {
      swal({
        icon: "error",
        text: "Campo está vazio!",
        timer: 1450,
        buttons: {
          buttons: false
        }
      });
    }
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

        console.log(this.business);

        this.reverseArray(this.business.obs)
        if (this.business.status == 'Ganhou') {
          this.stageWin();
        } else if (this.business.status == 'Perdido') {
          this.stageLose();
        } else {
          this.stageNull();
        }
        // this.clientName = this.business.cliente.nome.split(" ", 1);
      },
      error => { }
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

  destroy() {
    this.anim.destroy();
  }

  // PLAY ANIMATION WHEN WIN TICKET
  ganhou() {
    this.play();
  }

  // GET STAGE
  getterEstagio() {
    this.crudService.getEstagios().subscribe(
      data => {
        this.estagiosapi = data;
      },
      error => { }
    );
  }

  // UPDATE LEAD
  updatedTicket(id, ticket) {
    this.crudService.updateTicket(id, ticket).subscribe(
      data => { },
      error => { }
    )
  }

  // CHANGE ID TICKET
  changeid(idd: number) {
    if (idd == 1) {
      this.business.estagio.id = 1;
      this.updatedTicket(this.business.estagio.id, this.business)
    } else if (idd == 2) {
      this.business.estagio.id = 2;
      this.updatedTicket(this.business.estagio.id, this.business)
    } else if (idd == 3) {
      this.business.estagio.id = 3;
      this.updatedTicket(this.business.estagio.id, this.business)
    } else if (idd == 4) {
      this.business.estagio.id = 4;
      this.updatedTicket(this.business.estagio.id, this.business)
    } else if (idd == 5) {
      this.business.estagio.id = 5;
      this.updatedTicket(this.business.estagio.id, this.business)
    } else if (idd == 7) {
      this.business.estagio.id = 7;
      this.updatedTicket(this.business.estagio.id, this.business)
    } else if (idd == 8) {
      this.business.estagio.id = 8;
      this.updatedTicket(this.business.estagio.id, this.business)
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
      this.updatedTicket(this.business.estagio.id, this.business)
    }
    this.play();
    setTimeout(() => {
      this.destroy();
    }, 4000);
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
  reverseArray(array) {
    let arrayObs = [];
    arrayObs = array;
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
  maiuscula(value: string, id: number) {
    var v = value.toUpperCase();

    if (id == 1) {
      this.idobs.obs = v;
    } else (id == 2)
    this.business.titulo = v

    // this.idobs.obs = v;
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

  formatBirthday(str) {
    const re = /^(\d{2})(\d{2})$/;

    const [, day, month] = str.match(re);

    const result = `${day}/${month}`;

    return result
  }

  cancelObs() {
    this.idobs.obs = '';
  }

}
