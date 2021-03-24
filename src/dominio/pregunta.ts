export class Pregunta {
    public id: number
    public pregunta = ""

    static fromJSON(preguntaJSON): Pregunta {
        let pregunta = new Pregunta()
        pregunta.id = preguntaJSON.id
        pregunta.pregunta = preguntaJSON.pregunta     
        return pregunta
    }
}