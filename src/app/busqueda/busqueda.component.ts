import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pregunta } from 'src/dominio/pregunta';
import { Usuario } from 'src/dominio/usuario';
import { PreguntaService } from '../pregunta.service';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  checkBoxActivado: boolean = false
  usuarioLogueado: Usuario
  constructor(private router: Router, public preguntaService: PreguntaService, public usuarioService: UsuarioService) { }

  async ngOnInit() {
    document.getElementById('elFooter').style.position = 'relative';
    this.preguntaService.cargarPreguntas(this.checkBoxActivado);
    this.usuarioLogueado = await this.usuarioService.buscarUsuarioPorId(this.usuarioService.usuarioLogueadoId)
  }

  editar(): void {
    this.router.navigate(['/editar-pregunta'])
  }

  get preguntas(): Pregunta[] {
    return this.preguntaService.listaDePreguntas
  }

  async buscar(busqueda: HTMLInputElement){
    this.preguntaService.filtrarPreguntas(busqueda.value, this.checkBoxActivado)   
  }

  nuevaPregunta(){
    this.router.navigate(['/nueva-pregunta'])
  }
  // async recargarPreguntas(){
  //   this.preguntaService.soloActivas = this.checkBoxActivado
  //   this.preguntaService.cargarPreguntas()
  // }


}
