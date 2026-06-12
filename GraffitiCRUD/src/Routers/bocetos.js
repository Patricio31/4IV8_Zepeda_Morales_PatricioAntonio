const express = require('express');
const router = express.Router();
const db = require('../DB/database');

router.get('/', async (req, res) => {
    try {
        const [graffos] = await db.execute(`
            SELECT g.id, g.titulo, g.descripcion, g.portafolio, 
                   g.artista_id, a.nombre AS artista_nombre,
                   g.estilo_id, e.nombre AS estilo_nombre,
                   g.created_at, g.updated_at
            FROM graffos g
            INNER JOIN artistas a ON g.artista_id = a.id
            INNER JOIN estilos e ON g.estilo_id = e.id
            ORDER BY g.id DESC
        `);
        res.json({
            status: 'success',
            data: graffos,
            count: graffos.length
        });
    } catch (error) {
        console.error('Error al listar graffos:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { titulo, descripcion, portafolio, artista_id, estilo_id } = req.body;

        if (!titulo || !descripcion || !portafolio || !artista_id || !estilo_id) {
            return res.status(400).json({
                status: 'error',
                message: 'Todos los campos son obligatorios, incluyendo artista y estilo'
            });
        }

        const [resultado] = await db.execute(
            'INSERT INTO graffos (titulo, descripcion, portafolio, artista_id, estilo_id) VALUES (?, ?, ?, ?, ?)',
            [titulo.trim(), descripcion.trim(), portafolio.trim(), artista_id, estilo_id]
        );

        res.status(201).json({
            status: 'success',
            message: 'Graffo creado exitosamente',
            id: resultado.insertId
        });
    } catch (error) {
        console.error('Error al crear graffo:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion, portafolio, artista_id, estilo_id } = req.body;

        const [existe] = await db.execute('SELECT id FROM graffos WHERE id = ?', [id]);
        if (existe.length === 0) {
            return res.status(404).json({ status: 'error', message: 'Graffo no encontrado' });
        }

        await db.execute(
            'UPDATE graffos SET titulo = ?, descripcion = ?, portafolio = ?, artista_id = ?, estilo_id = ? WHERE id = ?',
            [titulo.trim(), descripcion.trim(), portafolio.trim(), artista_id, estilo_id, id]
        );

        res.json({ status: 'success', message: 'Graffo actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar graffo:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [existe] = await db.execute('SELECT id FROM graffos WHERE id = ?', [id]);
        if (existe.length === 0) {
            return res.status(404).json({ status: 'error', message: 'Graffo no encontrado' });
        }

        await db.execute('DELETE FROM graffos WHERE id = ?', [id]);
        res.json({ status: 'success', message: 'Graffo eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar graffo:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

module.exports = router;