import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
  pregunta = this.preguntaService.preguntaActual

  constructor(private router: Router, public preguntaService: PreguntaService) { }

  ngOnInit() {
    this.revisarSiEsEdicion()
  }

  actualizarOpcion(nuevaOpcion: string){
    this.opcionActualizada.emit(nuevaOpcion)
  }

  revisarSiEsEdicion(){
    if(window.location.href.indexOf('editar')!=-1) {
      this.esEdicion = true;
    }
  }

  borrarOpcion(){
    var index = this.pregunta.opciones.indexOf(this.opcion)
    this.pregunta.opciones.splice(index, 1)
  }

}
