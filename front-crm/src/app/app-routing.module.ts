import { BusinessComponent } from "./business/business.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CrudComponent } from "./components/crud/crud.component";
import { AtividadesComponent } from "./atividades/atividades.component";

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
    path: 'activity',
    component: AtividadesComponent
  },
  // {
  //   path: 'produtos',
  //   component: ProdutoComponent
  // },
  // {
  //   path: 'contatos',
  //   component: ContatoComponent
  // },
  // {
  //   path: 'org',
  //   component: OrgComponent
  // },
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
