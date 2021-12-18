export interface Persona {
    identificacion: string,
    nombres: string,
    apellidos: string,
    email: string,
    fechaNacimiento?: Date,
    foto?: Blob,
    estado: string,
    ultimaActualizacion?: Date,
    fotoUrl?: string
}