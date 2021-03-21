import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    document.getElementById('elFooter').style.position='relative';
  }

  editar(): void {
    this.router.navigate(['/editar-pregunta'])
  }

  responder(): void {
    this.router.navigate(['/responder-pregunta'])
  }

}
