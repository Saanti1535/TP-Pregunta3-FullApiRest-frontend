import { Injectable } from '@angular/core';
import { REST_SERVER_URL } from './configuration';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Usuario } from 'src/dominio/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  /*Varibales para cuando hay un error en el back*/
  hayError: boolean = false
  codigoError: number
  descripcionError: string

  usuarioLogueado: Usuario = new Usuario(0, "Juan", "1234")

  constructor(private http: HttpClient) { }

  //Metodos para comunciarse con el server
  //rename: login
  //que valide el back (user/pass)
  async asignarUsuario(unNombreDeUsuario: string, unaContrasenia: string): Promise<void> {
    let usuarioJson = await this.http.post<Usuario>(REST_SERVER_URL + '/login/' + unNombreDeUsuario, JSON.stringify({ password: unaContrasenia })).toPromise()
      .catch((err: HttpErrorResponse) => {
        this.mostrarError(err)
      })
    this.usuarioLogueado = Usuario.fromJson(usuarioJson)
  }

  async buscarUsuarioPorId(id: number): Promise<void> {
    let usuario = await this.http.get<Usuario>(REST_SERVER_URL + '/perfil/' + id).toPromise()
      .catch((err: HttpErrorResponse) => {
        this.mostrarError(err)
      })
    this.usuarioLogueado = Usuario.fromJson(usuario)
  }

  async actualizarUsuario(usuario: Usuario) {
    await this.http.put(REST_SERVER_URL + '/perfil/' + usuario.id, usuario.toJson()).toPromise()
      .catch((err: HttpErrorResponse) => {
        this.mostrarError(err)
      })
  }

  ingresarComoInvitado(){
    console.log("hola aca estoy")
    this.usuarioLogueado = new Usuario(0, "Juan", "1234")
    this.usuarioLogueado.apellido = "perez"
    this.usuarioLogueado.puntaje = 500
    console.log(this.usuarioLogueado)
  }

  mostrarError(err: HttpErrorResponse) {
    this.hayError = true
    this.codigoError = err.status
    this.descripcionError = err.message
    window.alert(err.status + ' ' + err.message)
  }
}
