export class Usuario {
    public id: number
    public nombre = ''
    public apellido = ''
    public puntaje: number
    public fechaNacimiento: Date
    amigos = []

    //Podríamos dejar el constructor vacio tranquilamente
    constructor(id?: number, nombre?: string, password?: string) {
        this.nombre = nombre
        this.id = id
    }

    //Comento user y pass porque no los usamos para nada después del login. Adempas, no sé si está bueno que viajen esos datos. 
    static fromJson(usuarioJSON): Usuario {
        let usuario = new Usuario()
        usuario.id = usuarioJSON.id
        usuario.nombre = usuarioJSON.nombre
        usuario.apellido = usuarioJSON.apellido
        usuario.puntaje = usuarioJSON.puntaje
        usuario.fechaNacimiento = new Date(usuarioJSON.fechaNacimiento + "T00:00:00")
        usuarioJSON.amigos.forEach(amigo => usuario.amigos.push(amigo.nombre))

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
            }
        )

        return usuarioJson
    }

}