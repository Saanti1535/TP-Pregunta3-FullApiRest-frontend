import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PreguntaService } from '../pregunta.service';
import { generarCartelDeAlerta } from '../configuration';
import * as $ from 'jquery';


@Component({
  selector: 'app-editar-pregunta',
  templateUrl: './editar-pregunta.component.html',
  styleUrls: ['./editar-pregunta.component.css']
})
export class EditarPreguntaComponent implements OnInit {
  pregunta = this.preguntaService.preguntaActual
  respuestaCorrecta: string = this.preguntaService.preguntaActual.respuestaCorrecta

  constructor(private router: Router, public preguntaService: PreguntaService) { }

  ngOnInit(): void {
  }

  get opciones(): String[] {
    return this.pregunta.opciones;
  }

  actualizarOpcionCorrecta(nuevaOpcionCorrecta){
    this.preguntaService.preguntaActual.respuestaCorrecta = nuevaOpcionCorrecta
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
    } catch(e) {
      generarCartelDeAlerta(e.error)
    }
    
  }

  cancelar() {
    this.router.navigate(['/busqueda'])
  }

}
