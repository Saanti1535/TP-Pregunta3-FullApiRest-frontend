export class Usuario {
    public id: number
    // public username = ''
    // public password = ''
    public nombre = ''
    public apellido = ''
    public puntaje: number
    public fechaNacimiento: Date


    //Podríamos dejar el constructor vacio tranquilamente
    constructor( id?: number, nombre?: string, password?: string){
        // this.username = nombre || ''
        this.id = id || null
        // this.password = password || ''
    }


    //Comento user y pass porque no los usamos para nada después del login. Adempas, no sé si está bueno que viajen esos datos. 
    static fromJson(usuarioJSON): Usuario{
        let usuario = new Usuario()
        usuario.id = usuarioJSON.id
        // usuario.username = usuarioJSON.username 
        // usuario.password = usuarioJSON.password
        usuario.nombre = usuarioJSON.nombre
        usuario.apellido = usuarioJSON.apellido 
        usuario.puntaje = usuarioJSON.puntaje
        usuario.fechaNacimiento = new Date(usuarioJSON.fechaNacimiento + "T00:00:00")

        return usuario  
    }

    toJson(){
        let fechaNac = this.fechaNacimiento.toJSON().substring(0,10)
        let usuarioJson = JSON.stringify(
            {
              id : this.id,
              nombre : this.nombre,
              apellido : this.apellido,
              puntaje : this.puntaje,
              fechaNacimiento : fechaNac, 
            }
          )
          
        return usuarioJson
    }

}