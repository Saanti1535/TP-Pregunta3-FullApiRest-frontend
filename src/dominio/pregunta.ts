export class Pregunta {
    public id: number
    public pregunta = ""
    public opciones: string[] = []
    public idAutor: number
    public nombreAutor: string
    public type: string

    static fromJSON(preguntaJSON): Pregunta {
        let pregunta = new Pregunta()
        pregunta.id = preguntaJSON.id
        pregunta.pregunta = preguntaJSON.pregunta     
        pregunta.opciones = preguntaJSON.opciones
        pregunta.idAutor = preguntaJSON.idAutor
        pregunta.nombreAutor = preguntaJSON.nombreAutor
        pregunta.type = preguntaJSON.type
        return pregunta
    }

    toJSON() {
        let preguntaJSON = JSON.stringify(
            {
                id: this.id,
                pregunta: this.pregunta,
                opciones: this.opciones,
                idAutor: this.idAutor,
                nombreAutor: this.nombreAutor,
                type: this.type
            }
        )

        return preguntaJSON
    }
}