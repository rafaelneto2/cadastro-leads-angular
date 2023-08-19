import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LeadsListComponent} from './leads/leads-list/leads-list.component';
import {LeadsFormComponent} from './leads/leads-form/leads-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule, RouterOutlet} from "@angular/router";
import {routing} from './app.routing'
import {PaginationModule} from "ngx-bootstrap/pagination";
import {HttpClientModule} from '@angular/common/http';
import {CpfCnpjPipe} from "./pipe/CpfCnpjPipe";
import {CepPipe} from "./pipe/CepPipe";
import {NgxMaskModule} from "ngx-mask";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    LeadsListComponent,
    LeadsFormComponent,
    CpfCnpjPipe,
    CepPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterOutlet,
    routing,
    RouterModule,
    PaginationModule.forRoot(),
    HttpClientModule,
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
