import { Injectable } from '@angular/core';
import { REST_SERVER_URL } from './configuration';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Usuario } from 'src/dominio/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  /*Varibales para cuando hay un error en el back*/
  hayError:boolean = false
  codigoError:number
  descripcionError:string

  usuarioLogueado : Usuario

  constructor(private http: HttpClient) {  }

  //Metodos para comunciarse con el server
  //rename: login
  //que valide el back (user/pass)
  async asignarUsuario(unNombreDeUsuario: string, unaContrasenia: string): Promise<void> {
    let usuarioJson = await this.http.post<Usuario>(REST_SERVER_URL+  '/login/' + unNombreDeUsuario, JSON.stringify({password: unaContrasenia})).toPromise()
    .catch((err: HttpErrorResponse) => {   
          this.mostrarError(err)
      })
    this.usuarioLogueado = Usuario.fromJson(usuarioJson)
  }

  mostrarError(err: HttpErrorResponse){
    this.hayError =true
    this.codigoError=err.status
    this.descripcionError=err.error
    window.alert(err.status + '' + err.message)
  }
}
