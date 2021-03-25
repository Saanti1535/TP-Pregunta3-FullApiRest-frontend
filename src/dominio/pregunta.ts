export class Pregunta {
    public id: number
    public pregunta = ""
    public opciones: string[] = []
    public idAutor: number
    public nombreAutor: string

    static fromJSON(preguntaJSON): Pregunta {
        let pregunta = new Pregunta()
        pregunta.id = preguntaJSON.id
        pregunta.pregunta = preguntaJSON.pregunta     
        pregunta.opciones = preguntaJSON.opciones
        pregunta.idAutor = preguntaJSON.idAutor
        pregunta.nombreAutor = preguntaJSON.nombreAutor
        return pregunta
    }
}