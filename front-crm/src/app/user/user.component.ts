import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { ActivatedRoute } from '@angular/router';
import {FormControl} from "@angular/forms";

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
  InitList: boolean = true;
  fltr: boolean = false

  filter: any = {inicio: '', fim: ''};

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

  Filtrar(){
    this.InitList = false;
    this.fltr = true;
  }

  Filtrar1(){
    this.InitList = true;
    this.fltr = false;
  }

  dataCheck(data){

    var yIniF = this.filter.inicio.substring(0,4);
    var yEndF = this.filter.fim.substring(0,4);

    var mIniF = this.filter.inicio.substring(5,7);
    var mEndF = this.filter.fim.substring(5,7);
    
    var dIniF = this.filter.inicio.substring(8,10);
    var dEndF = this.filter.fim.substring(8,10);

    var year1 = data.substring(0,4);
    var month1 = data.substring(5,7);
    var day1 = data.substring(8,10);

    if((yIniF > year1) || (yIniF == year1 && mIniF > month1) || (yIniF == year1 && mIniF == month1 && dIniF > day1)){
      return false;
    } else if ((yEndF > year1) || (yEndF == year1 && mEndF > month1) || (yEndF == year1 && mEndF == month1 && dEndF >= day1)){
      return true;
    }
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
