import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { EditarPreguntaComponent } from './editar-pregunta/editar-pregunta.component';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ResponderPreguntaComponent } from './responder-pregunta/responder-pregunta.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'busqueda', component: BusquedaComponent },
  { path: 'editar-pregunta', component: EditarPreguntaComponent },
  { path: 'responder-pregunta', component: ResponderPreguntaComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
