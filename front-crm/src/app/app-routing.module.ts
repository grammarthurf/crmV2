import { BusinessComponent } from "./business/business.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AtividadesComponent } from "./atividades/atividades.component";
import { ProductsComponent } from "./products/products.component";
import { OrganizationComponent } from "./organization/organization.component";
import { BusinessDetailComponent } from "./business-detail/business-detail.component";
import { OrganizationDetailComponent } from './organization-detail/organization-detail.component';
import { UserComponent } from './user/user.component';
import { CalendarComponent } from './calendar/calendar.component';
import { OrganizationRegisterComponent } from './organization-register/organization-register.component';
import { ErpComponent } from './erp/erp.component';
import { RamoComponent } from './ramo/ramo.component';
import { LoginComponent } from './login/login.component';
import { VendedorComponent } from './vendedor/vendedor.component';
import { VendedorExternoComponent } from './vendedor-externo/vendedor-externo.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FunilComponent } from './funil/funil.component';
import { ProspeccoesComponent } from './prospeccoes/prospeccoes.component';
import { LeadsGanhasComponent } from './leads-ganhas/leads-ganhas.component';
import { LeadsPerdidasComponent } from './leads-perdidas/leads-perdidas.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full"
  },
  { path: 'dashboard', component: DashboardComponent, children: [
      { path: 'funil', component: FunilComponent },
      { path: 'prospeccoes', component: ProspeccoesComponent },
      { path: 'leads-ganhas', component: LeadsGanhasComponent },
      { path: 'leads-perdidas', component: LeadsPerdidasComponent },
    ]
  },
  {
    path: "business",
    component: BusinessComponent,
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
    path: "company",
    component: OrganizationComponent
  },
  {
    path: "company-detail/:id",
    component: OrganizationDetailComponent
  },
  {
    path: "company-register/:id",
    component: OrganizationRegisterComponent
  },
  {
    path: "company-register",
    component: OrganizationRegisterComponent
  },
  {
    path: "user",
    component: UserComponent
  },
  {
    path: "calendar",
    component: CalendarComponent
  },
  {
    path: "erp",
    component: ErpComponent
  },
  {
    path: "ramo",
    component: RamoComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "vendedor",
    component: VendedorComponent
  },
  {
    path: "vendedor-externo",
    component: VendedorExternoComponent
  },  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
