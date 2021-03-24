import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PreguntaService } from '../pregunta.service';

@Component({
  selector: 'app-responder-pregunta',
  templateUrl: './responder-pregunta.component.html',
  styleUrls: ['./responder-pregunta.component.css']
})
export class ResponderPreguntaComponent implements OnInit {
  pregunta = this.preguntaService.preguntaActual

  constructor(private router: Router, public preguntaService: PreguntaService) { }

  ngOnInit(): void {
  }

  get opciones(): String[] {
    return this.pregunta.opciones;
  }

  aceptar() {
    this.router.navigate(['/busqueda'])
  }

  cancelar() {
    this.router.navigate(['/busqueda'])
  }
}
