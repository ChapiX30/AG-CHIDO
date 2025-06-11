import {
    getFirestore,
    collection,
    addDoc,
    Timestamp,
} from "firebase/firestore";
import { db } from "./firebase"; // Aseg�rate de tener este archivo

export const generarConsecutivoFirebase = async (magnitud: string, usuario: string) => {
    const a�o = new Date().getFullYear().toString().slice(-2);
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
    const consecutivo = `${prefijo}-${numero}-${a�o}`;

    await addDoc(collection(db, "consecutivos"), {
        fecha: Timestamp.now(),
        magnitud,
        usuario,
        consecutivo,
    });

    return consecutivo;
};
