import { PersonDetailComponent } from './person-detail/person-detail.component';
import { BusinessComponent } from "./business/business.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CrudComponent } from "./components/crud/crud.component";
import { AtividadesComponent } from "./atividades/atividades.component";
import { ProductsComponent } from "./products/products.component";
import { OrganizationComponent } from "./organization/organization.component";
import { BusinessDetailComponent } from "./business-detail/business-detail.component";
import { PersonComponent } from "./person/person.component";
import { OrganizationDetailComponent } from './organization-detail/organization-detail.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/business",
    pathMatch: "full"
  },
  {
    path: "business",
    component: BusinessComponent
  },
  {
    path: "business-detail/:id",
    component: BusinessDetailComponent
  },
  {
    path: "activity",
    component: AtividadesComponent
  },
  {
    path: "products",
    component: ProductsComponent
  },
  {
    path: "person",
    component: PersonComponent
  },
  {
    path: "person-detail/:id",
    component: PersonDetailComponent
  },
  {
    path: "company",
    component: OrganizationComponent
  },
  {
    path: "company-detail/:id",
    component: OrganizationDetailComponent
  },
  {
    path: "testapi",
    component: CrudComponent
  },
  {
    path: "user",
    component: UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
