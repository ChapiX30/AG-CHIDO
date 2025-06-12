import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";

const db = getFirestore();

const prefijos: { [key: string]: string } = {
    dimensional: "AGD",
    flujo: "AGFL",
    presion: "AGP",
    fuerza: "AGF",
    electrica: "AGEL",
    acustica: "AGAC"
};

export async function generarConsecutivoFirebase(magnitud: string, usuario: string): Promise<string> {
    const anio = new Date().getFullYear().toString().slice(-2);
    const numero = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
    const prefijo = prefijos[magnitud?.toLowerCase()] || "AGX";
    const consecutivo = `${prefijo}-${numero}-${anio}`;

    await addDoc(collection(db, "consecutivos"), {
        fecha: Timestamp.now(),
        magnitud,
        usuario,
        consecutivo
    });

    return consecutivo;
}
