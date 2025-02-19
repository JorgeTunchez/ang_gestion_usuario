export interface Resultado {
    data: Data;
}

export interface Data {
    codigoRespuesta: number;
    descripcionRespuesta: string;
    datos: Datos[];
}
  
export interface Datos {
    id: string;
    nombre: string;
    email: string;
    password: string;
}