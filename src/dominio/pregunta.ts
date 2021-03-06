export class Pregunta {
    public id: string
    public pregunta = ""
    public opciones: string[] = []
    public idAutor: number
    public nombreAutor: string
    public type: string
    public puntos: number
    public activa: boolean
    //Solo se utiliza para enviar del front al back, cuando viene del back la respuesta correcta no se trae.
    public respuestaCorrecta: string

    static fromJSON(preguntaJSON): Pregunta {
        let pregunta = new Pregunta()
        pregunta.id = preguntaJSON._id
        pregunta.pregunta = preguntaJSON.pregunta     
        pregunta.opciones = preguntaJSON.opciones
        pregunta.idAutor = preguntaJSON.idAutor
        pregunta.nombreAutor = preguntaJSON.nombreAutor
        pregunta.type = preguntaJSON.type
        pregunta.puntos = preguntaJSON.puntos
        pregunta.activa = preguntaJSON.activa
        pregunta.respuestaCorrecta = preguntaJSON.respuestaCorrecta
        return pregunta
    }

    toJSON() {
        let preguntaJSON = JSON.stringify(
            {
                _id: this.id,
                pregunta: this.pregunta,
                opciones: this.opciones,
                type: this.type,
                respuestaCorrecta: this.respuestaCorrecta,
                idAutor: this.idAutor
            }
        )

        return preguntaJSON
    }

    opcionesUpdateToJSON() {
        
        let preguntaJSON = JSON.stringify(
            {
                opciones: this.opciones,
                respuestaCorrecta: this.respuestaCorrecta !== null ? this.respuestaCorrecta : null
            }
        )
        return preguntaJSON
    }
}