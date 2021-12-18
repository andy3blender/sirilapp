export interface Usuario {
    usuarioId?: number,
    personaId: string,
    login: string,
    clave: string,
    perfilId: number,
    estado: string,
    activo: boolean,
}