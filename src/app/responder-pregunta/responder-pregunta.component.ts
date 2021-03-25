import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PreguntaService } from '../pregunta.service';
import * as $ from 'jquery';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-responder-pregunta',
  templateUrl: './responder-pregunta.component.html',
  styleUrls: ['./responder-pregunta.component.css']
})
export class ResponderPreguntaComponent implements OnInit {
  pregunta = this.preguntaService.preguntaActual

  constructor(private router: Router, public preguntaService: PreguntaService, public usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  get opciones(): String[] {
    return this.pregunta.opciones;
  }

  async aceptar() {
    const respuesta=$('input:radio[name=opciones]:checked').val()
    if(respuesta != undefined) {
      const idUsuario=this.usuarioService.usuarioLogueado.id
      const resultado = await this.preguntaService.revisarRespuesta(respuesta.toString(), idUsuario)
      window.alert(resultado)
      this.router.navigate(['/busqueda'])
    }else{
      window.alert('Debe seleccionar una respuesta')
    }
  }

  cancelar() {
    this.router.navigate(['/busqueda'])
  }
}
