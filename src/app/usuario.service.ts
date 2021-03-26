import { Injectable } from '@angular/core';
import { REST_SERVER_URL } from './configuration';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RegistroRespuestas, Usuario } from 'src/dominio/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  /*Varibales para cuando hay un error en el back*/
  hayError: boolean = false
  codigoError: number
  descripcionError: string
  usuariosParaAgregar
  usuarioLogueado: Usuario

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

  async buscarUsuariosParaAgregar(busqueda: String){
    let usuarios = await this.http.post(REST_SERVER_URL + '/usuarios/' + this.usuarioLogueado.id, JSON.stringify({ busqueda: busqueda })).toPromise()
    .catch((err: HttpErrorResponse) => {
      this.mostrarError(err)
    })
    this.usuariosParaAgregar = usuarios
  }

  ingresarComoInvitado(){
    console.log("hola aca estoy")
    this.usuarioLogueado = new Usuario(0, "Juan", "1234")
    this.usuarioLogueado.apellido = "perez"
    this.usuarioLogueado.puntaje = 500

    var registro1 = new RegistroRespuestas()
    var registro2 = new RegistroRespuestas()
    registro1.pregunta = "Pregunta falopa"
    registro1.fechaRespuesta = new Date(1000)
    registro1.puntosOtorgados = 100
    registro2.pregunta = "Otra pregunta falopa"
    registro2.fechaRespuesta = new Date(1900)
    registro2.puntosOtorgados = 50
    this.usuarioLogueado.historial = [registro1, registro2, registro1, registro2]
  }

  mostrarError(err: HttpErrorResponse) {
    console.log(err)
    this.hayError = true
    this.codigoError = err.status
    this.descripcionError = err.error
    window.alert(err.status + ' ' + err.error)
  }
}
