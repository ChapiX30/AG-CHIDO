export async function generarConsecutivoSheet(magnitud: string, usuario: string) {
    const url = "https://script.google.com/macros/s/AKfycbyjDA48PH2cJzTBR4QS-K_hYIjGrwu0czQLBvFBnaEvSf0u4wRT-hb9VGNW61XSCKVx/exec";

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
    return data;
}
