import { BusinessComponent } from "./business/business.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CrudComponent } from "./components/crud/crud.component";
import { AtividadesComponent } from "./atividades/atividades.component";
import { ProductsComponent } from "./products/products.component";
import { OrganizationComponent } from "./organization/organization.component";
import { BusinessDetailComponent } from "./business-detail/business-detail.component";
import { PersonComponent } from "./person/person.component";

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
    path: "company",
    component: OrganizationComponent
  },
  {
    path: "testapi",
    component: CrudComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
