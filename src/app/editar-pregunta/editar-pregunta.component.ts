import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PreguntaService } from '../pregunta.service';
import { generarCartelDeAlerta } from '../configuration';
import * as $ from 'jquery';
import { Pregunta } from 'src/dominio/pregunta';


@Component({
  selector: 'app-editar-pregunta',
  templateUrl: './editar-pregunta.component.html',
  styleUrls: ['./editar-pregunta.component.css']
})
export class EditarPreguntaComponent implements OnInit {
  pregunta = new Pregunta()
  respuestaCorrecta: string = this.preguntaService.preguntaActual.respuestaCorrecta

  constructor(private router: Router, public preguntaService: PreguntaService) { }

  async ngOnInit() {
    this.pregunta = await this.preguntaService.getPreguntaPorId(this.preguntaService.preguntaActual.id)
  }

  get opciones(): String[] {
    return this.pregunta.opciones;
  }

  actualizarOpcionCorrecta(nuevaOpcionCorrecta){
    this.pregunta.respuestaCorrecta = nuevaOpcionCorrecta
  }

  agregar(){
    const nuevaOpcion=$('#nueva-opcion').val().toString()
    if(nuevaOpcion!=''){
      this.pregunta.opciones.push(nuevaOpcion)
    } else{
      window.alert('Debe escribir algo para poder agregar una opcion nueva')
    }  

  }
  
  async aceptar() {
    try{
      await this.preguntaService.actualizarPregunta(this.pregunta)
      this.router.navigate(['/busqueda'])
      generarCartelDeAlerta("Se modificó la pregunta")
    } catch(e) {
      generarCartelDeAlerta(e.error)
    }
    
  }

  cancelar() {
    this.router.navigate(['/busqueda'])
  }

}
