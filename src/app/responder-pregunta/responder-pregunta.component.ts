import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PreguntaService } from '../pregunta.service';
import * as $ from 'jquery';
import { UsuarioService } from '../usuario.service';
import { generarCartelDeAlerta } from '../configuration';
import { Pregunta } from 'src/dominio/pregunta';

@Component({
  selector: 'app-responder-pregunta',
  templateUrl: './responder-pregunta.component.html',
  styleUrls: ['./responder-pregunta.component.css']
})
export class ResponderPreguntaComponent implements OnInit {
  pregunta = new Pregunta()
  constructor(private router: Router, private route: ActivatedRoute, public preguntaService: PreguntaService, public usuarioService: UsuarioService) { }

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pregunta = await this.preguntaService.getPreguntaPorId(id)
  }

  get opciones(): String[] {
    return this.pregunta.opciones;
  }

  async aceptar() {
    const respuesta=$('input:radio[name=opciones]:checked').val()
    if(respuesta != undefined) {
      const idUsuario=this.usuarioService.usuarioLogueadoId
      const resultado = await this.preguntaService.revisarRespuesta(respuesta.toString(), idUsuario)
      generarCartelDeAlerta(resultado)
      this.router.navigate(['/busqueda'])
    }else{
      window.alert('Debe seleccionar una respuesta')
    }
  }

  cancelar() {
    this.router.navigate(['/busqueda'])
  }
}
