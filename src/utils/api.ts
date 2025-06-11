// src/utils/api.ts

export async function generarConsecutivoFirebase(magnitud: string, usuario: string) {
    const anio = new Date().getFullYear().toString().slice(-2);
    const numero = Math.floor(Math.random() * 10000).toString().padStart(4, "0");

    const prefijos: Record<string, string> = {
        dimensional: "AGD",
        flujo: "AGFL",
        presion: "AGP",
        fuerza: "AGF",
        electrica: "AGEL",
        acustica: "AGAC"
    };

    const prefijo = prefijos[magnitud?.toLowerCase()] || "AGX";
    const consecutivo = `${prefijo}-${numero}-${año}`;

    return consecutivo;
}
