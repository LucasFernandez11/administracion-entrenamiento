export interface Contrato {
  id: number;
  codigo: string;
  descripcion: string;
  fechaInicio: string;
  estado: string;
}

export interface Contratista {
  id: number;
  nombre: string;
  cuit: string;
  contacto: {
    nombre: string;
    telefono: string;
  };
}

export interface Personal {
  id: number;
  contratistaId: number;
  nombreCompleto: string;
  dni: string;
  rol: string;
}

export interface Transporte {
  id: number;
  contratistaId: number;
  patente: string;
  tipo: string;
  capacidad: string;
}

export interface Maquinaria {
  id: number;
  contratistaId: number;
  equipo: string;
  modelo: string;
  horasUso: number;
}
