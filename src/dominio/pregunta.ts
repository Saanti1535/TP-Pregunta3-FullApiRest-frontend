export class Pregunta {
    public id: number
    public pregunta = ""
    public opciones: string[] = []
    public idAutor: number
    public nombreAutor: string
    public type: string
    public puntos: number
    //Solo se utiliza para enviar del front al back, cuando viene del back la respuesta correcta no se trae.
    public respuestaCorrecta: string

    static fromJSON(preguntaJSON): Pregunta {
        let pregunta = new Pregunta()
        pregunta.id = preguntaJSON.id
        pregunta.pregunta = preguntaJSON.pregunta     
        pregunta.opciones = preguntaJSON.opciones
        pregunta.idAutor = preguntaJSON.idAutor
        pregunta.nombreAutor = preguntaJSON.nombreAutor
        pregunta.type = preguntaJSON.type
        pregunta.puntos = preguntaJSON.puntos
        return pregunta
    }

    toJSON() {
        let preguntaJSON = JSON.stringify(
            {
                id: this.id,
                pregunta: this.pregunta,
                opciones: this.opciones,
                type: this.type,
                respuestaCorrecta: this.respuestaCorrecta
            }
        )

        return preguntaJSON
    }

    opcionesUpdateToJSON() {
        let preguntaJSON = JSON.stringify(
            {
                opciones: this.opciones,
            }
        )
        return preguntaJSON
    }
}