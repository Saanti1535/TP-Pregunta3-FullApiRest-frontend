import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogModificaciones } from 'src/dominio/logModificaciones';
import { REST_SERVER_URL } from './configuration';

@Injectable({
  providedIn: 'root'
})
export class LogModificacionesService {

  constructor(private http: HttpClient) { }

  async obtener(idUsuario: number) {
    const log = await this.http.get<LogModificaciones[]>(`${REST_SERVER_URL}/log/${idUsuario}`).toPromise()
    return log.map(log => LogModificaciones.fromJSON(log))
  }
}
