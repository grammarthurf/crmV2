import { Component, OnInit } from "@angular/core";
import { CrudService } from "../services/crud.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-business-detail",
  templateUrl: "./business-detail.component.html",
  styleUrls: ["./business-detail.component.css"]
})

export class BusinessDetailComponent implements OnInit {
  id: any;
  business: any;
  estagiosapi: any;

  public lottieConfig: Object;
  private anim: any;

  numm: number;

  businesss = { id: "", titulo: '', valorestimado: '', termometro: '', obs: '', status: '', estagio: '', cliente: '', org: '', vendedor: '', created: '', updated: '', produto: ''};

  constructor(private route: ActivatedRoute, private crudService: CrudService) {
    this.lottieConfig = {
      path: 'assets/bike.json',
      renderer: 'canvas',
      autoplay: false,
      loop: false
    };
    
    this.getterEstagio()
  }

  updatedTicketStatus(ticket) {
    this.crudService.updateTicketDetails(ticket).subscribe(
      data => {
        console.log(data);
      }, error => {
        console.error(error);
      }
    );
  }

  loadBusiness() {
    const id = this.route.snapshot.paramMap.get("id");
    this.getterTicket(id);
  }

  getterTicket(id) {
    this.crudService.getTicket(id).subscribe(
      data => {
        this.business = data;
        if (this.business.status == 'Ganhou') {
          this.stageWin();
        } else if ( this.business.status == 'Perdido') {
          this.stageLose();
        } else {
          this.stageNull();
        }
        console.log("id", data);
      },
      error => {
        console.error(error);
      }
    );
  }

  handleAnimation(anim: any) {
    this.anim = anim;
  }

  stop() {
    this.anim.stop();
  }

  play() {
    this.anim.play();
  }

  pause() {
    this.anim.pause();
  }

  ganhou() {
    this.play()
  }

  getterEstagio() {
    this.crudService.getEstagios().subscribe(
      data => {
        this.estagiosapi = data;
        console.log("idest", data);
      },
      error => {
        console.error(error);
      }
    );
  }

  changeid(idd: number) {
    if (idd == 2) {
      this.id = 2;
    } 
  }

  stageWin() {
    let btnLose = document.getElementById('lose');
    let btnWin = document.getElementById('win');
    btnLose.style.display = 'none';
    console.log('GANHOU!!!!');

    let btnNull = document.getElementById('null');
    btnNull.style.display = 'block';

    btnWin.style.borderRadius = '20px';
    btnWin.style.cursor = 'none';
    btnWin.style.outline = 'none';
    this.business.status = 'Ganhou';
    this.updatedTicketStatus(this.business);

    this.play();
    setTimeout(() => {
      this.stop()
      console.log('funcionou')
    }, 5000);
  }

  stageLose() {
    let btnWin = document.getElementById('win');
    let btnLose = document.getElementById('lose');
    btnWin.style.display = 'none';
    console.log('PERDEU!!!!');

    let btnNull = document.getElementById('null');
    btnNull.style.display = 'block';

    btnLose.style.borderRadius = '20px';
    btnLose.style.cursor = 'none';
    btnLose.style.outline = 'none';
    this.business.status = 'Perdido';
    this.updatedTicketStatus(this.business);
  }

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
    this.business.status = 'Aberto';
    this.updatedTicketStatus(this.business);
  }


  ngOnInit() {
    this.loadBusiness();
  }
}