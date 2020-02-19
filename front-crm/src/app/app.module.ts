import { HttpClient, HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LottieAnimationViewModule } from 'ng-lottie';

// ROUTES
import { AppRoutingModule } from "./app-routing.module";
//import { RouterModule } from "@angular/router";

// ANGULAR MATERIAL
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatNativeDateModule } from "@angular/material";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDividerModule } from "@angular/material/divider";
import { MatSortModule } from "@angular/material/sort";

//CALENDAR
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

//DRAG AND DROP
import {DragDropModule} from '@angular/cdk/drag-drop';

// COMPONENTS
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { AtividadesComponent } from "./atividades/atividades.component";
import { BusinessComponent } from "./business/business.component";
import { CrudComponent } from "./components/crud/crud.component";
import { ProductsComponent } from "./products/products.component";
import { OrganizationComponent } from "./organization/organization.component";
import { BusinessDetailComponent } from "./business-detail/business-detail.component";
import { PersonComponent } from "./person/person.component";
import { NgxMaskModule } from 'ngx-mask';
import { OrganizationDetailComponent } from './organization-detail/organization-detail.component';
import { PersonDetailComponent } from './person-detail/person-detail.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AtividadesComponent,
    BusinessComponent,
    CrudComponent,
    ProductsComponent,
    OrganizationComponent,
    BusinessDetailComponent,
    PersonComponent,
    OrganizationDetailComponent,
    PersonDetailComponent
  ],
  imports: [
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
    MatDividerModule,
    MatSortModule,
    HttpClientModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    DragDropModule,
    LottieAnimationViewModule.forRoot()
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {}
