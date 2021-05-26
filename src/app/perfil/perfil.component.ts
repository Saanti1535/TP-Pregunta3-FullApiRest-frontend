import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './../usuario.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/dominio/usuario';
import { RegistroRespuestas } from '../../dominio/usuario';
import { generarCartelDeAlerta } from '../configuration';
import { LogModificacionesService } from '../log-modificaciones.service';
import { LogModificaciones } from 'src/dominio/logModificaciones';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario: Usuario = new Usuario()
  nombre: String
  historial: RegistroRespuestas[]
  resultadoBusquedaAmigos
  modoVerAmigos = true
  modoAgregarAmigos = false
  modificaciones: LogModificaciones[] = []

  constructor(private logModificacionesService: LogModificacionesService, public usuariosService: UsuarioService, private router: Router) { }

  async ngOnInit() {
    this.usuario = await this.usuariosService.buscarUsuarioPorId(this.usuariosService.usuarioLogueadoId) // Por su hubieron cambios que se cancelaron en el front, se trae de nuevo la info del back
    this.nombre = this.usuario.nombre
    this.historial = this.usuario.historial
    this.mostrarLogModificaciones()
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
    if (this.esFechaValida(nuevaFecha)) {
      this.usuario.fechaNacimiento = nuevaFecha
    } else generarCartelDeAlerta('Si deja la fecha de nacimiento vacía, se mantendrá la última ingresada')
  }

  esFechaValida(nuevaFecha): boolean {
    return nuevaFecha.getTime() === nuevaFecha.getTime()
  }

  cancelar() {
    this.router.navigate(['/busqueda'])
  }

  async aceptar() {
    this.usuario = await this.usuariosService.actualizarUsuario(this.usuario)
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
  }

  async agregarAmigo(amigo) {
    this.usuario.amigos.push(amigo)
    this.usuario = await this.usuariosService.actualizarUsuario(this.usuario)
    this.resultadoBusquedaAmigos = this.resultadoBusquedaAmigos.filter(resultado => resultado !== amigo)
  }

  async eliminarAmigo(amigoAEliminar) {
    this.usuario.amigos = this.usuario.amigos.filter(amigo => amigo !== amigoAEliminar)
    this.usuario = await this.usuariosService.actualizarUsuario(this.usuario)
  }

  async cargarAmigosParaAgregar() {
    this.resultadoBusquedaAmigos = await this.usuariosService.buscarAmigosParaAgregar('')
  }

  async cargarAmigosParaAgregarPorUsername(usernameABuscar) {
    this.resultadoBusquedaAmigos = await this.usuariosService.buscarAmigosParaAgregar(usernameABuscar)
  }

  async mostrarLogModificaciones() {
    this.modificaciones = await this.logModificacionesService.obtener(this.usuario.id)
  }

}
