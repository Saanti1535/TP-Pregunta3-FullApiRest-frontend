export const REST_SERVER_URL = "http://localhost:8080"

export function generarCartelDeAlerta(mensajeAlerta: string){
  var fondoPantallaCompleta = document.createElement("div");
  fondoPantallaCompleta.setAttribute('id', "fondoPantallaCompleta");
  document.body.insertBefore(fondoPantallaCompleta, null);

  var nuevoDiv = document.createElement("div");
  nuevoDiv.setAttribute('id', "cuerpoCartelAlerta");
  nuevoDiv.setAttribute('class', "card bg-light animate__animated animate__fadeIn d-flex flex-column justify-content-center align-items-center p-2");
  fondoPantallaCompleta.appendChild(nuevoDiv);

  var nuevoTexto = document.createElement("p");
  nuevoTexto.setAttribute('id', "textoDeAlerta");
  var texto = document.createTextNode(mensajeAlerta);
  nuevoTexto.appendChild(texto); //añade texto al div creado.
  nuevoDiv.appendChild(nuevoTexto);

  var nuevoBoton = document.createElement("button");
  nuevoBoton.setAttribute('id', "botonDeAlerta");
  nuevoBoton.setAttribute('class', "btn boton-primario")
  var textoBoton = document.createTextNode("Aceptar");
  nuevoBoton.appendChild(textoBoton); //añade texto al div creado.
  nuevoBoton.setAttribute('onClick', "body.removeChild(document.getElementById('fondoPantallaCompleta'))");
  nuevoDiv.appendChild(nuevoBoton);
}


