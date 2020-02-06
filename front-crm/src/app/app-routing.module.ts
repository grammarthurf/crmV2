import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtividadesComponent } from './atividades/atividades.component';


const routes: Routes = [
  { path: '', component: AtividadesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
