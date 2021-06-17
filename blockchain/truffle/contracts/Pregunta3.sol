pragma solidity >=0.6.8;

contract Pregunta3 {
    address public usuario;
    
    struct Pregunta {
        int8 id;
        address autor;
        string textoPregunta;
        string[] opciones;
    }

    Pregunta[] public preguntas;

    struct Respuesta {
        address usuario;
        int8 idPregunta;
        string textoRespuesta;
        int8 puntaje;
    }

    enum Estado {Activo, Lectura, Responder, Bootstrap};
    Estado public estado;

    // modifier noEsAutor(address usuario){
    //     require(msg.sender != usuario)
    // }

    // No está probado
    function obtenerPregunta(int8 idPregunta) public returns (Pregunta pregunta) {
        for(int8 i = 0; i < preguntas.length; i++) {
            if(preguntas[i].id == idPregunta){
                pregunta = preguntas[i];
            }
        }
    }

    // No está probado
    function nuevaPregunta(string texto, string[] _opciones) public returns (Pregunta pregunta){
        pregunta.id = preguntas.length + 1;
        pregunta.autor = msg.sender;
        pregunta.textoPregunta = texto;
        pregunta.opciones = _opciones;
    }
}