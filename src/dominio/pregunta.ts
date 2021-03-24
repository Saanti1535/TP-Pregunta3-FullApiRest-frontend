export class Pregunta {
    public id: number
    public pregunta = ""
    public opciones: string[] = []
    public autor: string // lo hacemos string o Usuario? Hay que agregarlo al fromJSON

    static fromJSON(preguntaJSON): Pregunta {
        let pregunta = new Pregunta()
        pregunta.id = preguntaJSON.id
        pregunta.pregunta = preguntaJSON.pregunta     
        pregunta.opciones = preguntaJSON.opciones
        return pregunta
    }
}