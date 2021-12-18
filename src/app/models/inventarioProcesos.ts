export interface InventarioProcesos {
    procesoId?: number,
    codigo: string,
    nombre: string,
    padreId?: number,
    nivel: number,
    estado: string,
    //subProcesos?: InventarioProcesos[]
}