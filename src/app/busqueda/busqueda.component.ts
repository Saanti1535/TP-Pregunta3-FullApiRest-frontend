import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pregunta } from 'src/dominio/pregunta';
import { PreguntaService } from '../pregunta.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  checkBoxActivado: boolean = false

  constructor(private router: Router, public preguntaService: PreguntaService) { }

  ngOnInit(): void {
    document.getElementById('elFooter').style.position = 'relative';
    this.recargarPreguntas()
  }

  editar(): void {
    this.router.navigate(['/editar-pregunta'])
  }

  get preguntas(): Pregunta[] {
    return this.preguntaService.listaDePreguntas
  }

  async buscar(busqueda: HTMLInputElement){
    this.preguntaService.filtrarPorPregunta(busqueda.value)   
  }

  async recargarPreguntas(){
    this.preguntaService.soloActivas = this.checkBoxActivado
    this.preguntaService.cargarPreguntas()
  }


}
