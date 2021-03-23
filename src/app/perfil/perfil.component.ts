import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './../usuario.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/dominio/usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario: Usuario = this.usuariosService.usuarioLogueado

  constructor(public usuariosService: UsuarioService, private router: Router) { }
  ngOnInit(): void { }


  
  get nombreUsuarioActual(): string {
    // return this.usuario.nombre
    return "rodolfo"
  }

  get puntosUsuarioActual(): number {
    // return this.usuario.puntaje
    return 200
  }

  get nacimientoUsuarioActual(): Date{
    return this.usuario.fechaNacimiento
  }

  cambiarFechaNacimiento(): void {
    let inputFecha = document.getElementById('fechaDeNacimiento') as HTMLInputElement;
    let nuevaFecha = new Date(inputFecha.value)
    this.usuario.fechaNacimiento = nuevaFecha
  }

  cancelar() {
    this.router.navigate(['/home'])
  }

  async aceptar() {
    await this.usuariosService.actualizarUsuario(this.usuario)
    this.router.navigate(['/home'])
  }

}
