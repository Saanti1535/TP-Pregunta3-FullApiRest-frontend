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
  nombre = this.usuariosService.usuarioLogueado.nombre
  resultadoBusquedaAmigos
  modoVerAmigos = true
  modoAgregarAmigos = false

  constructor(public usuariosService: UsuarioService, private router: Router) { }
  ngOnInit(): void {
  }

  get puntosUsuarioActual(): number {
    return this.usuario.puntaje
  }

  get nacimientoUsuarioActual(): Date {
    return this.usuario.fechaNacimiento
  }

  cambiarFechaNacimiento(): void {
    let inputFecha = document.getElementById('fechaDeNacimiento') as HTMLInputElement;
    let nuevaFecha = new Date(inputFecha.value)
    this.usuario.fechaNacimiento = nuevaFecha
  }

  cancelar() {
    this.router.navigate(['/busqueda'])
  }

  async aceptar() {
    await this.usuariosService.actualizarUsuario(this.usuario)
    this.router.navigate(['/busqueda'])
  }

  async verSolapaAgregarAmigos() {
    this.modoVerAmigos = false
    this.modoAgregarAmigos = true
    await this.usuariosService.buscarUsuariosPorUsername()
    this.resultadoBusquedaAmigos = this.usuariosService.usuariosParaAgregar.filter(usuario => usuario.nombre !== this.usuariosService.usuarioLogueado.nombre)
  }

  async verSolapaMisAmigos() {
    this.modoAgregarAmigos = false
    this.modoVerAmigos = true
  }

  async filtrarPorUsername(username) {
    await this.usuariosService.buscarUsuariosPorUsername()
    this.resultadoBusquedaAmigos = this.usuariosService.usuariosParaAgregar.filter(user => user.match(username))
  }

  agregarAmigo(amigo) {
    this.usuariosService.usuarioLogueado.amigos.push(amigo)
  }

}
