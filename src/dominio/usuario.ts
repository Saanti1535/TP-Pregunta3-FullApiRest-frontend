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
        usuario.fechaNacimiento = new Date(usuarioJSON.fechaNacimiento)
        usuario.amigos = usuarioJSON.amigos
        if( usuarioJSON.historial !== null){
            usuarioJSON.historial.forEach(registro => usuario.historial.push(RegistroRespuestas.fromJson(registro)))
        }
        return usuario
    }
    

    toJson() {
        let usuarioJson = JSON.stringify(
            {
                id: this.id,
                nombre: this.nombre,
                apellido: this.apellido,
                puntaje: this.puntaje,
                fechaNacimiento: this.fechaNacimiento.toISOString().slice(0, -1)+"-03:00",
                amigos: this.amigos,
                historial: this.historial
                
            }
            
        )
        return usuarioJson
    }

}
export class RegistroRespuestas{
    private id: number
    public pregunta: string 
    public fechaRespuesta: Date 
    public puntosOtorgados: number

    static fromJson(json): RegistroRespuestas {
        let registro = new  RegistroRespuestas()
        registro.id = json.id
        registro.pregunta = json.pregunta
        registro.fechaRespuesta = new Date(json.fechaRespuesta) 
        registro.puntosOtorgados = json.puntosOtorgados
        
        return registro
    }

    toJson(){
        let registroJson = JSON.stringify({
            id: this.id,
            pregunta: this.pregunta,
            fechaRespuesta: this.fechaRespuesta.toISOString().slice(0, -1)+"-03:00",
            puntaje: this.puntosOtorgados,    
        })
        

        return registroJson
    }
}