import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pregunta } from 'src/dominio/pregunta';
import { Usuario } from 'src/dominio/usuario';
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
  @Input() usuario: Usuario 

  constructor(private router: Router, public preguntaService: PreguntaService, public usuarioService: UsuarioService) { }

  async ngOnInit() {
    this.esDeUsuarioLogueado()
  }

  esDeUsuarioLogueado(){
    if(this.pregunta.idAutor == this.usuario.id){
      this.esDeUsuario = true
    }
  }

  get yaRespondio() {
    return this.usuario.historial.some(registro => registro.pregunta == this.pregunta.pregunta)
  }

  responder(){
      this.router.navigate(['/responder-pregunta',this.pregunta.id])
  }

  editar(){
    this.router.navigate(['/editar-pregunta',this.pregunta.id])
  }

}
