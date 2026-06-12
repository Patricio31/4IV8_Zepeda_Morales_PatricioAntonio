// ============================================================
// 1. UTILIDADES COMPARTIDAS
// ============================================================
const apiMetodo = document.getElementById('api-metodo');
const apiUrl = document.getElementById('api-url');
const apiCodigo = document.getElementById('api-codigo');
const notificacionDiv = document.getElementById('notificacion');

async function fetchAPI(url, opciones = {}) {
    const method = opciones.method || 'GET';

    apiMetodo.textContent = method;
    apiMetodo.className = `badge badge-${method.toLowerCase()}`;
    apiUrl.textContent = url;
    apiCodigo.textContent = '...';
    apiCodigo.className = 'badge badge-neutral';

    try {
        const respuesta = await fetch(url, opciones);
        apiCodigo.textContent = `${respuesta.status}`;
        apiCodigo.className = `badge ${respuesta.ok ? 'badge-success' : 'badge-error'}`;

        const datos = await respuesta.json();
        if (!respuesta.ok) {
            throw new Error(datos.message || `Error ${respuesta.status}`);
        }
        return datos;
    } catch (error) {
        if (apiCodigo.textContent === '...') {
            apiCodigo.textContent = 'ERROR';
            apiCodigo.className = 'badge badge-error';
        }
        throw error;
    }
}

function mostrarNotificacion(mensaje, tipo) {
    notificacionDiv.textContent = mensaje;
    notificacionDiv.className = `notificacion ${tipo}`;
    notificacionDiv.style.display = 'block';
    setTimeout(() => { notificacionDiv.style.display = 'none'; }, 3000);
}

function escapeHtml(texto) {
    if (!texto) return '';
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}

// ============================================================
// 2. MÓDULO DE ARTISTAS
// ============================================================
const formArtista = document.getElementById('form-artista');
const inputArtistaId = document.getElementById('artista-id');
const inputArtistaNombre = document.getElementById('artista-nombre');
const inputArtistaEmail = document.getElementById('artista-email');
const inputArtistasDescripcion = document.getElementById('artista-descripcion');
const formTituloArtista = document.getElementById('form-titulo-artista');
const btnGuardarArtista = document.getElementById('btn-guardar-artista');
const btnCancelarArtista = document.getElementById('btn-cancelar-artista');
const tbodyArtistas = document.getElementById('tbody-artistas');
const tablaArtistas = document.getElementById('tabla-artistas');
const cargaArtistas = document.getElementById('carga-artistas');
const contadorArtistas = document.getElementById('contador-artistas');
const errorArtistaNombre = document.getElementById('error-artista-nombre');
const errorArtistaEmail = document.getElementById('error-artista-email');
const errorArtistaDescripcion = document.getElementById('error-artista-descripcion');

async function cargarArtistas() {
    try {
        const resp = await fetchAPI('/api/artistas');
        cargaArtistas.style.display = 'none';

        if (resp.data.length === 0) {
            tablaArtistas.style.display = 'none';
            cargaArtistas.textContent = 'No hay artistas registrados.';
            cargaArtistas.style.display = 'block';
        } else {
            tablaArtistas.style.display = 'table';
            tbodyArtistas.innerHTML = '';
            resp.data.forEach(a => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${a.id}</td>
                    <td>${escapeHtml(a.nombre)}</td>
                    <td>${escapeHtml(a.email)}</td>
                    <td>${escapeHtml(a.descripcion)}</td>
                    <td>
                        <button class="btn-editar" onclick="editarArtista(${a.id})">Editar</button>
                        <button class="btn-eliminar" onclick="confirmarEliminarArtista(${a.id}, '${escapeHtml(a.nombre)}')">Eliminar</button>
                    </td>
                `;
                tbodyArtistas.appendChild(fila);
            });
        }
        if (contadorArtistas) contadorArtistas.textContent = `${resp.count}`;
    } catch (error) {
        mostrarNotificacion('Error al cargar artistas: ' + error.message, 'error');
    }
}

async function cargarSelectArtistas() {
    try {
        const resp = await fetchAPI('/api/artistas');
        const select = document.getElementById('graffos-artista');
        if (!select) return;
        select.innerHTML = '<option value="">-- Seleccionar Artista --</option>';
        resp.data.forEach(a => {
            const option = document.createElement('option');
            option.value = a.id;
            option.textContent = a.nombre;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error cargando select artistas:', error);
    }
}

function validarFormArtista() {
    let ok = true;
    const nombre = inputArtistaNombre.value.trim();
    const email = inputArtistaEmail.value.trim();

    if (!nombre || nombre.length < 2) {
        errorArtistaNombre.textContent = 'Mínimo 2 caracteres';
        inputArtistaNombre.classList.add('input-error');
        ok = false;
    } else {
        errorArtistaNombre.textContent = '';
        inputArtistaNombre.classList.remove('input-error');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errorArtistaEmail.textContent = 'Email no válido';
        inputArtistaEmail.classList.add('input-error');
        ok = false;
    } else {
        errorArtistaEmail.textContent = '';
        inputArtistaEmail.classList.remove('input-error');
    }

    return ok;
}

function limpiarFormArtista() {
    formArtista.reset();
    inputArtistaId.value = '';
    formTituloArtista.textContent = 'Agregar Artistas';
    btnGuardarArtista.textContent = 'Guardar';
    if (btnCancelarArtista) btnCancelarArtista.style.display = 'none';
    errorArtistaNombre.textContent = '';
    errorArtistaEmail.textContent = '';
    if (errorArtistaDescripcion) errorArtistaDescripcion.textContent = '';
    inputArtistaNombre.classList.remove('input-error');
    inputArtistaEmail.classList.remove('input-error');
    inputArtistasDescripcion.classList.remove('input-error');
}

formArtista.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validarFormArtista()) return;

    const datos = {
        nombre: inputArtistaNombre.value.trim(),
        email: inputArtistaEmail.value.trim(),
        descripcion: inputArtistasDescripcion.value.trim()
    };
    const id = inputArtistaId.value;
     
    try {
        if (id) {
            await fetchAPI(`/api/artistas/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });
            mostrarNotificacion('Artista actualizado', 'exito');
        } else {
            await fetchAPI('/api/artistas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });
            mostrarNotificacion('Artista creado', 'exito');
        }
        limpiarFormArtista();
        cargarArtistas();
        cargarSelectArtistas(); 
    } catch (error) {
        mostrarNotificacion(error.message, 'error');
    }
});

async function editarArtista(id) {
    try {
        const resp = await fetchAPI(`/api/artistas/${id}`);
        inputArtistaId.value = resp.data.id;
        inputArtistaNombre.value = resp.data.nombre;
        inputArtistaEmail.value = resp.data.email;
        inputArtistasDescripcion.value = resp.data.descripcion;
        formTituloArtista.textContent = 'Editar Artista';
        btnGuardarArtista.textContent = 'Actualizar';
        if (btnCancelarArtista) btnCancelarArtista.style.display = 'inline-block';
        cambiarSeccion('artistas');
        formArtista.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        mostrarNotificacion(error.message, 'error');
    }
}

function confirmarEliminarArtista(id, nombre) {
    if (confirm(`¿Eliminar a "${nombre}"?`)) {
        eliminarArtista(id);
    }
}

async function eliminarArtista(id) {
    try {
        await fetchAPI(`/api/artistas/${id}`, { method: 'DELETE' });
        mostrarNotificacion('Artista eliminado', 'exito');
        if (inputArtistaId.value === String(id)) limpiarFormArtista();
        cargarArtistas();
        cargarSelectArtistas();
    } catch (error) {
        mostrarNotificacion(error.message, 'error');
    }
}

if (btnCancelarArtista) btnCancelarArtista.addEventListener('click', limpiarFormArtista);

// ============================================================
// 3. MÓDULO DE ESTILOS
// ============================================================
const formEstilo = document.getElementById('form-estilo');
const inputEstiloId = document.getElementById('estilo-id');
const inputEstiloNombre = document.getElementById('estilo-nombre');
const inputEstiloDescripcion = document.getElementById('estilo-descripcion');
const inputEstiloOrigen = document.getElementById('estilo-origen');
const formTituloEstilo = document.getElementById('form-titulo-estilo');
const btnGuardarEstilo = document.getElementById('btn-guardar-estilo');
const btnCancelarEstilo = document.getElementById('btn-cancelar-estilo');
const tbodyEstilos = document.getElementById('tbody-estilos');
const tablaEstilos = document.getElementById('tabla-estilos');
const cargaEstilos = document.getElementById('carga-estilos');
const contadorEstilos = document.getElementById('contador-estilos');

async function cargarEstilos() {
    try {
        const resp = await fetchAPI('/api/estilos');
        cargaEstilos.style.display = 'none';
        if (resp.data.length === 0) {
            tablaEstilos.style.display = 'none';
            cargaEstilos.textContent = 'No hay estilos registrados.';
            cargaEstilos.style.display = 'block';
        } else {
            tablaEstilos.style.display = 'table';
            tbodyEstilos.innerHTML = '';
            resp.data.forEach(e => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${e.id}</td>
                    <td>${escapeHtml(e.nombre)}</td>
                    <td>${escapeHtml(e.descripcion)}</td>
                    <td>${escapeHtml(e.origen)}</td>
                    <td>
                        <button class="btn-editar" onclick="editarEstilo(${e.id})">Editar</button>
                        <button class="btn-eliminar" onclick="confirmarEliminarEstilo(${e.id}, '${escapeHtml(e.nombre)}')">Eliminar</button>
                    </td>
                `;
                tbodyEstilos.appendChild(fila);
            });
        }
        if (contadorEstilos) contadorEstilos.textContent = `${resp.count}`;
    } catch (error) {
        mostrarNotificacion('Error al cargar estilos: ' + error.message, 'error');
    }
}

async function cargarSelectEstilos() {
    try {
        const resp = await fetchAPI('/api/estilos');
        const select = document.getElementById('graffos-estilo');
        if (!select) return;
        select.innerHTML = '<option value="">-- Seleccionar estilo --</option>';
        resp.data.forEach(e => {
            const option = document.createElement('option');
            option.value = e.id;
            option.textContent = `${e.nombre} (${e.origen})`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error cargando select estilos:', error);
    }
}

function limpiarFormEstilo() {
    formEstilo.reset();
    inputEstiloId.value = '';
    formTituloEstilo.textContent = 'Agregar Estilo';
    btnGuardarEstilo.textContent = 'Guardar';
    if (btnCancelarEstilo) btnCancelarEstilo.style.display = 'none';
}

formEstilo.addEventListener('submit', async (e) => {
    e.preventDefault();
    const datos = {
        nombre: inputEstiloNombre.value.trim(),
        descripcion: inputEstiloDescripcion.value.trim(),
        origen: inputEstiloOrigen.value.trim()
    };
    const id = inputEstiloId.value;

    try {
        if (id) {
            await fetchAPI(`/api/estilos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });
            mostrarNotificacion('Estilo actualizado', 'exito');
        } else {
            await fetchAPI('/api/estilos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });
            mostrarNotificacion('Estilo creado', 'exito');
        }
        limpiarFormEstilo();
        cargarEstilos();
        cargarSelectEstilos();
    } catch (error) {
        mostrarNotificacion(error.message, 'error');
    }
});

async function editarEstilo(id) {
    try {
        const resp = await fetchAPI(`/api/estilos/${id}`);
        inputEstiloId.value = resp.data.id;
        inputEstiloNombre.value = resp.data.nombre;
        inputEstiloDescripcion.value = resp.data.descripcion;
        inputEstiloOrigen.value = resp.data.origen;
        formTituloEstilo.textContent = 'Editar Estilo';
        btnGuardarEstilo.textContent = 'Actualizar';
        if (btnCancelarEstilo) btnCancelarEstilo.style.display = 'inline-block';
        cambiarSeccion('estilos');
        formEstilo.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        mostrarNotificacion(error.message, 'error');
    }
}

function confirmarEliminarEstilo(id, nombre) {
    if (confirm(`¿Eliminar el estilo "${nombre}"?`)) eliminarEstilo(id);
}

async function eliminarEstilo(id) {
    try {
        await fetchAPI(`/api/estilos/${id}`, { method: 'DELETE' });
        mostrarNotificacion('Estilo eliminado', 'exito');
        if (inputEstiloId.value === String(id)) limpiarFormEstilo();
        cargarEstilos();
        cargarSelectEstilos();
    } catch (error) {
        mostrarNotificacion(error.message, 'error');
    }
}

if (btnCancelarEstilo) btnCancelarEstilo.addEventListener('click', limpiarFormEstilo);

// ============================================================
// 4. MÓDULO DE GRAFFOS
// ============================================================
const formGraffos = document.getElementById('form-graffos');
const inputGraffosId = document.getElementById('graffos-id');
const inputGraffosNombre = document.getElementById('graffos-nombre');
const inputGraffosDescripcion = document.getElementById('graffos-descripcion');
const inputGraffosPortafolio = document.getElementById('graffos-portafolio');
const selectGraffosArtista = document.getElementById('graffos-artista');
const selectGraffosEstilo = document.getElementById('graffos-estilo');
const formTituloGraffos = document.getElementById('form-titulo-graffos');
const btnGuardarGraffos = document.getElementById('btn-guardar-graffos');
const btnCancelarGraffos = document.getElementById('btn-cancelar-graffos');
const tbodyGraffos = document.getElementById('tbody-graffos');
const tablaGraffos = document.getElementById('tabla-graffos');
const cargaGraffos = document.getElementById('carga-graffos');
const contadorGraffos = document.getElementById('contador-graffos');

async function cargarGraffos() {
    try {
        const resp = await fetchAPI('/api/graffos');
        cargaGraffos.style.display = 'none';
        if (resp.data.length === 0) {
            tablaGraffos.style.display = 'none';
            cargaGraffos.textContent = 'No hay graffos registrados.';
            cargaGraffos.style.display = 'block';
        } else {
            tablaGraffos.style.display = 'table';
            tbodyGraffos.innerHTML = '';
            resp.data.forEach(d => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${d.id}</td>
                    <td>${escapeHtml(d.titulo)}</td>
                    <td>${escapeHtml(d.artista_nombre)}</td>
                    <td>${escapeHtml(d.estilo_nombre)}</td>
                    <td>${escapeHtml(d.portafolio)}</td>
                    <td>
                        <button class="btn-eliminar" onclick="confirmarEliminarGraffos(${d.id}, '${escapeHtml(d.titulo)}')">Eliminar</button>
                    </td>
                `;
                tbodyGraffos.appendChild(fila);
            });
        }
        if (contadorGraffos) contadorGraffos.textContent = `${resp.count}`;
    } catch (error) {
        mostrarNotificacion('Error al cargar graffos: ' + error.message, 'error');
    }
}

function limpiarFormGraffos() {
    formGraffos.reset();
    inputGraffosId.value = '';
    formTituloGraffos.textContent = 'Agregar Graffos';
    btnGuardarGraffos.textContent = 'Guardar';
    if (btnCancelarGraffos) btnCancelarGraffos.style.display = 'none';
}

formGraffos.addEventListener('submit', async (e) => {
    e.preventDefault();

    const datos = {
        titulo: inputGraffosNombre.value.trim(),
        descripcion: inputGraffosDescripcion.value.trim(),
        artista_id: parseInt(selectGraffosArtista.value),
        estilo_id: parseInt(selectGraffosEstilo.value),
        portafolio: inputGraffosPortafolio.value.trim()
    };

    try {
        await fetchAPI('/api/graffos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        mostrarNotificacion('Graffo creado exitosamente', 'exito');
        limpiarFormGraffos();
        cargarGraffos();
        cargarObras();
    } catch (error) {
        mostrarNotificacion(error.message, 'error');
    }
});

function confirmarEliminarGraffos(id, nombre) {
    if (confirm(`¿Eliminar el Graffo "${nombre}"?`)) eliminarGraffos(id);
}

async function eliminarGraffos(id) {
    try {
        await fetchAPI(`/api/graffos/${id}`, { method: 'DELETE' });
        mostrarNotificacion('Graffo eliminado', 'exito');
        cargarGraffos();
        cargarObras();
    } catch (error) {
        mostrarNotificacion(error.message, 'error');
    }
}

if (btnCancelarGraffos) btnCancelarGraffos.addEventListener('click', limpiarFormGraffos);

// ============================================================
// 5. MÓDULO DE OBRAS (galería)
// ============================================================
const galeriaObras = document.getElementById('galeria-obras');
const cargaObras = document.getElementById('carga-obras');
const contadorObras = document.getElementById('contador-obras');

async function cargarObras() {
    try {
        const resp = await fetchAPI('/api/graffos');
        if (cargaObras) cargaObras.style.display = 'none';
        if (contadorObras) contadorObras.textContent = `${resp.count}`;
        galeriaObras.innerHTML = '';

        if (resp.data.length === 0) {
            galeriaObras.innerHTML = '<p>No hay obras registradas.</p>';
            return;
        }

        resp.data.forEach(d => {
            const card = document.createElement('div');
            card.className = 'obra-card';
            card.innerHTML = `
                <div class="obra-info">
                    <h3>${escapeHtml(d.titulo)}</h3>
                    <p><strong>Portafolio:</strong> <a href="${escapeHtml(d.portafolio)}" target="_blank">Ver enlace</a></p>
                    <p><strong>Artista:</strong> ${escapeHtml(d.artista_nombre)}</p>
                    <p><strong>Estilo:</strong> ${escapeHtml(d.estilo_nombre)}</p>
                    <p>${escapeHtml(d.descripcion)}</p>
                </div>
            `;
            galeriaObras.appendChild(card);
        });
    } catch (error) {
        if (mostrarNotificacion) mostrarNotificacion('Error al cargar obras: ' + error.message, 'error');
    }
}

// ============================================================
// 6. NAVEGACIÓN POR PESTAÑAS
// ============================================================
function cambiarSeccion(seccion) {
    document.querySelectorAll('.seccion').forEach(s => {
        s.style.display = 'none';
    });

    document.querySelectorAll('.tab').forEach(t => {
        t.classList.remove('active');
    });

    const seccionTarget = document.getElementById(`seccion-${seccion}`);
    if (seccionTarget) seccionTarget.style.display = 'block';

    const tabs = Array.from(document.querySelectorAll('.tab'));
    const tabActiva = tabs.find(t => t.textContent.toLowerCase().trim() === seccion);
    if (tabActiva) tabActiva.classList.add('active');

    if (seccion === 'graffos' || seccion === 'grafos') {
        cargarSelectArtistas();
        cargarSelectEstilos();
        cargarGraffos();
    }
}

// ============================================================
// 7. INICIALIZACIÓN
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    cargarArtistas();
    cargarEstilos();
    cargarSelectArtistas();
    cargarSelectEstilos();
    cargarGraffos();
    cargarObras();
});