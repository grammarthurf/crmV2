import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.css']
})
export class OrganizationDetailComponent implements OnInit {

  org: any;

  constructor( private route: ActivatedRoute, private crudService: CrudService) {

   }


  loadOrg() {
    const id = this.route.snapshot.paramMap.get("id");
    this.getterOrg(id);

  }

  getterOrg(id) {
    this.crudService.getOrg(id).subscribe(
      data => {
        this.org = data;
        console.log(this.org);

      },
      error => {
        console.error(error);
      }
    );
  }

  ngOnInit() {
  this.loadOrg();
  }

}
