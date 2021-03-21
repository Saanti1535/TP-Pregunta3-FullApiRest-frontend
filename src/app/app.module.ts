import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { HeaderComponent } from './header/header.component';
import { EditarPreguntaComponent } from './editar-pregunta/editar-pregunta.component';
import { ResponderPreguntaComponent } from './responder-pregunta/responder-pregunta.component';
import { PerfilComponent } from './perfil/perfil.component';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
