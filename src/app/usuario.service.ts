import { Injectable } from '@angular/core';
import { generarCartelDeAlerta, REST_SERVER_URL } from './configuration';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Usuario } from 'src/dominio/usuario';
@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  /* Varibales para cuando hay un error en el back */
  hayError: boolean = false
  codigoError: number
  descripcionError: string = ''
  idUsuario: number
  usuariosParaAgregar
  usuarioLogueadoId

  constructor(private http: HttpClient) { }

  async asignarUsuario(unNombreDeUsuario: string, unaContrasenia: string): Promise<void> {
    let id = await this.http.post<Usuario>(REST_SERVER_URL + '/login/' + unNombreDeUsuario, JSON.stringify({ password: unaContrasenia })).toPromise()
      .catch((err: HttpErrorResponse) => {
        (err.status === 0) ? this.descripcionError = 'El servidor se encuentra inactivo' : this.descripcionError = err.error
        this.hayError = true
      })
    this.hayError = false
    this.usuarioLogueadoId = id
  }

  async buscarUsuarioPorId(id: number): Promise<Usuario> {
    let usuario = await this.http.get<Usuario>(REST_SERVER_URL + '/usuario/' + id).toPromise()
      .catch((err: HttpErrorResponse) => {
        this.hayError = true
        generarCartelDeAlerta(err.error)
      })
    return Usuario.fromJson(usuario)
  }

  async actualizarUsuario(usuario: Usuario) {
    let usuarioActualizado = await this.http.put(REST_SERVER_URL + '/actualizar/' + usuario.id, usuario.toJson()).toPromise()
      .catch((err: HttpErrorResponse) => {
        this.hayError = true
        generarCartelDeAlerta(err.error)
      })
    return Usuario.fromJson(usuarioActualizado)
  }

  async buscarAmigosParaAgregar(usernameABuscar: String) {
    let usuarios = await this.http.get(REST_SERVER_URL + '/usuarios/' + this.usuarioLogueadoId + ',' + usernameABuscar).toPromise()
      .catch((err: HttpErrorResponse) => {
        this.hayError = true
        generarCartelDeAlerta(err.error)
      })
    // this.usuariosParaAgregar = usuarios
    return usuarios
  }

  async getRespondida(pregunta) {
    let respondida = await this.http.get(REST_SERVER_URL + '/respondida/' + pregunta + ", " + this.usuarioLogueadoId)
  }

  mostrarError(err: HttpErrorResponse) {
    this.hayError = true
    this.codigoError = err.status
    this.descripcionError = err.error
    window.alert(err.status + ' ' + err.error)
  }

  estaLogueado(): boolean {
    return this.usuarioLogueadoId !== undefined
  }
}
