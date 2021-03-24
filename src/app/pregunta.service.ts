import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pregunta } from 'src/dominio/pregunta';
import { mostrarError, REST_SERVER_URL } from './configuration';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
  listaDePreguntas: Pregunta[] 

  constructor(private http: HttpClient) { }

  async traerPreguntas(): Promise<Pregunta[]> {
    const preguntas = await this.http.get<Pregunta[]>(REST_SERVER_URL + '/busqueda/preguntas').toPromise()
    return this.listaDePreguntas = preguntas.map( (pregunta) => Pregunta.fromJSON(pregunta) )
  }

}
