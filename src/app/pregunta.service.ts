import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pregunta } from 'src/dominio/pregunta';
import { REST_SERVER_URL } from './configuration';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
  listaDePreguntas: Pregunta[] 
  preguntaActual: Pregunta // para que lo vea el responder/editar pregunta.component
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

  async getPreguntaPorId(id: number){
    const pregunta = await this.http.get<Pregunta>(REST_SERVER_URL + '/busqueda/pregunta/' + id).toPromise()
    this.preguntaActual = Pregunta.fromJSON(pregunta)
  }

  async revisarRespuesta(respuesta: string, idUsuario: number): Promise<string> {
    const idPregunta=this.preguntaActual.id
    var resultado
    await this.http.post<string>(REST_SERVER_URL + '/revisarRespuesta/' + idPregunta, JSON.stringify({laRespuesta: respuesta, idUsuario: idUsuario})).toPromise()
      .catch((err: HttpErrorResponse) => {
        if( err.status == 200){
          resultado=err.error.text
        }else{
          resultado='Ocurrió un error'
        }
      })
    return resultado
  }


}
