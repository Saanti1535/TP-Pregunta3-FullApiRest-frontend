import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pregunta } from 'src/dominio/pregunta';
import { REST_SERVER_URL } from './configuration';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  listaDePreguntas: Pregunta[] 
  soloActivas: boolean = false;

  constructor(private http: HttpClient) { }

  async cargarPreguntas() {
    !this.soloActivas ? this.listaDePreguntas = await this.getTodasLasPreguntas() : this.listaDePreguntas = await this.getPreguntasActivas()  
  }

  async getTodasLasPreguntas(): Promise<Pregunta[]> {
    const preguntas = await this.http.get<Pregunta[]>(REST_SERVER_URL + '/busqueda/preguntas').toPromise()
    return this.listaDePreguntas = preguntas.map( (pregunta) => Pregunta.fromJSON(pregunta) )
  }

  //No usamos el pipe para mantener lo mas actualizado posible las preguntas activas
  //Ademas para tener en cuenta posibles nuevas preguntas
  async getPreguntasActivas(): Promise<Pregunta[]> {
    const preguntas = await this.http.get<Pregunta[]>(REST_SERVER_URL + '/busqueda/preguntasActivas').toPromise()
    console.log(preguntas)
    return this.listaDePreguntas = preguntas.map( (pregunta) => Pregunta.fromJSON(pregunta) )
  }

  //Si el input de la busqueda es nulo, carga todas las preguntas
  async filtrarPorPregunta(pregunta: string) {
    if(pregunta !== ''){
      const preguntas = await this.http.post<Pregunta[]>(REST_SERVER_URL + '/busqueda/preguntas', JSON.stringify({unaBusqueda: pregunta})).toPromise()
      this.listaDePreguntas = preguntas.map((pregunta) => Pregunta.fromJSON(pregunta))
    } else {
      this.cargarPreguntas()
    }
  }

}
