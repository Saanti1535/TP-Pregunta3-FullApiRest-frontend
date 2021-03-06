import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pregunta } from 'src/dominio/pregunta';
import { generarCartelDeAlerta, REST_SERVER_URL } from './configuration';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
  listaDePreguntas: Pregunta[] 
  preguntaActual: Pregunta // para que lo vea el responder/editar pregunta.component
  // soloActivas: boolean = false;

  constructor(private http: HttpClient, public usuarioService: UsuarioService) { }

  async cargarPreguntas(soloActivas: boolean) {
    soloActivas ? await this.filtrarPreguntas('', soloActivas) : this.listaDePreguntas = await this.getTodasLasPreguntas() 
  }

  async getTodasLasPreguntas(): Promise<Pregunta[]> {
    const preguntas = await this.http.get<Pregunta[]>(REST_SERVER_URL + '/busqueda/preguntas').toPromise()
    return this.listaDePreguntas = preguntas.map( (pregunta) => Pregunta.fromJSON(pregunta) )
  }

  //No usamos el pipe para mantener lo mas actualizado posible las preguntas activas
  //Ademas para tener en cuenta posibles nuevas preguntas
  // async getPreguntasActivas(): Promise<Pregunta[]> {
  //   const preguntas = await this.http.get<Pregunta[]>(REST_SERVER_URL + '/busqueda/preguntasActivas').toPromise()
  //   return this.listaDePreguntas = preguntas.map( (pregunta) => Pregunta.fromJSON(pregunta) )
  // }

  //Si el input de la busqueda es nulo, carga todas las preguntas
  async filtrarPreguntas(pregunta: string, soloActivas: boolean) {
      const preguntas = await this.http.post<Pregunta[]>(REST_SERVER_URL + '/busqueda/preguntas', JSON.stringify({unaBusqueda: pregunta, soloActivas: soloActivas})).toPromise()
      this.listaDePreguntas = preguntas.map((pregunta) => Pregunta.fromJSON(pregunta))
  }

  async getPreguntaPorId(id: string){
    const pregunta = await this.http.get<Pregunta>(REST_SERVER_URL + '/busqueda/pregunta/' + id +'/'+this.usuarioService.usuarioLogueadoId).toPromise()
    this.preguntaActual = Pregunta.fromJSON(pregunta)
    return Pregunta.fromJSON(pregunta)
  }

  async revisarRespuesta(respuesta: string, idUsuario: number): Promise<string> {
    const idPregunta=this.preguntaActual.id
    var resultado
    await this.http.post<string>(REST_SERVER_URL + '/revisarRespuesta/' + idPregunta, JSON.stringify({laRespuesta: respuesta, idUsuario: idUsuario})).toPromise()
      .catch((err: HttpErrorResponse) => {
        if( err.status == 200){
          resultado=err.error.text
          this.usuarioService.buscarUsuarioPorId(idUsuario) // El back actualiz?? info del usuario, ac?? la traemos 
        }else{
          resultado=err.error.text
        }
      })
    return resultado
  }

  //Como s??lo se pueden actualizar las opciones, mandamos ??nicamente eso (en 'pregunta.opcionesUpdateToJSON()')
  async actualizarPregunta(pregunta: Pregunta) {
    await this.http.put(REST_SERVER_URL + '/busqueda/pregunta/' + pregunta.id, pregunta.opcionesUpdateToJSON()).toPromise()
  }

  async crearPregunta(nuevaPregunta: Pregunta, idAutor: number, puntos: number) {
    await this.http.put(REST_SERVER_URL + '/crearPregunta/'+ puntos, nuevaPregunta.toJSON()).toPromise()
    
  }


}
