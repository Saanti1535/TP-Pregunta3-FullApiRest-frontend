import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './../usuario.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/dominio/usuario';
import { RegistroRespuestas } from '../../dominio/usuario';

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
    this.usuariosService.buscarUsuarioPorId(this.usuario.id) // Por su hubieron cambios que se cancelaron en el front, se trae de nuevo la info del back
  }

  get puntosUsuarioActual(): number {
    return this.usuario.puntaje
  }

  get nacimientoUsuarioActual(): Date {
    return this.usuariosService.usuarioLogueado.fechaNacimiento
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
    if (!this.usuariosService.hayError) { this.router.navigate(['/busqueda']); }
  }

  async verSolapaAgregarAmigos() {
    this.modoVerAmigos = false
    this.modoAgregarAmigos = true
    this.cargarAmigosParaAgregar()
  }

  async verSolapaMisAmigos() {
    this.modoAgregarAmigos = false
    this.modoVerAmigos = true
    this.usuario = this.usuariosService.usuarioLogueado
  }

  async agregarAmigo(amigo) {
    this.usuario.amigos.push(amigo)
    await this.usuariosService.actualizarUsuario(this.usuario)
    this.usuario.amigos = this.usuariosService.usuarioLogueado.amigos
    this.resultadoBusquedaAmigos = this.resultadoBusquedaAmigos.filter(resultado => resultado !== amigo)
  }

  async eliminarAmigo(amigoAEliminar) {
    this.usuariosService.usuarioLogueado.amigos = this.usuariosService.usuarioLogueado.amigos.filter(amigo => amigo !== amigoAEliminar)
    this.usuario = this.usuariosService.usuarioLogueado
    await this.usuariosService.actualizarUsuario(this.usuariosService.usuarioLogueado)
  }

  async cargarAmigosParaAgregar() {
    this.resultadoBusquedaAmigos = await this.usuariosService.buscarAmigosParaAgregar('')
    // this.resultadoBusquedaAmigos = this.usuariosService.usuariosParaAgregar
  }

  async cargarAmigosParaAgregarPorUsername(usernameABuscar) {
    this.resultadoBusquedaAmigos = await this.usuariosService.buscarAmigosParaAgregar(usernameABuscar)
    // this.resultadoBusquedaAmigos = this.usuariosService.usuariosParaAgregar
  }

  get historial(): RegistroRespuestas[] {
    return this.usuario.historial
  }

}
