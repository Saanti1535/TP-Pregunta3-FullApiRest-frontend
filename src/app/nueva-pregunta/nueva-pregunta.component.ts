import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pregunta } from 'src/dominio/pregunta';
import { PreguntaService } from '../pregunta.service';
import * as $ from 'jquery';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-nueva-pregunta',
  templateUrl: './nueva-pregunta.component.html',
  styleUrls: ['./nueva-pregunta.component.css']
})
export class NuevaPreguntaComponent implements OnInit {

  nuevaPregunta: Pregunta = new Pregunta()
  tipoDePregunta: string
  laPregunta: string
  esSolidaria: boolean = false
  //Solo van a ser utilizados cuando sea solidaria
  puntos: number = 0
  puntajeSolidario: number

  constructor(private router: Router, public preguntaService: PreguntaService, public usuarioService: UsuarioService) { }

  ngOnInit() {}

  
  agregar(){
    const nuevaOpcion=$('#nueva-opcion').val().toString()
    if(nuevaOpcion!=''){
      this.nuevaPregunta.opciones.push(nuevaOpcion)
    } else{
      window.alert('Debe escribir algo para poder agregar una opcion nueva')
    }  

  }

  revisarTipoPregunta(){
    if(this.tipoDePregunta == 'Solidaria'){
      this.esSolidaria = true
    }
  }

  get opciones(): String[] {
    return this.nuevaPregunta.opciones;
  }
  
  async aceptar() {
    this.generarNuevaPregunta()
    if(this.tipoDePregunta == 'Solidaria'){
      this.puntos = this.puntajeSolidario
    }
    await this.preguntaService.crearPregunta(this.nuevaPregunta, this.usuarioService.usuarioLogueado.id, this.puntos)
    this.router.navigate(['/busqueda'])
  }

  cancelar() {
    this.router.navigate(['/busqueda'])
  }

  generarNuevaPregunta(){
    //El id debe ser reemplazado en el back (ya lo hace)
    this.nuevaPregunta.id=0
    this.nuevaPregunta.pregunta = this.laPregunta
    this.nuevaPregunta.type = "pregunta"+this.tipoDePregunta
    this.nuevaPregunta.respuestaCorrecta=$('input:radio[name=opciones]:checked').val().toString()
  }





}
