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

  //Solo van a ser utilizados cuando sea solidaria
  puntos: number = 0
  puntajeSolidario: number

  //Bandera para ver si la pregunta es o no válida
  esValida: boolean = true
  mensajeAlerta = ""

  constructor(private router: Router, public preguntaService: PreguntaService, public usuarioService: UsuarioService) { }

  ngOnInit() {}


  /************************************************************************************************ BOTONES */
  agregarOpcion(){
    const nuevaOpcion=$('#nueva-opcion').val().toString()
    if(this.esOpcionValida(nuevaOpcion)){
      this.nuevaPregunta.opciones.push(nuevaOpcion)
    } else{
      generarCartelDeAlerta('El campo no puede estar vacio ni ser igual a una opción ya existente')
    }  
  }
  
  aceptar() {
    this.validarNuevaPregunta()

    if(this.esValida){
        this.mandarPreguntaNueva()
    }else{
      generarCartelDeAlerta(this.mensajeAlerta) 
      this.mensajeAlerta = ""
      this.esValida = true    
    }
  }
  
  cancelar() {
    this.nuevaPregunta = new Pregunta()
    this.router.navigate(['/busqueda'])
  }


/************************************************************************************************ AUXILIARES */
  generarNuevaPregunta(){
    //En el back se pisa este ID por el correspondiente (el repositorio se encarga)
    this.nuevaPregunta.id=0
    this.nuevaPregunta.pregunta = this.laPregunta
    this.nuevaPregunta.type = this.nuevaPreguntaType
    this.nuevaPregunta.respuestaCorrecta = this.respuestaCorrecta
  }

  async mandarPreguntaNueva(){
    this.generarNuevaPregunta()
    if(this.tipoDePregunta == 'Solidaria'){
      this.puntos = this.puntajeSolidario
    }
    await this.preguntaService.crearPregunta(this.nuevaPregunta, this.usuarioService.usuarioLogueado.id, this.puntos)
    this.router.navigate(['/busqueda'])
  }

/************************************************************************************************ GETTERS */
  get respuestaCorrecta(): string {
    return $('input:radio[name=opciones]:checked').val().toString()
  }

  get nuevaPreguntaType(): string{
    return "pregunta"+this.tipoDePregunta
  }

  get esSolidaria(): boolean {
    return this.tipoDePregunta == 'Solidaria' 
  }

  get opciones(): String[] {
    return this.nuevaPregunta.opciones;
  }


/************************************************************************************************ VALIDACIONES */
  validarNuevaPregunta() {
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
    if(this.esSolidaria && this.puntajeSolidario == undefined){
      this.mensajeAlerta += "Para la pregunta solidaria, debe seleccionar cantidad de puntos a donar. "
      this.esValida = false
    }
  }

  esOpcionValida(nuevaOpcion: string): boolean {
    return nuevaOpcion!='' && !this.nuevaPregunta.opciones.includes(nuevaOpcion)
  }



}
