export class LogModificaciones {
    idUsuario: String
    fechaHoraDeModificacion: Date
    pregunta: String
    opcionesAnteriores: String[]
    opcionesNuevas: String[]
    opcionCorrectaAnterior: String
    opcionCorrectaActual: String
    
    static fromJSON(log) {
        const logModificaciones = new LogModificaciones()
        logModificaciones.idUsuario = log.idUsuario
        logModificaciones.pregunta = log.pregunta
        logModificaciones.fechaHoraDeModificacion = log.fechaHoraDeModificacion
        logModificaciones.opcionesAnteriores = log.opcionesAnteriores
        logModificaciones.opcionesNuevas = log.opcionesNuevas
        logModificaciones.opcionCorrectaAnterior = log.opcionCorrectaAnterior
        logModificaciones.opcionCorrectaActual = log.opcionCorrectaActual
        console.log(logModificaciones)
        return logModificaciones
    }
}