export class Usuario {
    public id: number
    public nombreDeUsuario = ''
    public password = ''


    constructor( id?: number, nombre?: string, password?: string){
        this.nombreDeUsuario = nombre || ''
        this.id = id || null
        this.password = password || ''
    }


    static fromJson(usuarioJSON): Usuario{
        let usuario = new Usuario()
        usuario.id = usuarioJSON.id
        usuario.nombreDeUsuario = usuarioJSON.username
        usuario.password = usuarioJSON.password

        return usuario  
    }

}