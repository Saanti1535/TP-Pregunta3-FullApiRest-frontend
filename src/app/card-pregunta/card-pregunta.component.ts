import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pregunta } from 'src/dominio/pregunta';

@Component({
  selector: 'app-card-pregunta',
  templateUrl: './card-pregunta.component.html',
  styleUrls: ['./card-pregunta.component.css']
})
export class CardPreguntaComponent implements OnInit {
  @Input() pregunta: Pregunta 

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  responder(): void {
    this.router.navigate(['/responder-pregunta'])
  }

}
