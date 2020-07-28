import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OrcFormComponent } from './components/orc-form/orc-form.component';
import { OrcListComponent } from './components/orc-list/orc-list.component';
import {RouterModule} from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    OrcFormComponent,
    OrcListComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: OrcListComponent, pathMatch: 'full'},
      {path: 'orc-list', component: OrcListComponent},
      {path: 'orc-form', component: OrcFormComponent},
      {path: 'orc-form/:id', component: OrcFormComponent},
    ]),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
