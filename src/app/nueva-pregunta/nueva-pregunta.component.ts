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

  get opciones(): String[] {
    return this.nuevaPregunta.opciones;
  }

  get esSolidaria(): boolean {
    return this.tipoDePregunta == 'Solidaria' 
  }
  
  async aceptar() {
    await this.preguntaService.crearPregunta(this.nuevaPregunta)
    this.generarNuevaPregunta()
    this.router.navigate(['/busqueda'])
  }

  cancelar() {
    this.router.navigate(['/busqueda'])
  }

  generarNuevaPregunta(){
    this.nuevaPregunta.pregunta = $('#nueva-pregunta').val().toString()
    this.nuevaPregunta.idAutor = this.usuarioService.usuarioLogueado.id
    this.nuevaPregunta.nombreAutor = this.usuarioService.usuarioLogueado.nombre
    this.nuevaPregunta.type = "pregunta"+this.tipoDePregunta
  }





}
