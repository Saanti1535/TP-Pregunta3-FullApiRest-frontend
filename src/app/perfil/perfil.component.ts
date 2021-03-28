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
    this.router.navigate(['/busqueda'])
  }

  async verSolapaAgregarAmigos() {
    this.modoVerAmigos = false
    this.modoAgregarAmigos = true
    this.cargarAmigosParaAgregar()
  }

  async verSolapaMisAmigos() {
    this.modoAgregarAmigos = false
    this.modoVerAmigos = true
  }

  async agregarAmigo(amigo) {
    this.usuariosService.usuarioLogueado.amigos.push(amigo)
    await this.usuariosService.actualizarUsuario(this.usuario)
    this.resultadoBusquedaAmigos = this.resultadoBusquedaAmigos.filter(resultado => resultado !== amigo)
  }

  async eliminarAmigo(amigoAEliminar) {
    this.usuariosService.usuarioLogueado.amigos = this.usuariosService.usuarioLogueado.amigos.filter(amigo => amigo !== amigoAEliminar)
    await this.usuariosService.actualizarUsuario(this.usuario)
  }

  async cargarAmigosParaAgregar() {
    await this.usuariosService.buscarUsuariosParaAgregar('')
    this.resultadoBusquedaAmigos = this.usuariosService.usuariosParaAgregar
  }

  async cargarAmigosParaAgregarPorUsername(busqueda) {
    await this.usuariosService.buscarUsuariosParaAgregar(busqueda)
    this.resultadoBusquedaAmigos = this.usuariosService.usuariosParaAgregar
  }

  get historial(): RegistroRespuestas[] {
    return this.usuario.historial
  }

}
