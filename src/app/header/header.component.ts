import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public usuariosService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
  }

  async perfil() {
    await this.usuariosService.buscarUsuarioPorId(this.usuariosService.usuarioLogueado.id)
    this.router.navigate(['/perfil'])
  }

  home() {
    this.router.navigate(['/busqueda'])
  }

}
