import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import '@angular/common/locales/global/es'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { HeaderComponent } from './header/header.component';
import { EditarPreguntaComponent } from './editar-pregunta/editar-pregunta.component';
import { ResponderPreguntaComponent } from './responder-pregunta/responder-pregunta.component';
import { PerfilComponent } from './perfil/perfil.component';
import { HttpClientModule } from "@angular/common/http";
import { UsuarioService } from './usuario.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    BusquedaComponent,
    HeaderComponent,
    EditarPreguntaComponent,
    ResponderPreguntaComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
