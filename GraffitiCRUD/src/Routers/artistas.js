const express = require('express');
const router = express.Router();
const db = require('../DB/database');

function validarArtista(datos) {
    const errores = [];
    if (!datos.nombre || typeof datos.nombre !== 'string' || datos.nombre.trim().length < 2) {
        errores.push('El nombre es obligatorio y debe tener al menos 2 caracteres');
    }
    if (!datos.email || typeof datos.email !== 'string') {
        errores.push('El email es obligatorio');
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(datos.email)) {
            errores.push('El formato del email no es válido');
        }
    }
    return errores;
}

router.get('/', async (req, res) => {
    try {
        const [artistas] = await db.execute(
            'SELECT id, nombre, email, descripcion, created_at, updated_at FROM artistas ORDER BY id ASC'
        );
        res.json({
            status: 'success',
            data: artistas,
            count: artistas.length
        });
    } catch (error) {
        console.error('Error al listar artistas:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const [artistas] = await db.execute(
            'SELECT id, nombre, email, descripcion, created_at, updated_at FROM artistas WHERE id = ?',
            [req.params.id]
        );
        if (artistas.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: `Artista con ID ${req.params.id} no encontrado`
            });
        }
        res.json({ status: 'success', data: artistas[0] });
    } catch (error) {
        console.error('Error al obtener artistas:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { nombre, email, descripcion } = req.body;

        if (!nombre || nombre.trim().length < 2)
            return res.status(400).json({ status: 'error', message: 'El nombre es obligatorio (mínimo 2 caracteres)' });
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            return res.status(400).json({ status: 'error', message: 'El email no es válido' });
        if (!descripcion || descripcion.trim().length < 2)
            return res.status(400).json({ status: 'error', message: 'La descripción es obligatoria' });

        const [resultado] = await db.execute(
            'INSERT INTO artistas (nombre, email, descripcion) VALUES (?, ?, ?)',
            [nombre.trim(), email.trim().toLowerCase(), descripcion.trim()]
        );

        const [nuevo] = await db.execute(
            'SELECT id, nombre, email, descripcion, created_at FROM artistas WHERE id = ?',
            [resultado.insertId]
        );
        
        res.status(201).json({
            status: 'success',
            data: nuevo[0]
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                status: 'error',
                message: 'Ya existe un artista con ese email'
            });
        }
        console.error('Error al crear artista:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, descripcion } = req.body;

        const [existente] = await db.execute('SELECT id FROM artistas WHERE id = ?', [id]);
        if (existente.length === 0) {
            return res.status(404).json({ status: 'error', message: `Artista con ID ${id} no encontrado` });
        }

        if (!nombre || nombre.trim().length < 2)
            return res.status(400).json({ status: 'error', message: 'El nombre es obligatorio' });
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            return res.status(400).json({ status: 'error', message: 'El email no es válido' });
        if (!descripcion || descripcion.trim().length < 2)
            return res.status(400).json({ status: 'error', message: 'La descripción es obligatoria' });

        await db.execute(
            'UPDATE artistas SET nombre = ?, email = ?, descripcion = ? WHERE id = ?',
            [nombre.trim(), email.trim().toLowerCase(), descripcion.trim(), id]
        );

        const [actualizado] = await db.execute(
            'SELECT id, nombre, email, descripcion, created_at, updated_at FROM artistas WHERE id = ?',
            [id]
        );

        res.json({ status: 'success', data: actualizado[0] });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                status: 'error',
                message: 'Ya existe un artista con ese email'
            });
        }
        console.error('Error al actualizar artista:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [artistas] = await db.execute(
            'SELECT id, nombre FROM artistas WHERE id = ?', [id]
        );

        if (artistas.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: `Artista con ID ${id} no encontrado`
            });
        }

        await db.execute('DELETE FROM artistas WHERE id = ?', [id]);

        res.json({
            status: 'success',
            data: {
                eliminado: artistas[0],
                mensaje: `Artista "${artistas[0].nombre}" eliminado exitosamente`
            }
        });
    } catch (error) {
        if (error.code === 'ER_ROW_IS_REFERENCED_2' || error.errno === 1451) {
            return res.status(409).json({ 
                status: 'error', 
                message: 'No se puede eliminar el artista porque tiene obras o graffos asociados' 
            });
        }
        console.error('Error al eliminar artista:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

module.exports = router;