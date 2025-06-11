export async function generarConsecutivoSheet(magnitud: string, usuario: string) {
    const url = "https://script.google.com/macros/s/AKfycbXYZ1234567890/exec"; // reemplaza por tu URL real

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            magnitud,
            usuario,
            accion: "generar"
        })
    });

    const data = await response.json();
    return data; // Ej: { consecutivo: "AGP-0001-24" }
}
