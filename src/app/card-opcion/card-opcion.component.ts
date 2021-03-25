import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-opcion',
  templateUrl: './card-opcion.component.html',
  styleUrls: ['./card-opcion.component.css']
})
export class CardOpcionComponent implements OnInit {
  @Input() opcion: string 
  esEdicion: boolean = false
  constructor() { }

  ngOnInit() {
    this.revisarSiEsEdicion()
  }

  revisarSiEsEdicion(){
    if(window.location.href.indexOf('editar')!=-1) {
      this.esEdicion = true;
  }
  }

}
