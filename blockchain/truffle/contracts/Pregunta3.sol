// pragma solidity >=0.6.8;
pragma solidity >= 0.5.16;
pragma experimental ABIEncoderV2;

contract Pregunta3 {
        
    address owner;
    
    constructor() public{
        owner = msg.sender; 
    }

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
        // address usuario;
        int8 idPregunta;
        string textoRespuesta;
        int8 puntaje;
    }

    mapping(address => int256[]) public puntaje;

    Respuesta[] public respuestas;


    enum Estado {Activo , Lectura , Responder , Bootstrap } Estado public estado;

    int8 contadorIds = 0;

    modifier esDuenio() {
        require(msg.sender == owner, "No tiene permisos");
        _;
    }

    modifier puedeConsultar() {
        require(estado == Estado.Activo || estado == Estado.Lectura || estado == Estado.Responder, "No puede realizarse");
        _;
    }
    
    modifier puedeResponder() {
        require(estado == Estado.Activo || estado == Estado.Responder, "No puede realizarse");
        _;
    }

    modifier puedeCrear() {
        require(estado == Estado.Activo || estado == Estado.Bootstrap, "No puede realizarse");
        _;
    }

    modifier noEsAutor(int8 idPregunta){
        require(obtenerPregunta(idPregunta).autor != msg.sender, "No puede responder una pregunta propia");
        _;
    }



    /* FUNCIONES */

    function cambiarEstado(Estado nuevoEstado) public esDuenio{
        estado = nuevoEstado;
    }

    function getEstado() public returns (Estado){
        return estado;
    }

    // No está probado
    // Si es un mapa... guiño guiño mapping(id, pregunta)
    // preguntas[idPregunta]
    function obtenerPregunta(int8 idPregunta) public puedeConsultar() returns (Pregunta memory) {
        for(uint256 i = 0; i < preguntas.length; i++) {
            if(preguntas[i].id == idPregunta){
                return preguntas[i];
            }
        }
    }

    // No está probado
    function nuevaPregunta(string memory texto, string[] memory _opciones, string memory respuesta, int8 puntos) public puedeCrear{
        contadorIds++;
        pregunta.id = contadorIds;
        pregunta.autor = msg.sender;
        pregunta.textoPregunta = texto;
        pregunta.opciones = _opciones;
        pregunta.respuestaCorrecta = respuesta;
        pregunta.puntaje = puntos;
        preguntas.push(pregunta);
    }

    // Si es un mapa... guiño guiño mapping(id, respuesta)
    // Ver mapas/listas respuestas
    function responderPregunta(int8 idPregunta, string memory respuesta) public puedeResponder noEsAutor(idPregunta){
        int8 puntosObtenidos;
        Pregunta memory laPregunta = obtenerPregunta(idPregunta);
        if (keccak256(abi.encodePacked((laPregunta.respuestaCorrecta))) == keccak256(abi.encodePacked((respuesta)))){
            puntosObtenidos = laPregunta.puntaje;
        }else{
            puntosObtenidos = 0;
        }
        respuestas.push(Respuesta(msg.sender, idPregunta, respuesta, puntosObtenidos));
    }

    
    function promedioRespuestas() returns (int8){
        int256 acumulador=0;
        for(int256 i = 0; i < puntaje[msg.sender].length; i++) {
            acumulador += puntaje[msg.sender][i]
        }
        }
        return acumulador/puntaje[msg.sender].length
    } 
    
}