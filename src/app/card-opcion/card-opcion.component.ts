import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Pregunta } from 'src/dominio/pregunta';
import { PreguntaService } from '../pregunta.service';

@Component({
  selector: 'app-card-opcion',
  templateUrl: './card-opcion.component.html',
  styleUrls: ['./card-opcion.component.css']
})
export class CardOpcionComponent implements OnInit {
  @Input() opcion: string
  @Output() opcionActualizada = new EventEmitter<string>();
  esEdicion: boolean = false
  @Input() pregunta: Pregunta

  constructor(private router: Router, public preguntaService: PreguntaService) { }

  async ngOnInit() {
    this.revisarSiEsEdicion()
  }

  actualizarOpcion(nuevaOpcion: string) {
    this.opcionActualizada.emit(nuevaOpcion)
  }

  get esRespuestaCorrecta() {
    return this.opcion === this.pregunta.respuestaCorrecta
  }

  revisarSiEsEdicion() {
    if (window.location.href.indexOf('editar') != -1) {
      this.esEdicion = true;
    }
  }

  borrarOpcion() {
    var index = this.pregunta.opciones.indexOf(this.opcion)
    this.pregunta.opciones.splice(index, 1)
  }

}
