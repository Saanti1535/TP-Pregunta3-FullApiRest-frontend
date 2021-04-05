import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  contenidoInputUsuario: string = 'pep'//''
  contenidoInputContrasenia: string = '123456'
  hayError = false
  mensajeDeError = ''

  constructor(private router: Router, public usuarioService: UsuarioService) { }

  ngOnInit(): void {
    document.getElementById('elFooter').style.position = 'fixed';
  }

  async ingresar() {
    try {
      await this.usuarioService.asignarUsuario(this.contenidoInputUsuario, this.contenidoInputContrasenia)
      this.router.navigate(['/busqueda'])
    } catch (e) {
      this.setError(this.usuarioService.descripcionError)
    }
  }

  login(): void {
    this.camposVacios() ? this.setError("Ingrese su usuario y contraseña") : this.ingresar()
  }

  camposVacios(): boolean {
    return (this.contenidoInputContrasenia === '' || this.contenidoInputUsuario === '')
  }

  setError(mensaje: string): void {
    this.mensajeDeError = mensaje
    this.hayError = true
  }

  cerrarAlertError(): void {
    this.hayError = false
  }

}
