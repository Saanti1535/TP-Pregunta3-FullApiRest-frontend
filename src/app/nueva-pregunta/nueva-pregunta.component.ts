import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pregunta } from 'src/dominio/pregunta';
import { PreguntaService } from '../pregunta.service';
import * as $ from 'jquery';
import { UsuarioService } from '../usuario.service';
import { generarCartelDeAlerta } from '../configuration';

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
  //Bandera para ver si la pregunta es o no válida
  esValida: boolean = true
  mensajeAlerta = ""

  constructor(private router: Router, public preguntaService: PreguntaService, public usuarioService: UsuarioService) { }

  ngOnInit() {}

  
  agregar(){
    const nuevaOpcion=$('#nueva-opcion').val().toString()
    if(nuevaOpcion!='' && !this.nuevaPregunta.opciones.includes(nuevaOpcion)){
      this.nuevaPregunta.opciones.push(nuevaOpcion)
    } else{
      generarCartelDeAlerta('El campo no puede estar vacio ni ser igual a una opción ya existente')
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
  
  aceptar() {
    //Validaciones previas a generar la pregunta
    if(this.laPregunta == undefined){
      this.mensajeAlerta += "La pregunta no puede estar vacía. "
      this.esValida = false
    }
    if(this.nuevaPregunta.opciones.length < 2){
      this.mensajeAlerta += "La pregunta debe tener al menos dos opciones. "
      this.esValida = false
    }
    if($('input:radio[name=opciones]:checked').val() == undefined){
      this.mensajeAlerta += "Debe seleccionar una respuesta correcta. "
      this.esValida = false
    }
    if(this.tipoDePregunta == undefined){
      this.mensajeAlerta += "Debe seleccionar un tipo de pregunta. "
      this.esValida = false
    }
    if(this.tipoDePregunta == 'Solidaria' && this.puntajeSolidario == undefined){
      this.mensajeAlerta += "Para la pregunta solidaria, debe seleccionar cantidad de puntos a donar. "
      this.esValida = false
    }

    if(this.esValida){
        this.mandarPreguntaNueva()
    }else{
      generarCartelDeAlerta(this.mensajeAlerta) 
      this.mensajeAlerta = ""
      this.esValida = true    
    }
  }

  async mandarPreguntaNueva(){
    this.generarNuevaPregunta()
    if(this.tipoDePregunta == 'Solidaria'){
      this.puntos = this.puntajeSolidario
    }
    await this.preguntaService.crearPregunta(this.nuevaPregunta, this.usuarioService.usuarioLogueado.id, this.puntos)
    this.router.navigate(['/busqueda'])
  }

  cancelar() {
    this.nuevaPregunta = new Pregunta()
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
