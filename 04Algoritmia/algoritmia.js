function problema1() {
    const input = document.querySelector('#p1-input').value;
    const palabrasInvertidas = input.trim().split(/\s+/).reverse().join(' ');
    document.querySelector('#p1-output').textContent = palabrasInvertidas 

}

function problema2() {
    const idsX = ['#p2-x1', '#p2-x2', '#p2-x3', '#p2-x4', '#p2-x5'];
    const idsY = ['#p2-y1', '#p2-y2', '#p2-y3', '#p2-y4', '#p2-y5'];

    let v1 = idsX.map(id => Number(document.querySelector(id).value));
    let v2 = idsY.map(id => Number(document.querySelector(id).value));

    v1.sort((a, b) => a - b);
    v2.sort((a, b) => b - a);

    let producto = 0;
    for (let i = 0; i < v1.length; i++) {
        producto += v1[i] * v2[i];
    }

    document.querySelector('#p2-output').textContent = "Producto escalar mínimo: " + producto;
}

function problema3() {
    const input = document.querySelector('#p3-input').value;
    const palabras = input.split(',');
    let palabraGanadora = "";
    let maxUnicos = 0;

    palabras.forEach(palabra => {
        const p = palabra.trim().toUpperCase();
        if (p === "") return;

        // El Set elimina letras repetidas automáticamente
        const unicos = new Set(p.split('')).size;
        
        if (unicos > maxUnicos) {
            maxUnicos = unicos;
            palabraGanadora = p;
        }
    });

    document.querySelector('#p3-output').textContent = palabraGanadora 
        ? `La palabra con más caracteres únicos es: ${palabraGanadora} (${maxUnicos})`
        : "Esperando datos...";
}
