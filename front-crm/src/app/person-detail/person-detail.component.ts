import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {

  person:any;

  constructor( private route: ActivatedRoute, private crudService: CrudService) {

   }


  loadPerson() {
    const id = this.route.snapshot.paramMap.get("id");
    this.getterPerson(id);

  }

  getterPerson(id) {
    this.crudService.getPerson(id).subscribe(
      data => {
        this.person = data;
        console.log(this.person);

      },
      error => {
        console.error(error);
      }
    );
  }

  ngOnInit() {
  this.loadPerson();
  }

}
