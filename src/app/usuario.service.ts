import { Injectable } from '@angular/core';
import { generarCartelDeAlerta, REST_SERVER_URL } from './configuration';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RegistroRespuestas, Usuario } from 'src/dominio/usuario';
@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  /* Varibales para cuando hay un error en el back */
  hayError: boolean = false
  codigoError: number
  descripcionError: string

  usuariosParaAgregar
  usuarioLogueado: Usuario

  constructor(private http: HttpClient) { }

  async asignarUsuario(unNombreDeUsuario: string, unaContrasenia: string): Promise<void> {
    let usuarioJson = await this.http.post<Usuario>(REST_SERVER_URL + '/login/' + unNombreDeUsuario, JSON.stringify({ password: unaContrasenia })).toPromise()
      .catch((err: HttpErrorResponse) => {
        this.hayError = true
        generarCartelDeAlerta(err.error)
        console.log(err)
      })

    this.usuarioLogueado = Usuario.fromJson(usuarioJson)
  }

  async buscarUsuarioPorId(id: number): Promise<void> {
    let usuario = await this.http.get<Usuario>(REST_SERVER_URL + '/perfil/' + id).toPromise()
      .catch((err: HttpErrorResponse) => {
        this.hayError = true
        generarCartelDeAlerta(err.error)
      })
    this.usuarioLogueado = Usuario.fromJson(usuario)
  }

  async actualizarUsuario(usuario: Usuario) {
    await this.http.put(REST_SERVER_URL + '/perfil/' + usuario.id, usuario.toJson()).toPromise()
      .then(() => {
        this.hayError = false
      })
      .catch((err: HttpErrorResponse) => {
        this.hayError = true
        generarCartelDeAlerta(err.error)
      })
  }

  async buscarUsuariosParaAgregar(busqueda: String) {
    let usuarios = await this.http.post(REST_SERVER_URL + '/usuarios/' + this.usuarioLogueado.id, JSON.stringify({ busqueda: busqueda })).toPromise()
      .catch((err: HttpErrorResponse) => {
        this.hayError = true
        generarCartelDeAlerta(err.error)
      })
    this.usuariosParaAgregar = usuarios
  }

  mostrarError(err: HttpErrorResponse) {
    this.hayError = true
    this.codigoError = err.status
    this.descripcionError = err.error
    window.alert(err.status + ' ' + err.error)
  }

  estaLogueado(): boolean{
    return this.usuarioLogueado !== undefined
  }
}
