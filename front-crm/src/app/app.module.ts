import { HttpClient, HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AtividadesComponent, BottomSheetOverviewExampleSheet } from './atividades/atividades.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule} from '@angular/material/table';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { MatNativeDateModule} from '@angular/material';
import { MatDatepickerModule} from '@angular/material/datepicker';
import {MatDividerModule} from '@angular/material/divider';
import { BusinessComponent } from './business/business.component';
// import { DragDropModule } from '@angular/cdk/drag-drop';
import { CrudComponent } from "./components/crud/crud.component";

// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatMenuModule } from '@angular/material/menu';

// const modules = [
//   MatToolbarModule,
//   MatMenuModule
// ]

const appRoutes: Routes = [

  {path: 'app-atividades',
    component: AtividadesComponent
  },
  { path: '',
    redirectTo: '/app-atividades',
    pathMatch: 'full'
  }

];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AtividadesComponent,
    BottomSheetOverviewExampleSheet,
    BusinessComponent,
    CrudComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatBottomSheetModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDividerModule
  ],
  exports: [
    RouterModule
  ],
  entryComponents: [
    AtividadesComponent,
    BottomSheetOverviewExampleSheet,
    BrowserAnimationsModule,
    // DragDropModule
    HttpClientModule
    // modules
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {}
