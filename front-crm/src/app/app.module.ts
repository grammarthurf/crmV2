import { CrudService } from './services/crud.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LottieAnimationViewModule } from 'ng-lottie';
import { LOCALE_ID } from '@angular/core';

// ROUTES
import { AppRoutingModule } from "./app-routing.module";
// import { RouterModule } from "@angular/router";

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
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';


//CALENDAR
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FullCalendarModule } from '@fullcalendar/angular';

//MASK
import { NgxCurrencyModule } from "ngx-currency";

//DRAG AND DROP
import {DragDropModule} from '@angular/cdk/drag-drop';

// COMPONENTS
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { AtividadesComponent } from "./atividades/atividades.component";
import { BusinessComponent } from "./business/business.component";
import { ProductsComponent } from "./products/products.component";
import { OrganizationComponent } from "./organization/organization.component";
import { BusinessDetailComponent } from "./business-detail/business-detail.component";
import { NgxMaskModule } from 'ngx-mask';
import { OrganizationDetailComponent } from './organization-detail/organization-detail.component';
import { CalendarComponent } from './calendar/calendar.component'
import { UserComponent } from './user/user.component'
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { OrganizationRegisterComponent } from './organization-register/organization-register.component';
import { ErpComponent } from './erp/erp.component';
import { RamoComponent } from './ramo/ramo.component';
import { LoginComponent } from './login/login.component';
import { VendedorComponent } from './vendedor/vendedor.component';
import { VendedorExternoComponent } from './vendedor-externo/vendedor-externo.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AtividadesComponent,
    BusinessComponent,

    ProductsComponent,
    OrganizationComponent,
    BusinessDetailComponent,
    OrganizationDetailComponent,
    UserComponent,
    CalendarComponent,
    OrganizationRegisterComponent,
    ErpComponent,
    RamoComponent,
    LoginComponent,
    VendedorComponent,
    VendedorExternoComponent
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
    LottieAnimationViewModule.forRoot(),
    NgxCurrencyModule,
    MatTabsModule,
    MatChipsModule,
    MatListModule,
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  providers: [
    CrudService,
    CookieService,
    HttpClient,
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
