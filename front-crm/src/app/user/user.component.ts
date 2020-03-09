import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: any;
  user:any;
  negociosapi: any;
  atvapi: any;

  constructor(private route: ActivatedRoute, private crudService: CrudService) {
    this.getterTickets();
    this.getterActivity();
  }

  ngOnInit() {
    this.loadUser();
  }

  loadUser(){
    const id = this.route.snapshot.paramMap.get("id");
    this.getterUser(id);
  }

  getterUser(id) {
    this.crudService.getVendedores(id).subscribe(
      data => {
        this.user = data;
        console.log(this.user);

      },
      error => {
        console.error(error);
      }
    );
  }

  getterTickets() {
    this.crudService.getTickets().subscribe(
      data => {
        this.negociosapi = data;
        console.log(this.negociosapi)
      },
      error => {
        console.error(error);
      }
    );
  }

  getterActivity() {
    this.crudService.getAtividade().subscribe(
      data => {
        this.atvapi = data;
        console.log(this.atvapi)
      },
      error => {
        console.error(error);
      }
    );
  }

}
