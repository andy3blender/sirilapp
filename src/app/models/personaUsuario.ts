export interface personaUsuario {
    identificacion: string,
    nombres: string,
    apellidos: string,
    email: string,
    fechaNacimiento: Date,
    foto: Blob,
    estado: string,
    usuarioId: number,    
    login: string,
    clave: string,
    perfilId: number,
    nombrePeril: string,
    activo: boolean,
    fotoUrl: string
}