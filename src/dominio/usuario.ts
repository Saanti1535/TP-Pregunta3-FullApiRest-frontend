export class Usuario {
    public id: number
    public username: String
    public nombre = ''
    public apellido = ''
    public puntaje: number
    public fechaNacimiento: Date
    public historial: RegistroRespuestas[] = []
    public amigos = []

    //Podríamos dejar el constructor vacio tranquilamente
    constructor(id?: number, nombre?: string, password?: string) {
        this.nombre = nombre
        this.id = id
    }

    //Comento user y pass porque no los usamos para nada después del login. Adempas, no sé si está bueno que viajen esos datos. 
    static fromJson(usuarioJSON): Usuario {
        let usuario = new Usuario()
        usuario.id = usuarioJSON.id
        usuario.username = usuarioJSON.username
        usuario.nombre = usuarioJSON.nombre
        usuario.apellido = usuarioJSON.apellido
        usuario.puntaje = usuarioJSON.puntaje
        usuario.fechaNacimiento = new Date(usuarioJSON.fechaNacimiento + "T00:00:00")
        usuarioJSON.amigos.forEach(amigo => usuario.amigos.push(amigo.username))
        usuarioJSON.historial.forEach(registro => usuario.historial.push(registro.fromJSON()))

        return usuario
    }

    toJson() {
        let fechaNac = this.fechaNacimiento.toJSON().substring(0, 10)
        let usuarioJson = JSON.stringify(
            {
                id: this.id,
                nombre: this.nombre,
                apellido: this.apellido,
                puntaje: this.puntaje,
                fechaNacimiento: fechaNac,
                amigos: this.amigos,
                historial: this.historial.map(registro => registro.toJson()),
            }
        )

        return usuarioJson
    }

}


export class RegistroRespuestas{
    public pregunta: string 
    public fechaRespuesta: Date 
    public puntosOtorgados: number

    static fromJson(json): RegistroRespuestas {
        let registro: RegistroRespuestas
        registro.pregunta = json.pregunta
        registro.fechaRespuesta = new Date(json.fechaRespuesta + "T00:00:00") 
        registro.puntosOtorgados = json.puntaje
        
        return registro
    }

    toJson(){
        let fechaRta = this.fechaRespuesta.toJSON().substring(0, 10)
        let registroJson = JSON.stringify({
            pregunta: this.pregunta,
            fechaRespuesta: fechaRta,
            puntaje: this.puntosOtorgados,    
        })

        return registroJson
    }
}