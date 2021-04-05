import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pregunta } from 'src/dominio/pregunta';
import { generarCartelDeAlerta } from '../configuration';
import { PreguntaService } from '../pregunta.service';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-card-pregunta',
  templateUrl: './card-pregunta.component.html',
  styleUrls: ['./card-pregunta.component.css']
})
export class CardPreguntaComponent implements OnInit {
  @Input() pregunta: Pregunta 
  esDeUsuario: boolean = false

  constructor(private router: Router, public preguntaService: PreguntaService, public usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.esDeUsuarioLogueado()
  }

  esDeUsuarioLogueado(){
    if(this.pregunta.idAutor == this.usuarioService.usuarioLogueado.id){
      this.esDeUsuario = true
    }
  }

  async responder(): Promise<void> {
    try{
      await this.preguntaService.getPreguntaPorId(this.pregunta.id)
      this.router.navigate(['/responder-pregunta'])
    }catch(e){
      generarCartelDeAlerta(e.error)
    }
  }

  async editar(){
    await this.preguntaService.getPreguntaPorId(this.pregunta.id)
    this.router.navigate(['/editar-pregunta'])
  }

}
