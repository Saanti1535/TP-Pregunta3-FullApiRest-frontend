import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { EditarPreguntaComponent } from './editar-pregunta/editar-pregunta.component';
import { LoginComponent } from './login/login.component';
import { NuevaPreguntaComponent } from './nueva-pregunta/nueva-pregunta.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ResponderPreguntaComponent } from './responder-pregunta/responder-pregunta.component';
import { SinUsuarioGuard } from './sin-usuario.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'busqueda', component: BusquedaComponent,  canActivate: [SinUsuarioGuard] },
  { path: 'editar-pregunta/:id', component: EditarPreguntaComponent,  canActivate: [SinUsuarioGuard] },
  { path: 'responder-pregunta/:id', component: ResponderPreguntaComponent,  canActivate: [SinUsuarioGuard] },
  { path: 'perfil', component: PerfilComponent,  canActivate: [SinUsuarioGuard] },
  { path: 'nueva-pregunta', component: NuevaPreguntaComponent,  canActivate: [SinUsuarioGuard] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
