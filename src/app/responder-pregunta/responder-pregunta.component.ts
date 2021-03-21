import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-responder-pregunta',
  templateUrl: './responder-pregunta.component.html',
  styleUrls: ['./responder-pregunta.component.css']
})
export class ResponderPreguntaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  aceptar() {
    this.router.navigate(['/busqueda'])
  }

  cancelar() {
    this.router.navigate(['/busqueda'])
  }
}
