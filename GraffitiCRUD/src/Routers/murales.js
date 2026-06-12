const express = require('express');
const router = express.Router();
const db = require('../DB/database');

router.get('/', async (req, res) => {
    try {
        const [estilos] = await db.execute(
            'SELECT id, nombre, descripcion, origen, created_at, updated_at FROM estilos ORDER BY id ASC'
        );
        res.json({
            status: 'success',
            data: estilos,
            count: estilos.length
        });
    } catch (error) {
        console.error('Error al listar estilos:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const [estilos] = await db.execute(
            'SELECT id, nombre, descripcion, origen, created_at, updated_at FROM estilos WHERE id = ?',
            [req.params.id]
        );
        if (estilos.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: `Estilo con ID ${req.params.id} no encontrado`
            });
        }
        res.json({ status: 'success', data: estilos[0] });
    } catch (error) {
        console.error('Error al obtener estilo:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { nombre, descripcion, origen } = req.body;

        if (!nombre || nombre.trim().length < 2)
            return res.status(400).json({ status: 'error', message: 'El nombre es obligatorio' });

        const [resultado] = await db.execute(
            'INSERT INTO estilos (nombre, descripcion, origen) VALUES (?, ?, ?)',
            [nombre.trim(), descripcion ? descripcion.trim() : null, origen ? origen.trim() : null]
        );

        const [nuevo] = await db.execute(
            'SELECT id, nombre, descripcion, origen, created_at FROM estilos WHERE id = ?',
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
                message: 'Ya existe un estilo con ese nombre'
            });
        }
        console.error('Error al crear estilo:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, origen } = req.body;

        const [existente] = await db.execute('SELECT id FROM estilos WHERE id = ?', [id]);
        if (existente.length === 0) {
            return res.status(404).json({ status: 'error', message: `Estilo con ID ${id} no encontrado` });
        }

        if (!nombre || nombre.trim().length < 2)
            return res.status(400).json({ status: 'error', message: 'El nombre es obligatorio' });

        await db.execute(
            'UPDATE estilos SET nombre = ?, descripcion = ?, origen = ? WHERE id = ?',
            [nombre.trim(), descripcion ? descripcion.trim() : null, origen ? origen.trim() : null, id]
        );

        const [actualizado] = await db.execute(
            'SELECT id, nombre, descripcion, origen, created_at, updated_at FROM estilos WHERE id = ?',
            [id]
        );

        res.json({ status: 'success', data: actualizado[0] });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                status: 'error',
                message: 'Ya existe un estilo con ese nombre'
            });
        }
        console.error('Error al actualizar estilo:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [estilos] = await db.execute(
            'SELECT id, nombre FROM estilos WHERE id = ?', [id]
        );

        if (estilos.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: `Estilo con ID ${id} no encontrado`
            });
        }

        await db.execute('DELETE FROM estilos WHERE id = ?', [id]);

        res.json({
            status: 'success',
            data: {
                eliminado: estilos[0],
                mensaje: `Estilo "${estilos[0].nombre}" eliminado exitosamente`
            }
        });
    } catch (error) {
        if (error.code === 'ER_ROW_IS_REFERENCED_2' || error.errno === 1451) {
            return res.status(409).json({ 
                status: 'error', 
                message: 'No se puede eliminar el estilo porque tiene graffos asociados' 
            });
        }
        console.error('Error al eliminar estilo:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

module.exports = router;