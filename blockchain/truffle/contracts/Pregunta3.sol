pragma solidity >=0.6.8;

contract Pregunta3 {
    address public usuario;
    address public duenio;

    struct Pregunta {
        int8 id;
        address autor;
        string textoPregunta;
        string[] opciones;
        string respuestaCorrecta;
        int8 puntaje;
    }

    Pregunta[] public preguntas;

    struct Respuesta {
        address usuario;
        int8 idPregunta;
        string textoRespuesta;
        int8 puntaje;
    }

    enum Estado {Activo , Lectura , Responder , Bootstrap };
    Estado public estado;

    modifier esDuenio(address usuarioQueEjecuta) {
        require(usuarioQueEjecuta == duenio, "No tiene permiso");
        _;
    }

    function cambiarEstado(Estado nuevoEstado) public esDuenio(msg.sender){
         estado = nuevoEstado;
    }

    modifier puedeConsultar() {
        require(estado == Activo || estado == Lectura || estado == Responder, "No puede realizarse");
        _;
    }
    
    modifier puedeResponder() {
        require(estado == Activo || estado == Responder, "No puede realizarse");
        _;
    }

    modifier puedeCrear() {
        require(estado == Activo || estado == Bootstrap, "No puede realizarse");
        _;
    }

    modifier noEsAutor(int8 idPregunta, address usuarioQueResponde){
        require(obtenerPregunta(idPregunta).autor != usuarioQueResponde, "No puede responder una pregunta propia");
        _;
    }

    // No está probado
    function obtenerPregunta(int8 idPregunta) public puedeConsultar() returns (Pregunta pregunta) {
        for(int8 i = 0; i < preguntas.length; i++) {
            if(preguntas[i].id == idPregunta){
                pregunta = preguntas[i];
            }
        }
    }

    // No está probado
    function nuevaPregunta(string texto, string[] _opciones, string respueta, int8 puntos) public puedeCrear() returns (Pregunta pregunta){
        pregunta.id = preguntas.length + 1;
        pregunta.autor = msg.sender;
        pregunta.textoPregunta = texto;
        pregunta.opciones = _opciones;
        pregunta.respuestaCorrecta = repsuesta;
        pregunta.puntaje = puntos;
    }

    function responderPregunta(int8 idPregunta, string respuesta) public puedeResponder() noEsAutor(int8 idPregunta, msg.sender) return (Respuesta){
        int8 puntosObtenidos;
        Pregunta laPregunta = obtenerPregunta(idPregunta);
        if (laPregunta.respuestaCorrecta == respuesta){
            puntosObtenidos = laPregunta.puntos;
        }else{
            puntosObtenidos = 0;
        }
        return Respuesta(msg.sender, idPregunta, respuesta, puntosObtenidos);
    }

    /*
    function promedioRespuestas() return (int8){
        int16 acumulador=0;
        int8 cuenta=0;
        for(int8 i = 0; i < preguntas.length; i++) {
            if( lalistaderespuestas[i].usuario == msg.sender){
                acumulador += lalistaderespuestas[i].puntaje
                cuenta ++;
            }
        }
        return acumulador/cuenta
    } 
    */
}