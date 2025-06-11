export async function generarConsecutivoSheet(magnitud: string, usuario: string) {
    const url = "https://script.google.com/macros/s/AKfycbyjDA48PH2cJzTBR4QS-K_hYIjGrwu0czQLBvFBnaEvSf0u4wRT-hb9VGNW61XSCKVx/exec"; // usa aquí tu URL actualizada

    try {
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

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al generar consecutivo:", error);
        return { error: error.message };
    }
}

