import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pregunta } from 'src/dominio/pregunta';
import { PreguntaService } from '../pregunta.service';

@Component({
  selector: 'app-card-pregunta',
  templateUrl: './card-pregunta.component.html',
  styleUrls: ['./card-pregunta.component.css']
})
export class CardPreguntaComponent implements OnInit {
  @Input() pregunta: Pregunta 

  constructor(private router: Router, public preguntaService: PreguntaService) { }

  ngOnInit(): void {
  }

  async responder(unaPregunta: Pregunta): Promise<void> {
    await this.preguntaService.getPreguntaPorId(this.pregunta.id)
    this.router.navigate(['/responder-pregunta'])
    // this.router.navigate(['/responder-pregunta'])
  }

}
