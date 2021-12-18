export interface ControlesVinculados {
    procesoId?: number,
    subprocesoId?: number,
    actividadId?: number,
    riesgoId?: number,
    nombre?: string,
    riesgoInherente?: number,
    riesgoResidual?: number,
    totalControles?: number,
    reducirA?: string,
    suficienciaId: number
}