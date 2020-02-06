import { HttpClient, HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BusinessComponent } from './business/business.component';
// import { DragDropModule } from '@angular/cdk/drag-drop';
import { CrudComponent } from "./components/crud/crud.component";

// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatMenuModule } from '@angular/material/menu';

// const modules = [
//   MatToolbarModule,
//   MatMenuModule
// ]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BusinessComponent,
    CrudComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // DragDropModule
    HttpClientModule
    // modules
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {}
