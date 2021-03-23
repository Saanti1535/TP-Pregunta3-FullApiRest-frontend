import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  contenidoInputUsuario: string = ''
  contenidoInputContrasenia: string= '' 

  constructor(private router: Router, public usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  /*async ingresar(){
    try{
      await this.usuarioService.asignarUsuario(this.contenidoInputUsuario, this.contenidoInputContrasenia)
      this.router.navigate(['/busqueda'])
    }catch{

    }
    
  }*/

  ingresar(){
    this.router.navigate(['/busqueda'])
  }

}
