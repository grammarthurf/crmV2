import { BusinessComponent } from "./business/business.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CrudComponent } from "./components/crud/crud.component";
import { AtividadesComponent } from "./atividades/atividades.component";
import { ProductsComponent } from "./products/products.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { OrganizationComponent } from "./organization/organization.component";
import { BusinessDetailComponent } from "./business-detail/business-detail.component";

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
    path: "business-detail",
    component: BusinessDetailComponent
  },
  {
    path: 'activity',
    component: AtividadesComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'contacts',
    component: ContactsComponent
  },
  {
    path: 'organization',
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
