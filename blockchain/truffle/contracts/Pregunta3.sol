// pragma solidity >=0.6.8;
pragma solidity >= 0.5.16;
pragma experimental ABIEncoderV2;

contract Pregunta3 {
        
    address owner;
    
    constructor() public{
        owner = msg.sender; 
    }

    struct Pregunta {
        address autor;
        string textoPregunta;
        string[] opciones;
        string respuestaCorrecta;
        uint8 puntaje;
        uint fechaCreacion;
    }

    mapping(int8 => Pregunta) public pregunta;

    struct Respuesta {
        int8 idPregunta;
        string textoRespuesta;
        uint256 puntaje;
    }

    mapping(address => Respuesta[]) public respuestas;

    enum Estado {Activo , Lectura , Responder , Bootstrap } Estado public estado;

    int8 contadorIds = 1;

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

    modifier estaActiva(int8 idPregunta) {
        require(((block.timestamp - obtenerPregunta(idPregunta).fechaCreacion) / 60) < 5, "La pregunta no se encuentra activa");
        _;
    }


    /* FUNCIONES */

    function cambiarEstado(Estado nuevoEstado) public esDuenio{
        estado = nuevoEstado;
    }

    function getEstado() public returns (Estado){
        return estado;
    }

    function obtenerPregunta(int8 idPregunta) public puedeConsultar() returns (Pregunta memory) {
        return pregunta[idPregunta];
    }

    function nuevaPregunta(address _autor, string memory texto, string[] memory _opciones, string memory respuesta, uint8 puntos) public puedeCrear{
        Pregunta memory _pregunta;

        _pregunta.autor = _autor;
        _pregunta.textoPregunta = texto;
        _pregunta.opciones = _opciones;
        _pregunta.respuestaCorrecta = respuesta;
        _pregunta.puntaje = puntos;
        _pregunta.fechaCreacion = block.timestamp; 

        pregunta[contadorIds] = _pregunta;
        contadorIds++;
    }

    function responderPregunta(int8 idPregunta, string memory respuesta) public puedeResponder noEsAutor(idPregunta) estaActiva(idPregunta) {
        uint8 puntosObtenidos;
        Pregunta memory laPregunta = obtenerPregunta(idPregunta);

        if (keccak256(abi.encodePacked((laPregunta.respuestaCorrecta))) == keccak256(abi.encodePacked((respuesta)))){
            puntosObtenidos = laPregunta.puntaje;
        }else{
            puntosObtenidos = 0;
        }

        respuestas[msg.sender].push(Respuesta(idPregunta, respuesta, puntosObtenidos));
    }

    function promedioRespuestas(address usuario) public returns (uint256){
        uint256 acumulador=0;

        if(respuestas[usuario].length == 0){
            return 0;
        }

        for(uint256 i = 0; i < respuestas[usuario].length; i++) {
            acumulador += respuestas[usuario][i].puntaje;
        }
        
        return acumulador/respuestas[usuario].length;
    } 
    
}